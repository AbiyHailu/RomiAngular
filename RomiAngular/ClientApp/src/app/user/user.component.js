"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserComponent = /** @class */ (function () {
    function UserComponent(userService) {
        this.userService = userService;
    }
    UserComponent.prototype.ngOnInit = function () {
    };
    UserComponent.prototype.fetchUserData = function () {
        var _this = this;
        this.userService.getUserData().subscribe(function (result) {
            _this.userData = result;
        });
    };
    return UserComponent;
}());
exports.UserComponent = UserComponent;
//# sourceMappingURL=user.component.js.map