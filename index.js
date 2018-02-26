import React from "react";
import {
  View,
  Animated,
  ScrollView,
  Dimensions,
  BackHandler
} from "react-native";

const window = Dimensions.get("window");

export default class Push extends React.Component {
  constructor(props) {
    super(props);
    this.animatedValue = new Animated.Value(0);
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", () => {
      if (this.state.show && this.scrollView) {
        this.scrollView._component.scrollTo({ x: 0 });
        return true;
      }
      return false;
    });
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
          {React.cloneElement(this.props.children, {
            pushState: this.state.show,
            push: params => {
              this.propsToPass = params.passProps;
              this.component = params.component;
              this.setState({ show: true });
            }
          })}
        </Animated.View>
        {this.state.show && (
          <Animated.ScrollView
            keyboardDismissMode={"on-drag"}
            keyboardShouldPersistTaps
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
              this.scrollView._component.scrollTo({ x: window.width })
            }
            scrollEventThrottle={1}
            pagingEnabled={true}
            ref={scrollView => {
              this.scrollView = scrollView;
            }}
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
              <Push color={this.props.color}>
                {React.createElement(this.component, {
                  ...this.propsToPass,
                  pop: () => this.scrollView._component.scrollTo({ x: 0 })
                })}
              </Push>
            </View>
          </Animated.ScrollView>
        )}
      </View>
    );
  }
}

