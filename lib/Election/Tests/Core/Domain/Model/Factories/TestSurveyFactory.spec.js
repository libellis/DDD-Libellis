"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
require("mocha");
var TestSurveyFactory_model_1 = require("./TestSurveyFactory.model");
var Survey_model_1 = require("../../../../../Core/Domain/Model/Aggregates/Ballot/Entities/MasterBallot.model");
describe('Test TestSurveyFactory constructor', function () {
    it('should construct an instance of MasterBallot entity', function () {
        var surveyResult = TestSurveyFactory_model_1.TestSurveyFactory.createFullSurvey();
        chai_1.expect(surveyResult).instanceOf(Survey_model_1.Survey);
    });
    it('should correctly pass in optional survey parameters', function () {
        var testTitle = 'TestTitle';
        var surveyResult = TestSurveyFactory_model_1.TestSurveyFactory.createFullSurvey({ surveyParams: { title: testTitle } });
        chai_1.expect(surveyResult.title).equals(testTitle);
    });
    it('should correctly pass in optional question parameters', function () {
        var testType = 'TestQuestionType';
        var surveyResult = TestSurveyFactory_model_1.TestSurveyFactory.createFullSurvey({ questionParams: { questionType: testType } });
        chai_1.expect(surveyResult.questions[0].type).equals(testType);
    });
    it('should correctly pass in optional choice parameters', function () {
        var testId = 'TestUUID';
        var surveyResult = TestSurveyFactory_model_1.TestSurveyFactory.createFullSurvey({ choiceParams: { id: testId } });
        chai_1.expect(surveyResult.questions[0].choices[0].id).equals(testId);
    });
});
//# sourceMappingURL=TestSurveyFactory.spec.js.map
