import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { GoogleApiWrapper } from 'google-maps-react';
import Loader from '../../components/Loader/Loader';
import { setCurrentPos } from '../../store/MapSlice';
import MapContainer from './MapContainer';

const GoogleMap = ({
  google,
  initialCenter,
  markerPosition,
  markerTitle,
  markerName,
  markerIcon,
  markerLabel,
  markerAnimation,
  distination=initialCenter,
  dispatch
}) => {
  const [clickedMarkerPosition, setClickedMarkerPosition] = useState(null);
  const [directions, setDirections] = useState(null);

  useEffect(() => {
    if (initialCenter) {
      dispatch(setCurrentPos({ lat: initialCenter.lat, lng: initialCenter.lng }));
    } else {
      console.error("Initial center is null.");
    }
  }, [initialCenter, dispatch]);

  useEffect(()=>{
    console.log("--------------------------------------------------");
    handleMapClickparam(distination)
  },[distination])
  const handleMapClickparam = (distination) => {
    console.log("jdkfghdfjkghadsfjkghaskjfgh");
    // const { latLng } = clickEvent;
    console.log(distination);
    const lat = distination.lat;
    const lng = distination.lng;
    const clickedMarkerPosition = { lat, lng };
    setClickedMarkerPosition(clickedMarkerPosition);

    const DirectionsService = new google.maps.DirectionsService();

    DirectionsService.route(
      {
        origin: initialCenter,
        destination: clickedMarkerPosition,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error(`Error fetching directions: ${status}`);
        }
      }
    );
  };

  const handleMapClick = (mapProps, map, clickEvent) => {
    console.log("jdkfghdfjkghadsfjkghaskjfgh");
    const { latLng } = clickEvent;
    const lat = latLng.lat();
    const lng = latLng.lng();
    const clickedMarkerPosition = { lat, lng };
    setClickedMarkerPosition(clickedMarkerPosition);

    const DirectionsService = new google.maps.DirectionsService();

    DirectionsService.route(
      {
        origin: initialCenter,
        destination: clickedMarkerPosition,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error(`Error fetching directions: ${status}`);
        }
      }
    );
  };

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
      onClick={handleMapClick}
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
};

GoogleMap.propTypes = {
  google: PropTypes.object.isRequired,
  initialCenter: PropTypes.object.isRequired,
  markerPosition: PropTypes.object.isRequired,
  markerTitle: PropTypes.string,
  markerName: PropTypes.string,
  markerIcon: PropTypes.string,
  markerLabel: PropTypes.string,
  markerAnimation: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
  distination: PropTypes.object
};

GoogleMap.defaultProps = {
  markerTitle: 'Location',
  markerName: 'Location',
  markerAnimation: 2, // Default animation: BOUNCE
};

export default GoogleApiWrapper({
  apiKey: import.meta.env.VITE_API_KEY 
})(GoogleMap);
