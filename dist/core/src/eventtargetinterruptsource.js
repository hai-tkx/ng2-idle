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
import { Subscription, fromEvent, merge } from 'rxjs';
import { filter, throttleTime } from 'rxjs/operators';
import { InterruptArgs } from './interruptargs';
import { InterruptSource } from './interruptsource';
var defaultThrottleDelay = 500;
/*
 * An interrupt source on an EventTarget object, such as a Window or HTMLElement.
 */
var EventTargetInterruptSource = /** @class */ (function (_super) {
    __extends(EventTargetInterruptSource, _super);
    function EventTargetInterruptSource(target, events, options) {
        var _this = _super.call(this, null, null) || this;
        _this.target = target;
        _this.events = events;
        _this.eventSubscription = new Subscription();
        if (typeof options === 'number') {
            options = { throttleDelay: options, passive: false };
        }
        options = options || { throttleDelay: defaultThrottleDelay, passive: false };
        if (options.throttleDelay === undefined || options.throttleDelay === null) {
            options.throttleDelay = defaultThrottleDelay;
        }
        _this.throttleDelay = options.throttleDelay;
        _this.passive = !!options.passive;
        var opts = _this.passive ? { passive: true } : null;
        var fromEvents = events.split(' ').map(function (eventName) { return fromEvent(target, eventName, opts); });
        _this.eventSrc = merge.apply(void 0, fromEvents);
        _this.eventSrc = _this.eventSrc.pipe(filter(function (innerArgs) { return !_this.filterEvent(innerArgs); }));
        if (_this.throttleDelay > 0) {
            _this.eventSrc = _this.eventSrc.pipe(throttleTime(_this.throttleDelay));
        }
        var handler = function (innerArgs) { return _this.onInterrupt.emit(new InterruptArgs(_this, innerArgs)); };
        _this.attachFn = function () { return _this.eventSubscription = _this.eventSrc.subscribe(handler); };
        _this.detachFn = function () { return _this.eventSubscription.unsubscribe(); };
        return _this;
    }
    /*
     * Checks to see if the event should be filtered. Always returns false unless overriden.
     * @param event - The original event object.
     * @return True if the event should be filtered (don't cause an interrupt); otherwise, false.
     */
    EventTargetInterruptSource.prototype.filterEvent = function (event) {
        return false;
    };
    Object.defineProperty(EventTargetInterruptSource.prototype, "options", {
        /**
         * Returns the current options being used.
         * @return {EventTargetInterruptOptions} The current option values.
         */
        get: function () {
            return { throttleDelay: this.throttleDelay, passive: this.passive };
        },
        enumerable: true,
        configurable: true
    });
    return EventTargetInterruptSource;
}(InterruptSource));
export { EventTargetInterruptSource };
//# sourceMappingURL=eventtargetinterruptsource.js.map