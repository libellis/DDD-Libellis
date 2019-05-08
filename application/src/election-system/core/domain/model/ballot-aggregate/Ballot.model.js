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
var Entity_model_1 = require("../../../../../shared-kernel/entities/Entity.model");
var Vote_model_1 = require("./Vote.model");
var QuestionVO_model_1 = require("./value-objects/QuestionVO.model");
var ScoreVO_model_1 = require("../common/value-objects/ScoreVO.model");
var BallotCastEvent_model_1 = require("../events/BallotCastEvent.model");
var Ballot = /** @class */ (function (_super) {
    __extends(Ballot, _super);
    function Ballot(id, voterId, _questions, eventBus) {
        var _this = _super.call(this, id) || this;
        _this.voterId = voterId;
        _this._questions = _questions;
        _this.eventBus = eventBus;
        return _this;
    }
    // Factory method Must enforce following logic:
    // 1. Rank logic is correct, and not manipulated - This gets enforced by Question VO
    Ballot.cast = function (idGenerator, eventBus, sData) {
        // We push our questions voteData through score and
        // question value objects to automatically hit their validation
        // systems for invariance enforcement.
        var questions = sData
            .voteData
            .questionsData
            .map(function (qData) {
            var choices = qData
                .choicesData
                .map(function (cData) {
                return new Vote_model_1.Vote(idGenerator(), qData.qId, cData.cId, new ScoreVO_model_1.Score(cData.score));
            });
            return new QuestionVO_model_1.Question(qData.qId, choices);
        });
        var ballot = new Ballot(idGenerator(), sData.voterId, questions, eventBus);
        // We push the ballot cast event to any interested parties
        var ballotCastEvent = new BallotCastEvent_model_1.BallotCastEvent(ballot);
        eventBus.ballotCastEventStream.next(ballotCastEvent);
        return ballot;
    };
    // Generates a new cloned instance of the entity
    // Note: _questions is simply an array of value objects, which
    // are immutable so we can pass them without deep cloning them.
    Ballot.prototype.clone = function () {
        return new Ballot(this.id, this.voterId, this._questions, this.eventBus);
    };
    return Ballot;
}(Entity_model_1.Entity));
exports.Ballot = Ballot;
//# sourceMappingURL=Ballot.model.js.map