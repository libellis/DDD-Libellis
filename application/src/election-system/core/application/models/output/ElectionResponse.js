"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ElectionResponse = /** @class */ (function () {
    function ElectionResponse(id, startDate, endDate, anonymous, masterBallotId, tellerId, restricted, permittedVoters) {
        this.id = id;
        this.startDate = startDate;
        this.endDate = endDate;
        this.anonymous = anonymous;
        this.masterBallotId = masterBallotId;
        this.tellerId = tellerId;
        this.restricted = restricted;
        this.permittedVoters = permittedVoters;
    }
    return ElectionResponse;
}());
exports.ElectionResponse = ElectionResponse;
//# sourceMappingURL=ElectionResponse.js.map