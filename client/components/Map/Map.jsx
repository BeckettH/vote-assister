import React, { useRef, useState} from 'react';
import {LoadScript, GoogleMap, Marker, InfoWindow} from '@react-google-maps/api';

import mapStyle from "./MapStyle";


const options = {
  styles: mapStyle
};

const mapContainerStyle = {
  height: `100vh`,
  width: `100%`,
};
const InfoBoxContent =(props)=>(
<div>
    <h3>{props.title}</h3>
    <div>{props.id}</div>
    <div>{props.desc}</div>
</div>
)

const Map = () => {

  const initPosition={
    lat: 36.2111059,
    lng: -113.7191045,
  };

  //temp test coordinates
  const markersDefault=[
    {
      id: 1,
      position:{lat:37.3609851,lng:-122.0029431}, 
      title: 'Hello World1!',
      desc:'text 01'
    },
    {
      id: 2,
      position:{lat:37.368080, lng:-122.267645}, 
      title: 'Hello World2!',
      desc:'text 02'
    },
    {
      id: 3,
      position:{lat:40.6976684,lng:-74.2605591},
      title: 'Hello World3!',
      desc:'text 03'
    }
  ];

  const [markers, setMarkerMap] = useState([markersDefault]);
  const [infoOpen, setInfoOpen] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const mapRef = useRef(null);
  const [zoom, setZoom] = useState(4);
  const handleMapLoaded = (map) => {
    mapRef.current = map;
  };


  const markerLoadHandler = (marker, place) => {
    return setMarkerMap(prevState => {
      return { ...prevState, [place.id]: marker };
    });
  };

  const markerClickHandler = (event, place) => {
    // Remember which place was clicked
    setSelectedPlace(place);

    // Required so clicking a 2nd marker works as expected
    if (infoOpen) {
      setInfoOpen(false);
    }

    setInfoOpen(true);

    // If you want to zoom in a little on marker click
    if (zoom < 13) {
      setZoom(4);
    }
  };

  return (
    <div>
      <LoadScript
         id="script-loader"
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        language='en'
        region='us'
      >
        <GoogleMap
          onLoad={handleMapLoaded}
          mapContainerStyle={mapContainerStyle}
          center={initPosition}
          options={options}
          zoom={4}
          >
          
          {
            markers[0].map(place =>(
            <Marker
              key={place.id}
              position={place.position}
              onLoad={marker => markerLoadHandler(marker, place)}
              onClick={marker => markerClickHandler(marker, place)}
              icon={{
                path:
                  "M4 24h-2v-24h2v24zm18-21.387s-1.621 1.43-3.754 1.43c-3.36 0-3.436-2.895-7.337-2.895-2.108 0-4.075.98-4.909 1.694v12.085c1.184-.819 2.979-1.681 4.923-1.681 3.684 0 4.201 2.754 7.484 2.754 2.122 0 3.593-1.359 3.593-1.359v-12.028z",
                fillColor: "#033362",
                fillOpacity: 1.0,
                strokeWeight: 0,
                scale: 1.25
              }}
              
            />
          ))
          
          }

          {infoOpen && selectedPlace && (
            <InfoWindow
              anchor={markers[selectedPlace.id]}
              onCloseClick={() => setInfoOpen(false)}
            >

             
         <InfoBoxContent id={selectedPlace.id} title={selectedPlace.title} desc={selectedPlace.desc} />
               
              
            </InfoWindow>
          )}
          </GoogleMap>
      </LoadScript>
    </div>
  );
};



const Info = (props) =>{
console.log('test');
  const infoPanelStyle=``
  return ( 
  <div>
    <h3>{props.title}</h3>
    <div>{props.id}</div>
    <div>{props.desc}</div>
  </div>
  )
}
export default Map;
