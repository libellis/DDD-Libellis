"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var faker = require("faker");
var Survey_model_1 = require("../../../../../Core/Domain/Model/Entities/Survey.model");
var CategoryVO_model_1 = require("../../../../../Core/Domain/Model/ValueObjects/CategoryVO.model");
var TestSurveyFactory = /** @class */ (function () {
    function TestSurveyFactory() {
    }
    TestSurveyFactory.createFullSurvey = function (options) {
        var s = this.createBaseSurvey(options !== undefined ?
            options.surveyParams : undefined);
        var questions;
        if (options !== undefined) {
            questions = this.createRandomQuestionsWithChoices((options.questionParams !== undefined ?
                options.questionParams : undefined), (options.choiceParams !== undefined ?
                options.choiceParams : undefined));
        }
        else {
            questions = this.createRandomQuestionsWithChoices();
        }
        for (var _i = 0, questions_1 = questions; _i < questions_1.length; _i++) {
            var q = questions_1[_i];
            s.addQuestionWithChoices(q);
        }
        return s;
    };
    // We create the data first because if there are optional survey parameters we need
    // to mutate those with patchObject method before we pass them into the Survey
    // constructor.
    TestSurveyFactory.createBaseSurvey = function (surveyParams) {
        var sData = {
            id: faker.random.uuid(),
            author: faker.name.firstName() + " " + faker.name.lastName(),
            title: faker.lorem.words(Math.floor(Math.random() * (8 - 3)) + 3),
            description: faker.lorem.words(Math.floor(Math.random() * (128 - 32)) + 3),
            category: faker.lorem.word(),
            datePosted: faker.date.recent(365),
            published: faker.random.boolean(),
            anonymous: faker.random.boolean(),
            questions: [],
        };
        if (surveyParams !== undefined)
            this.patchObject(sData, surveyParams);
        return new Survey_model_1.Survey(sData.id, sData.author, sData.title, sData.description, new CategoryVO_model_1.CategoryVO(sData.category), sData.datePosted, sData.published, sData.anonymous, sData.questions);
    };
    TestSurveyFactory.createRandomChoices = function (choiceParams) {
        var _this = this;
        var randomArray = Array(faker.random.number({ min: 2, max: 12, precision: 1 })).fill(0);
        return randomArray.map(function (data) {
            var choiceData = {
                id: faker.random.uuid(),
                title: faker.lorem.words(Math.floor(Math.random() * (8 - 3)) + 3),
                content: faker.lorem.words(Math.floor(Math.random() * (20 - 8)) + 3),
                contentType: faker.random.word(),
                voteTally: faker.random.number({ min: 0, max: 10000, precision: 1 })
            };
            if (choiceParams !== undefined)
                _this.patchObject(choiceData, choiceParams);
            return choiceData;
        });
    };
    TestSurveyFactory.createRandomQuestionsWithChoices = function (questionParams, choiceParams) {
        var _this = this;
        var randomArray = Array(faker.random.number({ min: 2, max: 12, precision: 1 })).fill(0);
        return randomArray.map(function (data) {
            var questionData = {
                id: faker.random.uuid(),
                title: faker.lorem.words(Math.floor(Math.random() * (8 - 3)) + 3),
                questionType: faker.random.word(),
                choicesData: _this.createRandomChoices(choiceParams),
            };
            if (questionParams !== undefined)
                _this.patchObject(questionData, questionParams);
            return questionData;
        });
    };
    // This allows us to patch our generated surveys/questions/choices with optional passed
    // in static values.
    TestSurveyFactory.patchObject = function (inputObj, patchObj) {
        for (var _i = 0, _a = Object.entries(patchObj); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            if (inputObj.hasOwnProperty(key))
                inputObj[key] = value;
        }
    };
    return TestSurveyFactory;
}());
exports.TestSurveyFactory = TestSurveyFactory;
var QuestionData = /** @class */ (function () {
    function QuestionData() {
    }
    return QuestionData;
}());
var ChoiceData = /** @class */ (function () {
    function ChoiceData() {
    }
    return ChoiceData;
}());
//# sourceMappingURL=TestSurveyFactory.model.js.map