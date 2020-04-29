"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AdminComponent = /** @class */ (function () {
    function AdminComponent(userService) {
        this.userService = userService;
    }
    AdminComponent.prototype.ngOnInit = function () {
    };
    AdminComponent.prototype.fetchAdminData = function () {
        var _this = this;
        this.userService.getAdminData().subscribe(function (result) {
            _this.adminData = result;
        });
    };
    return AdminComponent;
}());
exports.AdminComponent = AdminComponent;
//# sourceMappingURL=admin.component.js.map