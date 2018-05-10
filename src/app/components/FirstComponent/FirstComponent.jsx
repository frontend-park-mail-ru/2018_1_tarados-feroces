"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
require("./Back.scss");
var FirstComponent = /** @class */ (function (_super) {
    __extends(FirstComponent, _super);
    function FirstComponent() {
        return _super.call(this) || this;
    }
    FirstComponent.prototype.render = function () {
        return (<p>Hello!</p>);
    };
    return FirstComponent;
}(React.Component));
exports.FirstComponent = FirstComponent;
