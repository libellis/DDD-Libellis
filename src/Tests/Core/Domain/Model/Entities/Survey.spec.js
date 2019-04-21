"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
require("mocha");
var TestSurveyFactory_model_1 = require("../Factories/TestSurveyFactory.model");
describe('test non-root entity purity', function () {
    it('should not allow direct question mutation to affect aggregate consistency', function () {
        var surveyResult = TestSurveyFactory_model_1.TestSurveyFactory.createFullSurvey();
        var question = surveyResult.questions[0];
        var wrongQuestionTitle = 'TestWrongQuestionTitle';
        question.title = wrongQuestionTitle;
        chai_1.assert.notEqual(surveyResult.questions[0].title, wrongQuestionTitle);
    });
    it('should not allow direct choice mutation to affect aggregate consistency', function () {
        var surveyResult = TestSurveyFactory_model_1.TestSurveyFactory.createFullSurvey();
        var choice = surveyResult.questions[0].choices[0];
        var wrongChoiceType = 'TestWrongChoiceType';
        choice.contentType = wrongChoiceType;
        console.log(surveyResult.questions[0].choices[0]);
        chai_1.assert.notEqual(surveyResult.questions[0].choices[0].contentType, wrongChoiceType);
    });
});
//# sourceMappingURL=Survey.spec.js.map