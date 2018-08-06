import React, { Component } from "react";

/**
 * Display the selected station data
 *
 * @class StationDetails
 * @extends {Component}
 */
class StationDetails extends Component {
  
  /**
   * Render station details
   *
   * @returns component
   * @memberof StationDetails
   */
  render() {
    // map throug the selected markers array
    return this.props.selectedMarkers.map(station => {
      //    if app state activeStation is 0 do not display
      if (this.props.activeStation === 0) {
        return null;
      }
      //   if app state activeStation property is not 0
      if (this.props.activeStation !== 0) {
        // and if at least a marker is present in the selectedMarkers array,
        // display the station data
        return station !== 0 ? (
          <div key={station.id} className="station-details">
            <h2 tabIndex="0" className="station-heading">
              {station.name}
            </h2>
            {this.props.imageUrls
              ? this.props.imageUrls.map(url => {
                  if (
                    url !==
                    "https://upload.wikimedia.org/wikipedia/en/4/4a/Commons-logo.svg"
                  ) {
                    return (
                      <img
                        key={url}
                        alt={station.name}
                        className="location-image"
                        src={url}
                      />
                    );
                  } else {
                    return null;
                  }
                })
              : ""}
          </div>
        ) : (
          ""
        );
      } else {
        return null;
      }
    });
  }
}

export default StationDetails;
