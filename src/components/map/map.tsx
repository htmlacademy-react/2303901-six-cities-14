import 'leaflet/dist/leaflet.css';
import { Icon, Marker, layerGroup } from 'leaflet';
import { useRef, useEffect } from 'react';
import type { CityLocation, PointOfferLocation, IconToMap } from '../../types/types';
import type { Offer } from '../../mock/offers/offer-mocks';
import useMap from '../../hooks/use-map/use-map';
import {CURRENT_ICON, DEFAULT_DESCRIPTION, DEFAULT_ICON} from '../../const';

type MapComponentProp = {
  pointsToMap: PointOfferLocation[];
  cityToMap: CityLocation;
  selectedPoint?: Offer;
};


const defaultCustomIcon = new Icon(DEFAULT_ICON as IconToMap);
const currentCustomIcon = new Icon(CURRENT_ICON as IconToMap);

function MapComponent({pointsToMap: points, cityToMap: cityToMap, selectedPoint: selectedPoint,}: MapComponentProp): JSX.Element {

  const city = cityToMap instanceof Object ? cityToMap : DEFAULT_DESCRIPTION;

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);

      points.forEach((point) => {
        const marker = new Marker({
          lat: point.lat,
          lng: point.lng,
        });

        marker.setIcon(point.id === selectedPoint?.id ? currentCustomIcon : defaultCustomIcon);
        marker.addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points, selectedPoint]);

  useEffect(() => {
    if (map && cityToMap && cityToMap.lat && cityToMap.lng) {
      map.setView([cityToMap.lat, cityToMap.lng], cityToMap.zoom);
    }
  }, [map, cityToMap]);

  return (
    <div className="cities__right-section">
      <section
        className="cities__map map"
        ref={mapRef}
        style={{
          height: '100%',
          minHeight: '500px',
          width: '100%',
          maxWidth: '1144px',
          margin: '0 auto',
        }}
      />
    </div>
  );
}

export default MapComponent;
