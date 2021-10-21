import { getSubscriptionCallbacksForTesting, notifySubscribers, useSubscribe} from './index'
import {act, render} from '@testing-library/react'
import * as React from 'react'

// keeping track of rerenders in each test by calling onRender() 
// in every component render cycle 
let onRender = jest.fn();
beforeEach(() => { onRender = jest.fn()})

function TestComponentToggle() {
    useSubscribe("toggle");
    // ensuring calling notifySubscribers triggered rerender by calling onRender()
    onRender();
    return null
}

function TestComponentSwitch() {
    useSubscribe("switch");
    onRender();
    return null
}

test('testing single subscribed component', async () => {
    render(<TestComponentToggle></TestComponentToggle>);
    expect(onRender).toBeCalledTimes(1);
    
    // trigger rerender
    act(()=> notifySubscribers('toggle'))
    expect(onRender).toBeCalledTimes(2);
})

test('testing several subscribtions of one component type', async () => {
    
    const {unmount} = render(<TestComponentToggle></TestComponentToggle>);
    render(<TestComponentToggle></TestComponentToggle>);

    // both components rendered
    expect(onRender).toBeCalledTimes(2);

    // each subscribing with an entry in subscriptionCallbacks['toggle']
    expect(getSubscriptionCallbacksForTesting()['toggle']).toHaveLength(2)

    // trigger rerender on all components subscribed to 'toggle'
    act(()=> notifySubscribers('toggle'))
    
    //both components should rerender
    expect(onRender).toBeCalledTimes(4);
    
    // unmount one component 
    unmount()

    // one entry removed from subscriptionCallbacks['toggle']
    expect(getSubscriptionCallbacksForTesting()['toggle']).toHaveLength(1)    
})

test('testing different subscribed components, unmounting one', async () => {
    // subscribing to 'toggle'
    const {unmount} = render(<TestComponentToggle></TestComponentToggle>);
    
    // subscribing to 'switch'    
    render(<TestComponentSwitch></TestComponentSwitch>);

    expect(onRender).toBeCalledTimes(2);

    // subscriptionCallbacks['toggle'] and subscriptionCallbacks['switch']
    // both with one entry
    expect(getSubscriptionCallbacksForTesting()['toggle']).toHaveLength(1)
    expect(getSubscriptionCallbacksForTesting()['switch']).toHaveLength(1)

    // only component subscribed to toggle gets rerendered
    act(()=> notifySubscribers('toggle'))
    expect(onRender).toBeCalledTimes(3);
    
    // only component subscribed to toggle gets unmounted
    unmount()

    // no more entries in subscriptionCallbacks['toggle'] after unmount
    expect(getSubscriptionCallbacksForTesting()['toggle']).toHaveLength(0)    
})


test('testing notifying unmounted component', async () => {
    const {unmount} = render(<TestComponentToggle></TestComponentToggle>);

    expect(onRender).toBeCalledTimes(1);
    expect(getSubscriptionCallbacksForTesting()['toggle']).toHaveLength(1)

    act(()=> notifySubscribers('toggle'))
    expect(onRender).toBeCalledTimes(2);
    
    unmount()
    expect(getSubscriptionCallbacksForTesting()['toggle']).toHaveLength(0)   
    
    // calling notifySubscribers('toggle')) should trigger no rerenders as 
    // subscriptionCallbacks['toggle'] is empty after unmounting the component
    act(()=> notifySubscribers('toggle'))
    expect(onRender).toBeCalledTimes(2);
})