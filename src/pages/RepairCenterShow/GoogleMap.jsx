import React from 'react';
import PropTypes from 'prop-types';
import { GoogleApiWrapper } from 'google-maps-react';
import Loader from '../../components/Loader/Loader';
import { setCurrentPos } from '../../store/MapSlice';
import MapContainer from './MapContainer'; // Import the MapContainer component

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
    dispatch: PropTypes.func.isRequired,
    clickedMarkerPosition: PropTypes.object
  };

  static defaultProps = {
    markerTitle: 'Location',
    markerName: 'Location',
    markerAnimation: 2, // Default animation: BOUNCE
  };

  state = {
    clickedMarkerPosition: null, // Position of the marker clicked by the user
    directions: null, // Directions retrieved from Google Maps API
  };

  componentDidMount() {
    const { initialCenter, dispatch } = this.props;
    if (initialCenter) {
      dispatch(setCurrentPos({ lat: initialCenter.lat, lng: initialCenter.lng }));
    } else {
      console.error("Initial center is null.");
    }
  }

  handleMapClick2 = (mapProps, map, clickEvent) => {
    const { latLng } = clickEvent;
    const lat = latLng.lat();
    const lng = latLng.lng();
    const clickedMarkerPosition = { lat, lng };
    this.setState({ clickedMarkerPosition });

    const { google, initialCenter } = this.props;
    const DirectionsService = new google.maps.DirectionsService();

    DirectionsService.route(
      {
        origin: initialCenter,
        destination: clickedMarkerPosition,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({ directions: result });
        } else {
          console.error(`Error fetching directions: ${status}`);
        }
      }
    );
  };

  render() {
    const { google, initialCenter, markerPosition, markerTitle, markerName, markerIcon, markerLabel, markerAnimation } = this.props;
    const { clickedMarkerPosition, directions } = this.state;

    if (!google) {
      return <Loader />; // Display loader while Google API is loading
    }

    if (!initialCenter) {
      return <div>Error: Initial center not provided.</div>; // Display error if initialCenter is null
    }

    return (
      <MapContainer
        google={google}
        zoom={14}
        initialCenter={initialCenter}
        onClick={this.handleMapClick2}
        loadingElement={<div><Loader/></div>} // Show loading indicator
        markerPosition={markerPosition}
        markerTitle={markerTitle}
        markerName={markerName}
        markerIcon={markerIcon}
        markerLabel={markerLabel}
        markerAnimation={markerAnimation}
        clickedMarkerPosition={clickedMarkerPosition}
        directions={directions}
      />
    );
  }
}
// eslint-disable-next-line react-refresh/only-export-components
export default GoogleApiWrapper({
  apiKey: 'AIzaSyB4BFqNlmu7N27rHdSydssJiyHvpvgzSc8' // Replace with your Google Maps API key
})(GoogleMap);

