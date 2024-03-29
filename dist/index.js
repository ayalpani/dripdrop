"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubscriptionCallbacksForTesting = exports.dripdrop = void 0;
const react_1 = require("react");
// Center piece of dripdrop: a map of all registered subscription callbacks
const subscriptionCallbacks = {};
// Used by useSubscribe react hook on mount. Can be called outside of react
function registerCallback(subscriptionId, callback) {
    if (!subscriptionCallbacks[subscriptionId]) {
        subscriptionCallbacks[subscriptionId] = [];
    }
    subscriptionCallbacks[subscriptionId].push(callback);
}
// Used by useSubscribe react hook on unmount. Can be called outside of react
function unregisterCallback(subscriptionId, callback) {
    var _a;
    subscriptionCallbacks[subscriptionId] = (_a = subscriptionCallbacks[subscriptionId]) === null || _a === void 0 ? void 0 : _a.filter((cb) => cb !== callback);
}
// React Trigger Callback Hook
function useTriggerCallbackRef() {
    // define trigger to re-render components that uses the useSubscribe* hooks
    const [, setTrigger] = (0, react_1.useState)(0);
    return (0, react_1.useRef)(() => setTrigger((trigger) => trigger + 1)).current;
}
// Subscribes to value and triggers React Component re-render when
// a value change is notified
function useSubscribe(subscriptionId) {
    const callback = useTriggerCallbackRef();
    // register and unregister trigger in registry
    (0, react_1.useLayoutEffect)(() => {
        registerCallback(subscriptionId, callback);
        return () => unregisterCallback(subscriptionId, callback);
    }, [subscriptionId, callback]);
}
// Call this after you have updated a value and want subscribers to know
function notifySubscribers(subscriptionId) {
    var _a;
    (_a = subscriptionCallbacks[subscriptionId]) === null || _a === void 0 ? void 0 : _a.forEach((cb) => cb());
}
// explicit use of the API
exports.dripdrop = {
    registerCallback,
    unregisterCallback,
    useSubscribe,
    notifySubscribers,
};
