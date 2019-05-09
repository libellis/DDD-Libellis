"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var faker = require("faker");
var TestNewMasterBallotDataFactory = /** @class */ (function () {
    function TestNewMasterBallotDataFactory() {
    }
    TestNewMasterBallotDataFactory.createTestNewMasterBallotData = function () {
        return {
            title: faker.random.word(),
            description: faker.random.words(5),
            category: faker.random.word(),
            questionsData: TestNewMasterBallotDataFactory.createRandomQuestionsWithChoices(),
        };
    };
    TestNewMasterBallotDataFactory.createRandomQuestionsWithChoices = function () {
        var randomArray = Array(faker.random.number({ min: 2, max: 12, precision: 1 })).fill(0);
        return randomArray.map(function (data) {
            var questionData = {
                title: faker.lorem.words(Math.floor(Math.random() * (8 - 3)) + 3),
                questionType: faker.random.word(),
                choicesData: TestNewMasterBallotDataFactory.createRandomChoices(),
            };
            return questionData;
        });
    };
    TestNewMasterBallotDataFactory.createRandomChoices = function () {
        var randomArray = Array(faker.random.number({ min: 2, max: 12, precision: 1 })).fill(0);
        return randomArray.map(function (data) {
            var choiceData = {
                title: faker.lorem.words(Math.floor(Math.random() * (8 - 3)) + 3),
                content: faker.lorem.words(Math.floor(Math.random() * (20 - 8)) + 3),
                contentType: faker.random.word(),
            };
            return choiceData;
        });
    };
    return TestNewMasterBallotDataFactory;
}());
exports.TestNewMasterBallotDataFactory = TestNewMasterBallotDataFactory;
//# sourceMappingURL=TestNewMasterBallotDataFactory.model.js.map