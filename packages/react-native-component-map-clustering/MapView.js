import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';
import RNMapView from 'react-native-maps';
import { throttle } from 'lodash';
import { zoomLevel, BoundaryBox, createSuperCluster, maxZoomDelta } from './lib';
import Cluster from './Cluster';

class MapView extends PureComponent {
  map;
  superCluster;
  hasSuperClusterLoaded = false;

  state = {
    clusters: [],
    others: [],
    region: null,
  };

  componentDidUpdate(prevProps) {
    if (this.props.children !== prevProps.children && this.props.clustering) {
      this._createClustersThrottle();
    }
  }

  _setRef = ref => {
    this.map = ref;
    this.map.zoomOnMarker = this.zoomOnMarker;
    this.props.setRef && this.props.setRef(this.map);
  };

  zoomOnMarker = ({ latitude, longitude }, { top, left, bottom, right }) => {
    const { longitudeDelta, latitudeDelta, latitudeOffset, longitudeOffset } = maxZoomDelta({
      top,
      left,
      bottom,
      right,
    });
    this.map &&
      this.map.animateToRegion({
        latitude: latitude + latitudeOffset,
        longitude: longitude + longitudeOffset,
        longitudeDelta,
        latitudeDelta,
      });
  };

  _createClusters = () => {
    this.hasSuperClusterLoaded = false;
    if (!this.superCluster) {
      this.superCluster = createSuperCluster();
    }
    const GeoJSONs = [];
    const others = [];
    React.Children.forEach(this.props.children, child => {
      if (child.props && child.props.coordinate) {
        GeoJSONs.push({
          properties: {
            id: child.props.id,
          },
          Marker: child,
          geometry: {
            type: 'Point',
            coordinates: [child.props.coordinate.longitude, child.props.coordinate.latitude],
          },
        });
      } else {
        others.push(child);
      }
    });
    this.setState(
      {
        others,
      },
      () => {
        this.superCluster.load(GeoJSONs);
        this.hasSuperClusterLoaded = true;
        this._calculateClusters();
      }
    );
  };

  _createClustersThrottle = throttle(this._createClusters, 500);

  _calculateClusters = () => {
    if (this.hasSuperClusterLoaded && this.superCluster && this.state.region) {
      const bbox = BoundaryBox(this.state.region);
      const zoom = zoomLevel(bbox);
      const clusters = this.superCluster.getClusters(bbox, zoom);
      this.setState({ clusters: clusters.map(this._renderMarker) });
    }
  };

  _calculateClustersThrottle = throttle(this._calculateClusters, 500);

  _renderCluster = cluster => {
    const clusterId = cluster.properties.cluster_id;
    return (
      <Cluster
        key={clusterId}
        id={clusterId}
        cluster={cluster}
        onPress={this.props.onClusterPress}
      />
    );
  };

  _renderMarker = cluster => {
    if (cluster.properties.cluster) {
      if (this.props.renderCluster) return this.props.renderCluster(cluster);
      return this._renderCluster(cluster);
    }
    return cluster.Marker;
  };

  _onRegionChangeComplete = region => {
    if (this.props.clustering) this._calculateClustersOnRegion(region);
    this.props.onRegionChangeComplete && this.props.onRegionChangeComplete(region);
  };

  _calculateClustersOnRegion = throttle(
    region =>
      this.setState(
        {
          region,
        },
        this._calculateClustersThrottle
      ),
    750
  );

  render() {
    const { style, children, clustering, ...rest } = this.props;
    return (
      <RNMapView
        {...rest}
        ref={this._setRef}
        style={[styles.map, style]}
        onRegionChangeComplete={this._onRegionChangeComplete}>
        {clustering ? this.state.clusters : children}
        {this.state.others}
      </RNMapView>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapView;
