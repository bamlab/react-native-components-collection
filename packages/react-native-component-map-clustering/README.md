# Map with clustering

## Installation

```bash
yarn add @bam.tech/react-native-component-map-clustering
```

**Dependencies:**

* [react-native-maps](https://github.com/react-community/react-native-maps) > 0.21

## Usage

### Children

⚠ For each custom marker, add the following props:

* id
* coordinate : { longitude, latitude }

### Ref

##### Ref methods from react-native-maps such as animateToRegion()

##### Extra methods

| Method           | Type                                                               |  Note                                     |
| ---------------- | ------------------------------------------------------------------ | ----------------------------------------- |
| `zoomOnMarker`   | `({latitude, longitude}, { top, bottom, right, left }) => void`    | Zoom on a marker & place it on the screen. `left`, `right`, `top`, `bottom` are in between 0 & 1. They represent out far to the right, left, top, or bottom to place the marker.  |


### Props

#### Props from the [react-native-maps API](https://github.com/react-community/react-native-maps/blob/master/docs/mapview.md)

#### Other props

| Prop             | Type                      | Default                         | Note                                                |
| ---------------- | ------------------------- | ------------------------------- | --------------------------------------------------- |
| `clustering`     | `boolean`                 | False                           | (Optional) When true enables clustering of Markers. |
| `renderCluster`  | `(Cluster) => React.Node` | Renders default clusters on Map | (Optional) Render your custom clusters.             |
| `onPressCluster` | `(Cluster) => void`       | onPress not handled             | (Optional) Handle onPress on default clusters.      |
| `setRef`         | `(React ref) => void      |                                 | (Optional) Get the MapView ref                      |

### Types

```
type Cluster {
  properties : {
    cluster: Boolean
    cluster_id: Number
    point_count: Number
    point_count_abbreviated: String
  }
  geometry: {
    coordinates: [(longitude), (latitude)]
  }
}
```
