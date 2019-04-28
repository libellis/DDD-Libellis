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
var Question_model_1 = require("./Question.model");
var CategoryVO_model_1 = require("../../../Common/ValueObjects/CategoryVO.model");
var VoteTallyVO_model_1 = require("../../../Common/ValueObjects/VoteTallyVO.model");
var Choice_model_1 = require("./Choice.model");
var Ballot = /** @class */ (function (_super) {
    __extends(Ballot, _super);
    function Ballot(id, voter, _questions) {
        var _this = _super.call(this, id) || this;
        _this.voter = voter;
        _this._questions = _questions;
        return _this;
    }
    Object.defineProperty(Ballot.prototype, "questions", {
        // deep clone so any mutations by other aggregates don't change internal aggregate consistency.
        get: function () {
            return this._questions.map(function (q) {
                return new Question_model_1.Question(q.id, q.title, q.type, q.choices.map(function (c) {
                    return new Choice_model_1.Choice(c.id, c.title, c.content, c.contentType, c.voteTally);
                }));
            });
        },
        enumerable: true,
        configurable: true
    });
    // Must enforce following logic:
    // 1. The question id's much match up perfectly with the survey id.
    // 2. The choice id's much match up perfectly with each question id.
    // 3. Incoming vote data must be complete (every question voted on)
    // 4. Rank logic is correct, and not manipulated.
    Ballot.create = function (idGenerator, sData) {
        var questions = sData
            .voteData
            .questionsData
            .map(function (qData) {
            var choices = qData
                .choicesData
                .map(function (cData) {
                return new Choice_model_1.Choice(idGenerator(), cData.title, cData.content, cData.contentType, new VoteTallyVO_model_1.VoteTallyVO(cData.voteTally));
            });
            return new Question_model_1.Question(idGenerator(), qData.title, qData.questionType, choices);
        });
        return new Ballot(idGenerator(), sData.author, sData.title, sData.description, new CategoryVO_model_1.CategoryVO(sData.category), new Date(), sData.anonymous, sData.published, questions);
    };
    Ballot.prototype.addQuestionWithChoices = function (questionData) {
        var newQuestion = new Question_model_1.Question(questionData.id, questionData.title, questionData.questionType, questionData.choicesData.map(function (cData) {
            return new Choice_model_1.Choice(cData.id, cData.title, cData.content, cData.contentType, new VoteTallyVO_model_1.VoteTallyVO(cData.voteTally));
        }));
        this._questions.push(newQuestion);
        return true;
    };
    return Ballot;
}(Entity_model_1.Entity));
exports.Ballot = Ballot;
//# sourceMappingURL=Ballot.model.js.map