import React from "react";
import { View, Animated, ScrollView, Dimensions } from "react-native";

const window = Dimensions.get("window");

export default class Push extends React.Component {
  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(0);
  }

  static defaultProps = {
    color: "#efefef"
  };
  state = {
    show: false
  };

  render() {
    const opacity = this.animatedValue.interpolate({
      inputRange: [-window.width, 0, window.width],
      outputRange: [0.1, 1, 0.1],
      extrapolate: "clamp"
    });
    return (
      <View
        style={{
          backgroundColor: this.props.color,
          width: window.width,
          height: window.height
        }}
      >
        <Animated.View
          style={{
            backgroundColor: "white",
            width: window.width,
            height: window.height,
            position: "absolute",
            top: 0,
            left: 0,
            opacity,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          {React.cloneElement(this.props.children[0], {
            push: () => this.setState({ show: true })
          })}
        </Animated.View>
        {this.state.show && (
          <Animated.ScrollView
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: this.animatedValue } } }],
              {
                useNativeDriver: true,
                listener: event => {
                  if (event.nativeEvent.contentOffset.x === 0) {
                    this.setState({ show: false });
                  }
                }
              }
            )}
            onLayout={() =>
              this.refs.scrollView._component.scrollTo({ x: window.width })}
            scrollEventThrottle={1}
            pagingEnabled={true}
            ref="scrollView"
            horizontal={true}
            overScrollMode={"never"}
            bounces={false}
            decelerationRate={"fast"}
            style={{
              width: window.width,
              height: window.height,
              position: "absolute",
              top: 0,
              left: 0
            }}
            contentContainerStyle={{
              paddingLeft: window.width
            }}
          >
            <View
              style={{
                width: window.width,
                height: window.height,
                backgroundColor: "white"
              }}
            >
              {React.cloneElement(this.props.children[1], {
                pop: () => this.refs.scrollView._component.scrollTo({ x: 0 })
              })}
            </View>
          </Animated.ScrollView>
        )}
      </View>
    );
  }
}