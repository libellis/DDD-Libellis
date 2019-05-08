"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
require("mocha");
var TestSurveyFactory_model_1 = require("../Factories/TestSurveyFactory.model");
describe('test value object construction', function () {
    it('should successfully construct Category value object from valid string', function () {
        var goodFunction = TestSurveyFactory_model_1.TestSurveyFactory.createFullSurvey.bind(TestSurveyFactory_model_1.TestSurveyFactory, { surveyParams: {
                category: 'TestCategory',
            } });
        chai_1.expect(goodFunction).to.not.throw();
    });
    it('should fail to construct Category value object from empty string', function () {
        var badFunction = TestSurveyFactory_model_1.TestSurveyFactory.createFullSurvey.bind(TestSurveyFactory_model_1.TestSurveyFactory, { surveyParams: {
                category: '',
            } });
        chai_1.expect(badFunction).to.throw();
    });
    it('should fail to construct Category value object from long string', function () {
        var badFunction = TestSurveyFactory_model_1.TestSurveyFactory.createFullSurvey.bind(TestSurveyFactory_model_1.TestSurveyFactory, { surveyParams: {
                category: "This is definitely a very long string that\n\t\t\t\t\t\tis way longer than a category should be."
            } });
        chai_1.expect(badFunction).to.throw();
    });
});
//# sourceMappingURL=Category.spec.js.map