import 'leaflet/dist/leaflet.css';
import { Icon, Marker, layerGroup } from 'leaflet';
import { useRef, useEffect } from 'react';
import type { CityLocation, PointOfferLocation, IconToMap} from '../../types/types';
import type { Offer } from '../../mock/offers/offer-mocks';
import useMap from '../../hooks/use-map/use-map';
import {CURRENT_ICON, DEFAULT_ICON, DefaultCityToMap} from '../../const';

type MapComponentProp = {
  pointsToMap: PointOfferLocation[];
  cityToMap: CityLocation;
  selectedPoint?: Offer;
  selectedFilterCity?: string;
};


const defaultCustomIcon = new Icon(DEFAULT_ICON as IconToMap);
const currentCustomIcon = new Icon(CURRENT_ICON as IconToMap);

function MapComponent({pointsToMap: points, cityToMap: cityToMap, selectedPoint: selectedPoint, selectedFilterCity: selectedFilterCity}: MapComponentProp): JSX.Element {

  const city = cityToMap instanceof Object ? cityToMap : DefaultCityToMap[selectedFilterCity as keyof typeof DefaultCityToMap];

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
    if (map && city && city.lat && city.lng) {
      map.setView([city.lat, city.lng], city.zoom);
    }
  }, [map, city]);

  return (

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

  );
}

export default MapComponent;
