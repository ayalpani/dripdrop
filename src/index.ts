import { useLayoutEffect, useRef, useState } from "react";

export type QueryCallbackType = () => void;

type subscriptionCallbacksType = {
  [subscriptionId: string]: QueryCallbackType[];
};

const subscriptionCallbacks: subscriptionCallbacksType = {};

// exported for testing only
export const getSubscriptionCallbacksForTesting = () => {
  return { ...subscriptionCallbacks };
};

export function registerCallback(
  subscriptionId: string,
  callback: QueryCallbackType
): void {
  if (!subscriptionCallbacks[subscriptionId]) {
    subscriptionCallbacks[subscriptionId] = [];
  }

  subscriptionCallbacks[subscriptionId].push(callback);
}

export function unregisterCallback(
  subscriptionId: string,
  callback: QueryCallbackType
): void {
  subscriptionCallbacks[subscriptionId] = subscriptionCallbacks[
    subscriptionId
  ]?.filter((cb) => cb !== callback);
}

function useTriggerCallbackRef() {
  // define trigger function to rerender component that uses the useSubscribe* hooks
  const [, setTrigger] = useState(0);
  return useRef(() => setTrigger((trigger: number) => trigger + 1)).current;
}

export function useSubscribe(subscriptionId: string) {
  const callback = useTriggerCallbackRef();
  // register and unregister trigger in registry
  useLayoutEffect(() => {
    registerCallback(subscriptionId, callback);
    return () => unregisterCallback(subscriptionId, callback);
  }, [subscriptionId, callback]);
}

export function notifySubscribers(subscriptionId: string) {
  subscriptionCallbacks[subscriptionId]?.forEach((cb) => cb());
}
