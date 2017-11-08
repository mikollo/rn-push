# React Native simplest component ever do achieve push from right transition

It's just an experiment with scrollview capabilities

## Why would You use this library?

1. Super simple codebase
2. Gesture handling and animation of the fading view are handled on the main thread
3. Looks natively on ios and android

## Caveats

You might still consider using `NavigatorIOS` because the animation is after all a little bit different - sometimes I think it's worse than in this component and sometimes I think it's better. But the major downside of native navigator is the fact that you can swipe only from the edge and obviously you can't share code with android.

## Installation

`yarn add rn-push`

## Usage

This component takes two children components and allows you to navigate between them 

```js
import Push from "rn-push";

function App(props) {
    // if you don't pass color prop, then the default is #ededed
  return (
    <Push color="#ededed">
      <Screen />
      <Screen />
    </Push>
  );
}

function Screen(props) {
  return (
    <View>
      <Button title="Next" onPress={() => props.push()} />
      <Button title="Previous" onPress={() => props.pop()} />
    </View>
  );
}
```

Example that shows how You can pass props to achieve infinite navigation

```js
import Push from "rn-push";

function App(props) {
  return (
    <Push>
      <ViewOne pop={() => props.pop()} />
      <App />
    </Push>
  );
}

function ViewOne(props) {
  return (
    <View>
      <Button title="Next" onPress={() => props.push()} />
      <Button title="Previous" onPress={() => props.pop()} />
    </View>
  );
}
```