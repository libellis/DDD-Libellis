"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
require("mocha");
var TestSurveyFactory_model_1 = require("../Factories/TestSurveyFactory.model");
describe('test value object construction', function () {
    it('should successfully construct VoteTally value object with a valid tally', function () {
        var goodFunction = TestSurveyFactory_model_1.TestSurveyFactory.createFullSurvey.bind(TestSurveyFactory_model_1.TestSurveyFactory, { choiceParams: {
                voteTally: 50,
            } });
        chai_1.expect(goodFunction).to.not.throw();
    });
    it('should fail to construct VoteTally value object with a negative tally', function () {
        var badFunction = TestSurveyFactory_model_1.TestSurveyFactory.createFullSurvey.bind(TestSurveyFactory_model_1.TestSurveyFactory, {
            choiceParams: {
                voteTally: -30,
            }
        });
        chai_1.expect(badFunction).to.throw();
    });
    it('should fail to construct VoteTally value object with a fractional number', function () {
        var badFunction = TestSurveyFactory_model_1.TestSurveyFactory.createFullSurvey.bind(TestSurveyFactory_model_1.TestSurveyFactory, {
            choiceParams: {
                voteTally: 20.275,
            }
        });
        chai_1.expect(badFunction).to.throw();
    });
});
//# sourceMappingURL=VoteTallyVO.spec.js.map