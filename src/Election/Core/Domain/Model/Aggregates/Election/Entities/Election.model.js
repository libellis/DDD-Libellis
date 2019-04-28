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
var Ballot_model_1 = require("../../Ballot/Entities/Ballot.model");
var Election = /** @class */ (function (_super) {
    __extends(Election, _super);
    function Election(id, _electionPeriod, _anonymous, 
    // For enforcing surveyId, questionId's and choiceId's matching up
    // perfectly for submitted ballot data.
    _masterBallot, 
    // Array of ballot UUIDs that have been cast
    _ballots, 
    // Array of user UUIDs that have already voted
    _whoVoted) {
        var _this = _super.call(this, id) || this;
        _this._electionPeriod = _electionPeriod;
        _this._anonymous = _anonymous;
        _this._masterBallot = _masterBallot;
        _this._ballots = _ballots;
        _this._whoVoted = _whoVoted;
        return _this;
    }
    // Here is where we should enforce invariance that would check whether
    // the ballot data accurately matches the survey it should be attached to.
    Election.prototype.castBallot = function (idGenerator, ballotData) {
        // Has the user in question already voted?
        if (this._whoVoted.has(ballotData.voterId)) {
            throw new Error("That user has already voted in this election");
        }
        // Check if ballot data matches up with survey it should be related to.
        var ballot = Ballot_model_1.Ballot.create(idGenerator, ballotData);
        this._ballots.add(ballot.id);
    };
    return Election;
}(Entity_model_1.Entity));
exports.Election = Election;
//# sourceMappingURL=Election.model.js.map