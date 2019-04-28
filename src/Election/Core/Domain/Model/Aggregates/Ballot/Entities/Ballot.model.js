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
var Vote_model_1 = require("./Vote.model");
var QuestionVO_model_1 = require("../ValueObjects/QuestionVO.model");
var ScoreVO_model_1 = require("../ValueObjects/ScoreVO.model");
var Ballot = /** @class */ (function (_super) {
    __extends(Ballot, _super);
    function Ballot(id, voterId, _questions) {
        var _this = _super.call(this, id) || this;
        _this.voterId = voterId;
        _this._questions = _questions;
        return _this;
    }
    // Must enforce following logic:
    // 1. Rank logic is correct, and not manipulated - This gets enforced by QuestionVO
    Ballot.create = function (idGenerator, sData) {
        var questions = sData
            .voteData
            .questionsData
            .map(function (qData) {
            var choices = qData
                .choicesData
                .map(function (cData) {
                return new Vote_model_1.Vote(idGenerator(), qData.qId, cData.cId, new ScoreVO_model_1.ScoreVO(cData.score));
            });
            return new QuestionVO_model_1.QuestionVO(qData.qId, choices);
        });
        return new Ballot(idGenerator(), sData.voterId, questions);
    };
    return Ballot;
}(Entity_model_1.Entity));
exports.Ballot = Ballot;
//# sourceMappingURL=Ballot.model.js.map