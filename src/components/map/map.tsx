import 'leaflet/dist/leaflet.css';
import leaflet from 'leaflet';
import {useRef, useEffect} from 'react';
import type {CityLocation, PointOfferLocation} from '../../types/types';
import type {Offer} from '../../mock/offers/offer-mocks';
import useMap from '../../hooks/use-map/use-map';
import {URL_MARKER_CURRENT, URL_MARKER_DEFAULT} from '../../const';


type MapComponentProp = {
  pointsToMap: PointOfferLocation[];
  citiesToMap: CityLocation[];
  selectedPoint?: Offer;
}


function MapComponent ({pointsToMap: points, citiesToMap: citiesToMap, selectedPoint: selectedPoint}: MapComponentProp): JSX.Element {

  const mapRef = useRef(null);
  const map = useMap(mapRef, citiesToMap[0]);

  const defaultCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_DEFAULT,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const currentCustomIcon = leaflet.icon({
    iconUrl: URL_MARKER_CURRENT,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  useEffect(() => {

    if (map) {
      points.forEach((point) => {
        leaflet
          .marker({
            lat: point.lat,
            lng: point.lng,
          }, {
            icon: point.id === selectedPoint?.id ? currentCustomIcon : defaultCustomIcon,
          })
          .addTo(map);
      });
    }

  }, [map, points, selectedPoint]);

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
