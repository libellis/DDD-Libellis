"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var faker = require("faker");
var TestUpdateMasterBallotDataFactory = /** @class */ (function () {
    function TestUpdateMasterBallotDataFactory() {
    }
    TestUpdateMasterBallotDataFactory.createTestUpdateMasterBallotData = function (masterBallot) {
        return {
            title: faker.random.word(),
            description: faker.random.words(5),
            category: faker.random.word(),
            questionsData: TestUpdateMasterBallotDataFactory.randomizeQuestionData(masterBallot.questions),
        };
    };
    TestUpdateMasterBallotDataFactory.randomizeQuestionData = function (questionsData) {
        return questionsData.map(function (data) {
            return {
                id: data.id,
                title: faker.lorem.words(Math.floor(Math.random() * (8 - 3)) + 3),
                questionType: faker.random.word(),
                choicesData: TestUpdateMasterBallotDataFactory.randomizeChoicesData(data.choices),
            };
        });
    };
    TestUpdateMasterBallotDataFactory.randomizeChoicesData = function (choices) {
        var randomArray = Array(faker.random.number({ min: 2, max: 12, precision: 1 })).fill(0);
        return randomArray.map(function (data) {
            return {
                id: data.id,
                title: faker.lorem.words(Math.floor(Math.random() * (8 - 3)) + 3),
                content: faker.lorem.words(Math.floor(Math.random() * (20 - 8)) + 3),
                contentType: faker.random.word(),
            };
        });
    };
    return TestUpdateMasterBallotDataFactory;
}());
exports.TestUpdateMasterBallotDataFactory = TestUpdateMasterBallotDataFactory;
//# sourceMappingURL=TestUpdateMasterBallotDataFactory.model.js.map