"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var faker = require("faker");
var CategoryVO_model_1 = require("../../../../../core/domain/model/common/value-objects/CategoryVO.model");
var MasterBallot_model_1 = require("../../../../../core/domain/model/master-ballot-aggregate/MasterBallot.model");
var TestMasterBallotFactory = /** @class */ (function () {
    function TestMasterBallotFactory() {
    }
    TestMasterBallotFactory.createFullMasterBallot = function (options) {
        var s = TestMasterBallotFactory.createBaseMasterBallot(options !== undefined ?
            options.masterBallotParams : undefined);
        var questions;
        if (options !== undefined) {
            questions = TestMasterBallotFactory.createRandomQuestionsWithChoices((options.questionParams !== undefined ?
                options.questionParams : undefined), (options.choiceParams !== undefined ?
                options.choiceParams : undefined));
        }
        else {
            questions = TestMasterBallotFactory.createRandomQuestionsWithChoices();
        }
        for (var _i = 0, questions_1 = questions; _i < questions_1.length; _i++) {
            var q = questions_1[_i];
            s.addQuestionWithChoices(q);
        }
        return s;
    };
    // We create the data first because if there are optional masterBallot parameters we need
    // to mutate those with patchObject method before we pass them into the MasterBallot
    // constructor.
    TestMasterBallotFactory.createBaseMasterBallot = function (masterBallotParams) {
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
        if (masterBallotParams !== undefined)
            TestMasterBallotFactory.patchObject(sData, masterBallotParams);
        return new MasterBallot_model_1.MasterBallot(sData.id, sData.author, sData.title, sData.description, new CategoryVO_model_1.Category(sData.category), sData.datePosted, sData.questions);
    };
    TestMasterBallotFactory.createRandomChoices = function (choiceParams) {
        var randomArray = Array(faker.random.number({ min: 2, max: 12, precision: 1 })).fill(0);
        return randomArray.map(function (data) {
            var choiceData = {
                id: faker.random.uuid(),
                title: faker.lorem.words(Math.floor(Math.random() * (8 - 3)) + 3),
                content: faker.lorem.words(Math.floor(Math.random() * (20 - 8)) + 3),
                contentType: faker.random.word(),
            };
            if (choiceParams !== undefined)
                TestMasterBallotFactory.patchObject(choiceData, choiceParams);
            return choiceData;
        });
    };
    TestMasterBallotFactory.createRandomQuestionsWithChoices = function (questionParams, choiceParams) {
        var _this = this;
        var randomArray = Array(faker.random.number({ min: 2, max: 12, precision: 1 })).fill(0);
        return randomArray.map(function (data) {
            var questionData = {
                id: faker.random.uuid(),
                title: faker.lorem.words(Math.floor(Math.random() * (8 - 3)) + 3),
                questionType: faker.random.word(),
                choicesData: TestMasterBallotFactory.createRandomChoices(choiceParams),
            };
            if (questionParams !== undefined)
                _this.patchObject(questionData, questionParams);
            return questionData;
        });
    };
    // This allows us to patch our generated masterBallots/questions/choices with optional passed
    // in static values.
    TestMasterBallotFactory.patchObject = function (inputObj, patchObj) {
        for (var _i = 0, _a = Object.entries(patchObj); _i < _a.length; _i++) {
            var _b = _a[_i], key = _b[0], value = _b[1];
            if (inputObj.hasOwnProperty(key))
                inputObj[key] = value;
        }
    };
    TestMasterBallotFactory.createMultipleMasterBallots = function (minimum, maximum) {
        var min = minimum === undefined ? 2 : minimum;
        var max = maximum === undefined ? 2 : maximum;
        var randomArray = Array(faker.random.number({ min: min, max: max, precision: 1 })).fill(0);
        return randomArray.map(function (e) {
            return TestMasterBallotFactory.createFullMasterBallot();
        });
    };
    return TestMasterBallotFactory;
}());
exports.TestMasterBallotFactory = TestMasterBallotFactory;
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
//# sourceMappingURL=TestMasterBallotFactory.model.js.map