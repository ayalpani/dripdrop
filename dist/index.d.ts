declare type $QueryCallbackType = () => void;
declare function registerCallback(subscriptionId: string, callback: $QueryCallbackType): void;
declare function unregisterCallback(subscriptionId: string, callback: $QueryCallbackType): void;
declare function useSubscribe(subscriptionId: string): void;
declare function notifySubscribers(subscriptionId: string): void;
export declare const dripdrop: {
    registerCallback: typeof registerCallback;
    unregisterCallback: typeof unregisterCallback;
    useSubscribe: typeof useSubscribe;
    notifySubscribers: typeof notifySubscribers;
};
export declare const getSubscriptionCallbacksForTesting: () => {
    [x: string]: $QueryCallbackType[];
};
export {};
