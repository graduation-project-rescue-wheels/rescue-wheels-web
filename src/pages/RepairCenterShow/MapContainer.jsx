import React from 'react';
import { Map, Marker, Polyline } from 'google-maps-react';

class MapContainer extends React.Component {
  render() {
    const { google, zoom, initialCenter, onClick, loadingElement, markerPosition, markerTitle, markerName, markerIcon, markerLabel, markerAnimation, clickedMarkerPosition, directions } = this.props;

    return (
      <Map
        google={google}
        zoom={zoom}
        initialCenter={initialCenter}
        onClick={onClick}
        loadingElement={loadingElement}
      >
        {/* Initial marker */}
        <Marker
          title={markerTitle}
          name={markerName}
          position={markerPosition}
          icon={markerIcon}
          label={markerLabel}
          animation={markerAnimation}
        />
        {/* Marker for the clicked position */}
        {clickedMarkerPosition && (
          <Marker
            title={markerTitle}
            name={markerName}
            position={clickedMarkerPosition}
            icon={markerLabel}
            label={markerLabel}
            animation={markerAnimation}
          />
        )}
        {/* Directions */}
        {directions && (
          <Polyline
            path={directions.routes[0].overview_path.map((point) => ({
              lat: point.lat(),
              lng: point.lng(),
            }))}
            options={{
              strokeColor: "#0000FF",
              strokeOpacity: 0.8,
              strokeWeight: 4,
            }}
          />
        )}
      </Map>
    );
  }
}

export default MapContainer;
