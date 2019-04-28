"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var QuestionVO = /** @class */ (function () {
    function QuestionVO(_questionId, _votes) {
        this._questionId = _questionId;
        this._votes = _votes;
        if (this.allVotesHaveSameQID(_questionId, _votes) && this.allScoresAreValid(_questionId, _votes)) {
            this._questionId = _questionId;
            this._votes = _votes;
        }
    }
    Object.defineProperty(QuestionVO.prototype, "votes", {
        get: function () {
            return this._votes;
        },
        enumerable: true,
        configurable: true
    });
    QuestionVO.prototype.allVotesHaveSameQID = function (qId, votes) {
        if (!votes.every(function (v) { return v.questionId === qId; })) {
            throw new Error("At least one vote does not belong to question of id: " + qId);
        }
        return true;
    };
    QuestionVO.prototype.allScoresAreValid = function (qId, votes) {
        if (this.scoreExistsHigherThanMax(votes)) {
            throw new Error("At least one vote has been assigned a score higher than the max score for question of id: " + qId);
        }
        if (this.duplicateScoresExist(votes)) {
            throw new Error("Duplicate scores exist for votes relating to question of id: " + qId);
        }
        return true;
    };
    QuestionVO.prototype.scoreExistsHigherThanMax = function (votes) {
        var maxScore = this._votes.length - 1;
        return (this._votes.some(function (v) { return v.score.tally > maxScore; }));
    };
    QuestionVO.prototype.duplicateScoresExist = function (votes) {
        var scoreList = votes.map(function (v) { return v.score.tally; });
        return (new Set(scoreList)).size !== scoreList.length;
    };
    return QuestionVO;
}());
exports.QuestionVO = QuestionVO;
//# sourceMappingURL=QuestionVO.model.js.map