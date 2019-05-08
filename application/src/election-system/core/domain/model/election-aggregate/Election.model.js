"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Entity_model_1 = require("../../../../../SharedKernel/Entities/Entity.model");
var DateTimeRangeVO_model_1 = require("../../../../../SharedKernel/DateTimeRangeVO.model");
var Ballot_model_1 = require("../ballot-aggregate/Ballot.model");
var Guard_model_1 = require("../../../../../SharedKernel/Guard.model");
var Teller_model_1 = require("./Teller.model");
var Election = /** @class */ (function (_super) {
    __extends(Election, _super);
    function Election(id, _electionPeriod, _anonymous, _masterBallotId, _restricted, _permittedVoters, _validQuestionIds, _validChoiceIds, 
    // Array of ballot UUIDs that have been cast.
    _ballotIds, 
    // Array of user UUIDs that have already voted
    _whoVotedIds, _teller, 
    // We need the ballot cast event but so we can subscribe to it
    // and update our list of who has voted
    _ballotCastEventBus) {
        var _this = _super.call(this, id) || this;
        _this._electionPeriod = _electionPeriod;
        _this._anonymous = _anonymous;
        _this._masterBallotId = _masterBallotId;
        _this._restricted = _restricted;
        _this._permittedVoters = _permittedVoters;
        _this._validQuestionIds = _validQuestionIds;
        _this._validChoiceIds = _validChoiceIds;
        _this._ballotIds = _ballotIds;
        _this._whoVotedIds = _whoVotedIds;
        _this._teller = _teller;
        _this._ballotCastEventBus = _ballotCastEventBus;
        // subscribe to event bus here so we are ready to record who has already voted as
        // early as possible.  Any better ideas for where to subscribe?
        _this._ballotCastEventBus = _ballotCastEventBus;
        _this.subscribeToBallotCastEventStream();
        return _this;
    }
    // Factory method for enforcing invariance:
    // 1. Start and end date validity is checked by DateTimeRange VO
    Election.create = function (idGenerator, start, end, anonymous, masterBallot, ballotCastEventBus, permittedVoters) {
        var validQuestionIds = new Set(masterBallot.questions.map(function (q) { return q.id; }));
        var validChoiceIds = new Set();
        for (var _i = 0, _a = masterBallot.questions; _i < _a.length; _i++) {
            var question = _a[_i];
            for (var _b = 0, _c = question.choices; _b < _c.length; _b++) {
                var choice = _c[_b];
                validChoiceIds.add(choice.id);
            }
        }
        var teller = new Teller_model_1.Teller(idGenerator(), validChoiceIds, ballotCastEventBus);
        var restricted = false;
        if (permittedVoters === undefined) {
            permittedVoters = new Set();
        }
        else {
            restricted = true;
        }
        return new Election(idGenerator(), new DateTimeRangeVO_model_1.DateTimeRange(start, end), anonymous, masterBallot.id, restricted, permittedVoters, validQuestionIds, validChoiceIds, new Set(), new Set(), teller, ballotCastEventBus);
    };
    Election.prototype.startElection = function () {
        if (this._electionPeriod.currentlyIn()) {
            this._teller.beginCounting();
        }
    };
    // Here is where we should enforce invariance that would check whether
    // the ballot data accurately matches the survey it should be attached to.
    Election.prototype.castBallot = function (idGenerator, ballotData) {
        // Is the election restricted? If so, see if user is in permitted list
        if (this._restricted && !this._permittedVoters.has(ballotData.voterId)) {
            throw new Error("That user is not permitted to vote in this election.");
        }
        // Has the user in question already voted?
        if (this._whoVotedIds.has(ballotData.voterId)) {
            throw new Error("That voter has already voted in this election");
        }
        // Check if ballot data matches up with survey it should be related to.
        // Throws an error if invalid and prevents further execution
        this.checkBallotDataAgainstMasterBallot(ballotData);
        // Checks if the current time is still within the election period.
        if (!this._electionPeriod.currentlyIn()) {
            throw new Error("Cannot cast a ballot for an election that is not currently active.");
        }
        // Passed all checks so generate a new ballot using ballot factory method.
        var ballot = Ballot_model_1.Ballot.cast(idGenerator, this._ballotCastEventBus, ballotData);
        // TODO: Once we have domain events setup, should emit a BallotCast event in the ballot factory
        // and subscribe to it here so that we populate our ballotIds and voterIds only once the ballot
        // has definitely been created there after further ballot side invariance checks.
        this._ballotIds.add(ballot.id);
        this._whoVotedIds.add(ballotData.voterId);
        return ballot;
    };
    Election.prototype.checkBallotDataAgainstMasterBallot = function (ballotData) {
        if (this._masterBallotId !== ballotData.masterBallotId) {
            throw new Error('This ballot was cast for an election that relates to a different master ballot.');
        }
        // Check for duplicate qIds indicating potential duplicate votes
        var ballotQuestionIdList = ballotData.voteData.questionsData.map(function (q) { return q.qId; });
        var ballotQuestionIds = new Set(ballotQuestionIdList);
        if (ballotQuestionIdList.length !== ballotQuestionIds.size) {
            throw new Error('Duplicate votes in cast ballot.');
        }
        // Check if question ids are a match between ballot and master ballot.
        if (!Guard_model_1.Guard.setsMatch(this._validQuestionIds, ballotQuestionIds)) {
            throw new Error('The ballot cast does not completely match the master ballot for this election');
        }
        // Check for duplicate cIds indicating potential duplicate votes
        var ballotChoiceIdList = [];
        ballotData.voteData.questionsData.forEach(function (q) {
            q.choicesData.forEach(function (c) {
                ballotChoiceIdList.push(c.cId);
            });
        });
        var ballotChoiceIds = new Set(ballotChoiceIdList);
        if (ballotChoiceIdList.length !== ballotChoiceIds.size) {
            throw new Error('Duplicate votes in cast ballot.');
        }
        // Check if choice ids are a match between ballot and master ballot.
        if (!Guard_model_1.Guard.setsMatch(this._validChoiceIds, ballotChoiceIds)) {
            throw new Error('The ballot cast does not completely match the master ballot for this election.');
        }
        return true;
    };
    // Subscribe here (one place) and add any methods for tasks we would like
    // to carry out inside the callback.
    Election.prototype.subscribeToBallotCastEventStream = function () {
        var _this = this;
        this._ballotCastEventBus.ballotCastEventStream
            .subscribe(function (ballotCastEvent) {
            _this.recordWhoVoted(ballotCastEvent);
        });
    };
    // Records who voted in response to a ballot cast event
    Election.prototype.recordWhoVoted = function (ballotCastEvent) {
        this._whoVotedIds.add(ballotCastEvent.ballot.voterId);
        this._ballotIds.add(ballotCastEvent.ballot.id);
    };
    Election.prototype.electionIsActive = function () {
        return this._electionPeriod.currentlyIn();
    };
    Election.prototype.getElectionResults = function () {
        if (this._electionPeriod.currentlyAfterRange()) {
            return this._teller.results;
        }
        else {
            throw new Error("Cannot retrieve election results until the election is over.");
        }
    };
    // Returns choice id for winning choice.  does not rule out duplicates
    Election.prototype.getWinner = function () {
        var electionResults = this.getElectionResults();
        var winningScore = 0;
        var winner = '';
        for (var _i = 0, _a = Object.entries(electionResults); _i < _a.length; _i++) {
            var _b = _a[_i], choice = _b[0], score = _b[1];
            if (score.tally > winningScore) {
                winningScore = score.tally;
                winner = choice;
            }
        }
        return winner;
    };
    return Election;
}(Entity_model_1.Entity));
exports.Election = Election;
//# sourceMappingURL=Election.model.js.map