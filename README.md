# perf-tracking-complex-components

A simple, powerful method to track the performance of complex react-native components or utils/libraries

![](./assets/simulator-screenshot.png)

## Prerequisites

Install node, react-native, react-native-cli

## Dependencies

See also package.json.
```
"react": "16.8.6",
"react-native": "0.60.4",
"react-native-svg": "^9.5.3"
```

## Build

Clone this repo.
```
yarn install
yarn add react-native-svg
cd ios; pod install
react-native run-ios or react-native run-android.
```

## Use (see App.js)

```
      <RadialProgressBar size={diameter} width={stroke} fill={percentage}
        tintColor={'indigo'} backgroundColor={'#eee'}>
        {
          (percent) => (
            <View style={styles.circleStyle}>
              <Text style={styles.textStyle}>{`${percent}%`}</Text>
            </View>
          )
        }
      </RadialProgressBar>
```

## props

| prop  | Description |
| ------------- | ------------- |
| size  | outer diameter of the circle  |
| width  | width of the stroke  |
| fill  | percentage of the circle to be displayed in "tintColor" (see below)  |
| tintColor  | color of the active circle  |
| backgroundColor  | color of passive background circle  |

The circles are drawn on a transparent surface.

## Authors

* **Miguel Albrecht** - [zapalote](https://zapalote.com/)

## Acknowledgments

* Thanks to [Greg Douglas](https://codepen.io/xgad/) who gave inspiration and shared his [css/SVG](https://codepen.io/xgad/post/svg-radial-progress-meters) implementation.
