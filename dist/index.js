"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notifySubscribers = exports.useSubscribe = exports.unregisterCallback = exports.registerCallback = exports.getSubscriptionCallbacksForTesting = void 0;
const react_1 = require("react");
const subscriptionCallbacks = {};
// exported for testing only
const getSubscriptionCallbacksForTesting = () => {
    return { ...subscriptionCallbacks };
};
exports.getSubscriptionCallbacksForTesting = getSubscriptionCallbacksForTesting;
function registerCallback(subscriptionId, callback) {
    if (!subscriptionCallbacks[subscriptionId]) {
        subscriptionCallbacks[subscriptionId] = [];
    }
    subscriptionCallbacks[subscriptionId].push(callback);
}
exports.registerCallback = registerCallback;
function unregisterCallback(subscriptionId, callback) {
    var _a;
    subscriptionCallbacks[subscriptionId] = (_a = subscriptionCallbacks[subscriptionId]) === null || _a === void 0 ? void 0 : _a.filter((cb) => cb !== callback);
}
exports.unregisterCallback = unregisterCallback;
function useTriggerCallbackRef() {
    // define trigger function to rerender component that uses the useSubscribe* hooks
    const [, setTrigger] = (0, react_1.useState)(0);
    return (0, react_1.useRef)(() => setTrigger((trigger) => trigger + 1)).current;
}
function useSubscribe(subscriptionId) {
    const callback = useTriggerCallbackRef();
    // register and unregister trigger in registry
    (0, react_1.useLayoutEffect)(() => {
        registerCallback(subscriptionId, callback);
        return () => unregisterCallback(subscriptionId, callback);
    }, [subscriptionId, callback]);
}
exports.useSubscribe = useSubscribe;
function notifySubscribers(subscriptionId) {
    var _a;
    (_a = subscriptionCallbacks[subscriptionId]) === null || _a === void 0 ? void 0 : _a.forEach((cb) => cb());
}
exports.notifySubscribers = notifySubscribers;
