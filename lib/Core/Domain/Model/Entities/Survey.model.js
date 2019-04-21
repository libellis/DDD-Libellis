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
var Entity_model_1 = require("./Entity.model");
var Question_model_1 = require("./Question.model");
var CategoryVO_model_1 = require("../ValueObjects/CategoryVO.model");
var VoteTallyVO_model_1 = require("../ValueObjects/VoteTallyVO.model");
var Choice_model_1 = require("./Choice.model");
var Survey = /** @class */ (function (_super) {
    __extends(Survey, _super);
    function Survey(id, author, title, description, category, datePosted, anonymous, published, _questions) {
        var _this = _super.call(this, id) || this;
        _this.author = author;
        _this.title = title;
        _this.description = description;
        _this.category = category;
        _this.datePosted = datePosted;
        _this.anonymous = anonymous;
        _this.published = published;
        _this._questions = _questions;
        return _this;
    }
    Object.defineProperty(Survey.prototype, "questions", {
        // deep clone so any mutations by other aggregates don't change internal aggregate consistency.
        get: function () {
            return this._questions.map(function (q) {
                return new Question_model_1.Question(q.id, q.title, q.type, q.choices.slice());
            });
        },
        enumerable: true,
        configurable: true
    });
    // Factory method is only for the very first time entity is created.
    // Otherwise re-hydrate with constructor as per DDD practice.
    Survey.create = function (idGenerator, sData) {
        var questions = sData
            .questionsData
            .map(function (qData) {
            var choices = qData
                .choicesData
                .map(function (cData) {
                return new Choice_model_1.Choice(idGenerator(), cData.title, cData.content, cData.contentType, new VoteTallyVO_model_1.VoteTallyVO(cData.voteTally));
            });
            return new Question_model_1.Question(idGenerator(), qData.title, qData.questionType, choices);
        });
        return new Survey(idGenerator(), sData.author, sData.title, sData.description, new CategoryVO_model_1.CategoryVO(sData.category), new Date(), sData.anonymous, sData.published, questions);
    };
    Survey.prototype.addQuestionWithChoices = function (questionData) {
        var newQuestion = new Question_model_1.Question(questionData.id, questionData.title, questionData.questionType, questionData.choicesData.map(function (cData) {
            return new Choice_model_1.Choice(cData.id, cData.title, cData.content, cData.contentType, new VoteTallyVO_model_1.VoteTallyVO(cData.voteTally));
        }));
        this.questions.push(newQuestion);
        return true;
    };
    return Survey;
}(Entity_model_1.Entity));
exports.Survey = Survey;
//# sourceMappingURL=Survey.model.js.map