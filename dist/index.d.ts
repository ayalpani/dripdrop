declare type $QueryCallbackType = () => void;
export declare function registerCallback(subscriptionId: string, callback: $QueryCallbackType): void;
export declare function unregisterCallback(subscriptionId: string, callback: $QueryCallbackType): void;
export declare function useSubscribe(subscriptionId: string): void;
export declare function notifySubscribers(subscriptionId: string): void;
export declare const ivity: {
    registerCallback: typeof registerCallback;
    unregisterCallback: typeof unregisterCallback;
    useSubscribe: typeof useSubscribe;
    notifySubscribers: typeof notifySubscribers;
};
export declare const getSubscriptionCallbacksForTesting: () => {
    [x: string]: $QueryCallbackType[];
};
export {};
