import React from "react";
// import {compose, mapProps} from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import markerIcon from "./map-marker.png";
import markerIconBlue from "./map-marker-blue.png";
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";

/**
 * The map component display the map, using react-google-maps,
 * withGoogleMap and withScriptsjs are used as wrapper
 *
 *
 */
const Map = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      className="map"
      defaultZoom={12}
      defaultCenter={{ lat: 44.414165, lng: 8.942184 }}
    >
      <MarkerClusterer defaultTitle="Cluster">
        {props.allMarkers !== 0
          ? props.allMarkers.map(pin => (
              <Marker
                id={pin.id}
                title={pin.name}
                icon={props.activeStation ? markerIconBlue : markerIcon}
                onClick={e => props.clickStation(e, pin.id)}
                key={pin.id}
                position={{ lat: Number(pin.lat), lng: Number(pin.lng) }}
              >
                {props.activeStation ? (
                  <InfoWindow
                    tabIndex="0"
                    onCloseClick={e => {
                      props.resetSelection();
                    }}
                  >
                    <span>
                      <h2 id="result-heading" className="tooltip-heading">
                        {pin.name}
                      </h2>

                      <p>
                        {" "}
                        Open{" "}
                        <a
                          target="_blank"
                          href={"https://en.wikipedia.org/?curid=" + pin.id}
                        >
                          wikipedia page
                        </a>
                      </p>
                      <button
                        id={"button" + pin.id}
                        onClick={e => {
                          props.resetSelection(e);
                        }}
                        className="close-button"
                      >
                        {" "}
                        Close{" "}
                      </button>
                    </span>
                  </InfoWindow>
                ) : (
                  ""
                )}
              </Marker>
            ))
          : ""}
      </MarkerClusterer>
    </GoogleMap>
  ))
);

export default Map;
