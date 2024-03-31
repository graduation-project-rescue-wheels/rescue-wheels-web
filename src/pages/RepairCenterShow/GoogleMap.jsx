import React from 'react';
import PropTypes from 'prop-types';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';

class GoogleMap extends React.Component {
  static propTypes = {
    google: PropTypes.object.isRequired, // Google API object
    initialCenter: PropTypes.object.isRequired, // Initial center of the map { lat, lng }
    markerPosition: PropTypes.object.isRequired, // Marker position { lat, lng }
    markerTitle: PropTypes.string, // Marker title
    markerName: PropTypes.string, // Marker name
    markerIcon: PropTypes.string, // URL of the custom marker icon
    markerLabel: PropTypes.string, // Label for the marker
    markerAnimation: PropTypes.number, // Marker animation (see Google Maps API for available animations)
  };

  static defaultProps = {
    markerTitle: 'Location',
    markerName: 'Location',
    markerAnimation: 1, // Default animation: BOUNCE
  };

  render() {
    const { google, initialCenter, markerPosition, markerTitle, markerName, markerIcon, markerLabel, markerAnimation } = this.props;

    const mapStyles = { 
      width: '100%',
      height: '400px'
    };

    return (
      <Map
        google={google}
        zoom={14}
        style={mapStyles}
        initialCenter={initialCenter}
        loadingElement={<div>Loading...</div>} // Show loading indicator
      >
        <Marker
          title={markerTitle}
          name={markerName}
          position={markerPosition}
          icon={markerIcon}
          label={markerLabel}
          animation={markerAnimation}
        />
      </Map>
    );
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export default GoogleApiWrapper({
  apiKey: 'AIzaSyB4BFqNlmu7N27rHdSydssJiyHvpvgzSc8' // Replace with your Google Maps API key
})(GoogleMap);

