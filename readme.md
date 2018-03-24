# React Native simplest push from right transition

No need to link any native code.

<img src="https://thumbs.gfycat.com/DependentForsakenAustraliancurlew-size_restricted.gif" />

## Why would You use this library?

1. Super simple codebase
2. Gesture handling and animation of the fading view are handled on the main thread
3. Looks nice on ios and android

## Problem

There are three approaches to handle navigation in React Native app:

1. You can use native components like NavigatorIOS, Wix Navigation etc. - it's hard to customise them though and You have to install native dependencies.
2. You can write navigation in JS that tries to mimick native navigation - You will inevitebly end up with uncanny valley UX.
3. You can invent Your custom JS navigation - but it is usually hard to come up with better transitions than default ones on Android and iOS.

This library represents third approach. But it is better than others becuase it uses scrollview as a gesture handler under the hood, which means You don't have to run animations on JS thread.

## Installation

`yarn add rn-push`

`npm install rn-push`

## Usage

This component takes a single children and passes a `push` prop to it. Component that You will push to will receive `pop` prop. You can push deeper from the screen that is already pushed.

```js
import Push from "rn-push";

function App(props) {
  // you can pass color prop (default: #efefef)
  return (
    <Push color="#efefef">
      <Screen />
    </Push>
  );
}

function Screen(props) {
  return (
    <View>
      <Button
        title="Next"
        onPress={() =>
          props.push({
            component: Screen2,
            passProps: {
              title: "Previous"
            }
          })
        }
      />
    </View>
  );
}

function Screen2(props) {
  return (
    <View>
      <Button title={props.title} onPress={() => props.pop()} />
    </View>
  );
}
```

Component that you push from receieves `pushState` prop. You can do something like this:

```js
class Screen extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.pushState !== prevProps.pushState) {
      // do something when user goes back or forth
      // ie. fetch data to update Your view or something like that
    }
  }

  render() {
    return (
      <View>
        <Button
          title="Next"
          onPress={() =>
            props.push({
              component: Screen2,
              passProps: {
                title: "Previous"
              }
            })
          }
        />
      </View>
    );
  }
}
```
