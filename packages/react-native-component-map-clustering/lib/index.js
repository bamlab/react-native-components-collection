import superCluster from 'supercluster';

export const BoundaryBox = region => [
  region.longitude - region.longitudeDelta / 2,
  region.latitude - region.latitudeDelta / 2,
  region.longitude + region.longitudeDelta / 2,
  region.latitude + region.latitudeDelta / 2,
];

const _latRad = lat => {
  const sin = Math.sin(lat * Math.PI / 180);
  const radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
  return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
};

const _zoom = fraction => {
  return Math.floor(Math.log(1 / fraction) / Math.LN2);
};

const ZOOM_MAX = 15;
const NODE_SIZE = 128;
const RADIUS = 60;

export const createSuperCluster = () =>
  superCluster({
    radius: RADIUS,
    maxZoom: ZOOM_MAX,
    nodeSize: NODE_SIZE,
  });

export const maxZoomDelta = ({ top, left, bottom, right }) => {
  let { latitudeDelta, longitudeDelta } = MAX_ZOOM_DELTA;
  let latitudeOffset = 0,
    longitudeOffset = 0;
  if (isWithin(top, [0, 1])) latitudeOffset -= latitudeDelta / 2 - top * latitudeDelta;
  else if (isWithin(bottom, [0, 1])) latitudeOffset += latitudeDelta / 2 - bottom * latitudeDelta;
  if (isWithin(left, [0, 1])) longitudeOffset -= longitudeDelta / 2 - left * longitudeDelta;
  else if (isWithin(right, [0, 1])) longitudeOffset += longitudeDelta / 2 - right * longitudeDelta;
  return {
    longitudeOffset,
    latitudeOffset,
    longitudeDelta,
    latitudeDelta,
  };
};

const isWithin = (number, range) => number && number <= range[1] && number >= range[0];

export const MAX_ZOOM_DELTA = {
  latitudeDelta: 0.007,
  longitudeDelta: 0.006,
};

export const zoomLevel = region => {
  const latFraction = (_latRad(region[3]) - _latRad(region[1])) / Math.PI;
  const lngDiff = region[2] - region[0];
  const lngFraction = (lngDiff < 0 ? lngDiff + 360 : lngDiff) / 360;

  const latZoom = _zoom(latFraction);
  const lngZoom = _zoom(lngFraction);

  return Math.min(latZoom, lngZoom, ZOOM_MAX);
};
