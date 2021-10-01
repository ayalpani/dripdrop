"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notifyCallbacks = exports.useSubscribe = void 0;
const react_1 = require("react");
const subscriptionCallbacks = {};
function registerCallback(subscriptionId, callback) {
    if (!subscriptionCallbacks[subscriptionId]) {
        subscriptionCallbacks[subscriptionId] = [];
    }
    subscriptionCallbacks[subscriptionId].push(callback);
}
function unregisterCallback(subscriptionId, callback) {
    var _a;
    subscriptionCallbacks[subscriptionId] = (_a = subscriptionCallbacks[subscriptionId]) === null || _a === void 0 ? void 0 : _a.filter((cb) => cb !== callback);
}
function useTriggerCallbackRef() {
    // define trigger function to rerender component that uses the useSubscribe* hooks
    const [, setTrigger] = (0, react_1.useState)(0);
    return (0, react_1.useRef)(() => setTrigger((trigger) => trigger + 1)).current;
}
function useSubscribe(subscriptionId) {
    const callback = useTriggerCallbackRef();
    // register and unregister trigger in registry
    (0, react_1.useEffect)(() => {
        registerCallback(subscriptionId, callback);
        return () => unregisterCallback(subscriptionId, callback);
    }, [subscriptionId, callback]);
}
exports.useSubscribe = useSubscribe;
function notifyCallbacks(subscriptionId) {
    var _a;
    //   console.log("notifyCallbacks", {
    //     appState,
    //     subscriptionCallbacks: subscriptionCallbacks[subscriptionId],
    //   });
    (_a = subscriptionCallbacks[subscriptionId]) === null || _a === void 0 ? void 0 : _a.forEach((cb) => cb());
}
exports.notifyCallbacks = notifyCallbacks;
