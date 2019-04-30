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
var Entity_model_1 = require("../../../Common/Entities/Entity.model");
// Within the Election System bounded context we don't need to know
// anymore about the user than these small details to accomplish the task of
// issuing them a ballot, and recording their vote.
// A more full picture of the user can be created and updated via the UserManagement
// bounded context - which could likely be handled by a 3rd party Oauth based service.
var Voter = /** @class */ (function (_super) {
    __extends(Voter, _super);
    function Voter(id) {
        return _super.call(this, id) || this;
    }
    Voter.create = function (idGenerator) {
        return new Voter(idGenerator());
    };
    return Voter;
}(Entity_model_1.Entity));
exports.Voter = Voter;
//# sourceMappingURL=Voter.model.js.map