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

export const ZOOM_MAX = 15;

//TODO: Calculate maximum region zoom deltas
export const ZOOM_MAX_REGION = {
  latitudeDelta: 0.01,
  longitudeDelta: 0.0048,
};

export const zoomLevel = region => {
  const latFraction = (_latRad(region[3]) - _latRad(region[1])) / Math.PI;
  const lngDiff = region[2] - region[0];
  const lngFraction = (lngDiff < 0 ? lngDiff + 360 : lngDiff) / 360;

  const latZoom = _zoom(latFraction);
  const lngZoom = _zoom(lngFraction);

  return Math.min(latZoom, lngZoom, ZOOM_MAX);
};
