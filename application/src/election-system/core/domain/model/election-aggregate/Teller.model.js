"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Entity_model_1 = require("../../../../../SharedKernel/Entities/Entity.model");
var TallyVO_model_1 = require("../common/ValueObjects/TallyVO.model");
// This is part of the election aggregate because the Election is the only entity that knows about the timespan that an
// election is valid in (electionPeriod) and therefore must enforce when the final results can be retrieved.  Otherwise
// someone could access the teller directly before the election is over.
// Also, deleting an election facilitates deleting the teller associated with that election
var Teller = /** @class */ (function (_super) {
    __extends(Teller, _super);
    function Teller(id, choiceIds, _ballotCastEventBus) {
        var _this = _super.call(this, id) || this;
        _this._ballotCastEventBus = _ballotCastEventBus;
        _this._voteTally = Teller.mapSetValuesToKeys(choiceIds);
        return _this;
    }
    Teller.mapSetValuesToKeys = function (choiceIds) {
        var dict = {};
        choiceIds.forEach(function (c) {
            dict[c] = new TallyVO_model_1.TallyVO(0);
        });
        return dict;
    };
    // This should be started from aggregate root where electionPeriod is enforced.
    // Might need to do some concurrency testing with this.
    Teller.prototype.beginCounting = function () {
        var _this = this;
        this._ballotCastEventBus.ballotCastEventStream.subscribe(function (ballotCastEvent) {
            _this.countBallots(ballotCastEvent.ballot);
        });
    };
    Teller.prototype.countBallots = function (ballot) {
        for (var _i = 0, _a = ballot._questions; _i < _a.length; _i++) {
            var question = _a[_i];
            for (var _b = 0, _c = question.votes; _b < _c.length; _b++) {
                var vote = _c[_b];
                this._voteTally[vote.choiceId] = this._voteTally[vote.choiceId]
                    .incrementTally(vote.score);
            }
        }
    };
    Object.defineProperty(Teller.prototype, "results", {
        get: function () {
            return this._voteTally;
        },
        enumerable: true,
        configurable: true
    });
    return Teller;
}(Entity_model_1.Entity));
exports.Teller = Teller;
//# sourceMappingURL=Teller.model.js.map