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
var Entity_model_1 = require("../../../Common/Entities/Entity.model");
var DateTimeRangeVO_model_1 = require("../../../../../../../SharedKernel/DateTimeRangeVO.model");
var Ballot_model_1 = require("../../Ballot/Entities/Ballot.model");
var Guard_model_1 = require("../../../../../../../SharedKernel/Guard.model");
var Election = /** @class */ (function (_super) {
    __extends(Election, _super);
    function Election(id, _electionPeriod, _anonymous, _masterBallotId, _validQuestionIds, _validChoiceIds, 
    // Array of ballot UUIDs that have been cast.
    _ballotIds, 
    // Array of user UUIDs that have already voted
    _whoVotedIds, 
    // We need the ballot cast event but so we can subscribe to it
    // and update our list of who has voted
    _ballotCastEventBus) {
        var _this = _super.call(this, id) || this;
        _this._electionPeriod = _electionPeriod;
        _this._anonymous = _anonymous;
        _this._masterBallotId = _masterBallotId;
        _this._validQuestionIds = _validQuestionIds;
        _this._validChoiceIds = _validChoiceIds;
        _this._ballotIds = _ballotIds;
        _this._whoVotedIds = _whoVotedIds;
        _this._ballotCastEventBus = _ballotCastEventBus;
        // subscribe to event bus here so we are ready to record who has already voted as
        // early as possible.  Any better ideas for where to subscribe?
        _this._ballotCastEventBus = _ballotCastEventBus;
        _this.subscribeToBallotCastEventStream();
        return _this;
    }
    // Factory method for enforcing invariance:
    // 1. Start and end date validity is checked by DateTimeRange VO
    Election.create = function (idGenerator, start, end, anonymous, masterBallot, ballotCastEventBus) {
        var validQuestionIds = new Set(masterBallot.questions.map(function (q) { return q.id; }));
        var validChoiceIds = new (Set.bind.apply(Set, [void 0].concat(masterBallot.questions.map(function (q) {
            return q.choices.map(function (c) {
                return c.id;
            });
        }))))();
        return new Election(idGenerator(), new DateTimeRangeVO_model_1.DateTimeRange(start, end), anonymous, masterBallot.id, validQuestionIds, validChoiceIds, new Set(), new Set(), ballotCastEventBus);
    };
    // Here is where we should enforce invariance that would check whether
    // the ballot data accurately matches the survey it should be attached to.
    Election.prototype.castBallot = function (idGenerator, ballotData) {
        // Has the user in question already voted?
        if (this._whoVotedIds.has(ballotData.voterId)) {
            throw new Error("That user has already voted in this election");
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
            throw new Error('The ballot cast does not completely match the master ballot for this election.');
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
        this._ballotCastEventBus.stream
            .subscribe(function (ballotCastEvent) {
            _this.recordWhoVoted(ballotCastEvent);
        });
    };
    // Records who voted in response to a ballot cast event
    Election.prototype.recordWhoVoted = function (ballotCastEvent) {
        this._whoVotedIds.add(ballotCastEvent.ballot.voterId);
        this._ballotIds.add(ballotCastEvent.ballot.id);
    };
    return Election;
}(Entity_model_1.Entity));
exports.Election = Election;
//# sourceMappingURL=Election.model.js.map