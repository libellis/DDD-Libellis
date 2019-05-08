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
var Survey = /** @class */ (function (_super) {
    __extends(Survey, _super);
    function Survey(id, author, title, description, category, datePosted, anonymous, published, questions) {
        var _this = _super.call(this, id) || this;
        _this.author = author;
        _this.title = title;
        _this.description = description;
        _this.category = category;
        _this.datePosted = datePosted;
        _this.anonymous = anonymous;
        _this.published = published;
        _this.questions = questions;
        return _this;
    }
    Survey.create = function (idGenerator, sData) {
        var questions = sData
            .questionsData
            .map(function (qData) {
            var qId = idGenerator();
            return new Question_model_1.Question(qId, qData.title, qData.questionType);
        });
        return new Survey(idGenerator(), sData.author, sData.title, sData.description, sData.category, new Date(), sData.anonymous, sData.published, questions);
    };
    return Survey;
}(Entity_model_1.Entity));
exports.Survey = Survey;
//# sourceMappingURL=MasterBallot.model.js.map