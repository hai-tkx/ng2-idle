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
import { IdleExpiry } from './idleexpiry';
/*
 * Represents a simple in-memory store of expiry values.
 * @extends IdleExpiry
 */
var SimpleExpiry = /** @class */ (function (_super) {
    __extends(SimpleExpiry, _super);
    function SimpleExpiry() {
        var _this = _super.call(this) || this;
        _this.lastValue = null;
        return _this;
    }
    /*
     * Gets or sets the last expiry date.
     * @param value - The expiry value to set; omit to only return the value.
     * @return The current expiry value.
     */
    SimpleExpiry.prototype.last = function (value) {
        if (value !== void 0) {
            this.lastValue = value;
        }
        return this.lastValue;
    };
    return SimpleExpiry;
}(IdleExpiry));
export { SimpleExpiry };
//# sourceMappingURL=simpleexpiry.js.map