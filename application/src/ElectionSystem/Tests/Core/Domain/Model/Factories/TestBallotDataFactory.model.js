"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TestBallotDataFactory = /** @class */ (function () {
    function TestBallotDataFactory() {
    }
    TestBallotDataFactory.createTestBallot = function (voterId, masterBallot) {
        var ballotData = {
            voterId: voterId,
            masterBallotId: masterBallot.id,
            voteData: {
                questionsData: masterBallot.questions
                    .map(function (q) {
                    return {
                        qId: q.id,
                        choicesData: q.choices
                            .map(function (c, j) {
                            return {
                                cId: c.id,
                                score: j,
                            };
                        })
                    };
                })
            }
        };
        return ballotData;
    };
    TestBallotDataFactory.createTestBallotsFromVotersList = function (voters, masterBallot) {
        var _this = this;
        return voters
            .map(function (voter) {
            return _this.createTestBallot(voter.id, masterBallot);
        });
    };
    return TestBallotDataFactory;
}());
exports.TestBallotDataFactory = TestBallotDataFactory;
//# sourceMappingURL=TestBallotDataFactory.model.js.map