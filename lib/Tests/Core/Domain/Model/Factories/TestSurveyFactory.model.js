"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var faker = __importStar(require("faker"));
var Survey_model_1 = require("../../../../../Core/Domain/Model/Entities/Survey.model");
var uuid_1 = require("uuid");
var TestSurveyFactory = /** @class */ (function () {
    function TestSurveyFactory() {
    }
    TestSurveyFactory.create = function () {
        var s = new Survey_model_1.Survey(uuid_1.v4(), faker.name, faker.
        );
    };
    return TestSurveyFactory;
}());
exports.TestSurveyFactory = TestSurveyFactory;
//# sourceMappingURL=TestSurveyFactory.model.js.map