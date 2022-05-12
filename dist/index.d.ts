export declare type QueryCallbackType = () => void;
export declare function useSubscribe(subscriptionId: string): void;
export declare function notifySubscribers(subscriptionId: string): void;
export declare function registerCallback(
  subscriptionId: string,
  cb: QueryCallbackType
): void;
export declare function unregisterCallback(
  subscriptionId: string,
  cb: QueryCallbackType
): void;
