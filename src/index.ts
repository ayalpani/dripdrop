import { useEffect, useRef, useState } from "react";

export type QueryCallbackType = () => void;

type subscriptionCallbacksType = {
  [subscriptionId: string]: QueryCallbackType[];
};

const subscriptionCallbacks: subscriptionCallbacksType = {};

function registerCallback(
  subscriptionId: string,
  callback: QueryCallbackType
): void {
  if (!subscriptionCallbacks[subscriptionId]) {
    subscriptionCallbacks[subscriptionId] = [];
  }

  subscriptionCallbacks[subscriptionId].push(callback);
}

function unregisterCallback(
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
  useEffect(() => {
    registerCallback(subscriptionId, callback);
    return () => unregisterCallback(subscriptionId, callback);
  }, [subscriptionId, callback]);
}

export function notifyCallbacks(subscriptionId: string): void {
  //   console.log("notifyCallbacks", {
  //     appState,
  //     subscriptionCallbacks: subscriptionCallbacks[subscriptionId],
  //   });
  subscriptionCallbacks[subscriptionId]?.forEach((cb) => cb());
}
