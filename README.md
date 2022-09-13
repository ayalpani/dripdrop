[![Node.js CI](https://github.com/ayalpani/dripdrop/actions/workflows/node.js.yml/badge.svg)](https://github.com/ayalpani/dripdrop/actions/workflows/node.js.yml)

# drip drop

> Manage State and AAAAAHHHHH... relax.

![Manage State and Relax](docs/relax.png "Manage State and Relax")

## Install

```
$ npm install dripdrop
```

## Why Yet Another State Management Library for React?

React Context, Redux, Zustand, MobX, Recoil, Valtio ... I tried them all in projects big and small. None of them sparked joy, so I built my own tiny but powerful state management solution.

## dripdrop...

- ... doesn't need React Context
- ... allows for super **granular updates**, only re-render if it's really needed
- ... consists of &lt; 60 lines of dependency-free Vanilla TS code. 👉 [jump right in](./src/index.ts)
- ... implements a simple **observer pattern** and is easy to comprehend

## A simple example:

https://codesandbox.io/s/dripdrop-counter-example-1gshs3

## Debugging

To get a list of all subscriptions in your app, open the developer console and paste this:

> \_\_dripdrop.getSubscriptionCallbacks()

## Maintainers

- [Arash Yalpani](https://github.com/ayalpani)
