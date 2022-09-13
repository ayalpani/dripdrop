import { useLayoutEffect, useRef, useState } from "react";

type $QueryCallbackType = () => void;

type $SubscriptionCallbacksType = {
  [subscriptionId: string]: $QueryCallbackType[];
};

// Center piece of react-ivity: a map of all registered subscription callbacks
const subscriptionCallbacks: $SubscriptionCallbacksType = {};

// Used by useSubscribe react hook on mount. Can be called outside of react
export function registerCallback(
  subscriptionId: string,
  callback: $QueryCallbackType
): void {
  if (!subscriptionCallbacks[subscriptionId]) {
    subscriptionCallbacks[subscriptionId] = [];
  }

  subscriptionCallbacks[subscriptionId].push(callback);
}

// Used by useSubscribe react hook on unmount. Can be called outside of react
export function unregisterCallback(
  subscriptionId: string,
  callback: $QueryCallbackType
): void {
  subscriptionCallbacks[subscriptionId] = subscriptionCallbacks[
    subscriptionId
  ]?.filter((cb) => cb !== callback);
}

// React Trigger Callback Hook
function useTriggerCallbackRef() {
  // define trigger to re-render components that uses the useSubscribe* hooks
  const [, setTrigger] = useState(0);
  return useRef(() => setTrigger((trigger: number) => trigger + 1)).current;
}

// Subscribes to value and triggers React Component re-render when
// a value change is notified
export function useSubscribe(subscriptionId: string) {
  const callback = useTriggerCallbackRef();
  // register and unregister trigger in registry
  useLayoutEffect(() => {
    registerCallback(subscriptionId, callback);
    return () => unregisterCallback(subscriptionId, callback);
  }, [subscriptionId, callback]);
}

// Call this after you have updated a value and want subscribers to know
export function notifySubscribers(subscriptionId: string) {
  subscriptionCallbacks[subscriptionId]?.forEach((cb) => cb());
}

// for more explicit use of the API
export const ivity = {
  registerCallback,
  unregisterCallback,
  useSubscribe,
  notifySubscribers,
};

// exported for testing only
export const getSubscriptionCallbacksForTesting = () => {
  return { ...subscriptionCallbacks };
};

// attach an api object to window: window.__react_ivity
(window as any).__react_ivity = {
  getSubscriptionCallbacks: () => {
    return subscriptionCallbacks;
  },
};
