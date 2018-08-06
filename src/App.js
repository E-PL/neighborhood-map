import React, { Component } from "react";
import "./App.css";
import Header from "./Header.js";
import Nav from "./Nav.js";
import Map from "./Map.js";
import StationDetails from "./StationDetails.js";
import Footer from "./Footer.js";

/**
 * Main component
 *
 * @class App
 * @extends {Component}
 */
class App extends Component {
  
  /**
   * Local state holds all markers data and page state
   *
   * @memberof App
   */
  state = {
    // the list of location fetched from the api
    allStations: [],
    // the filtered locations
    selectedMarkers: [],
    // the unfiltered locations
    savedMarkers: [],
    // the selected location
    activeStation: 0,
    // the state for hiding the filter nav
    hamburgerClicked: false,
    // holds the fetched location detail images
    locationImages: [],
    // holds the images urls
    imageUrls: []
  };

  /**
   * Fetch a list of location in a 10km range from a fixed center from wikipedia API
   * save results on local state
   *
   * @memberof App
   */
  getData = () => {
    // create the request
    const url =
      "https://en.wikipedia.org/w/api.php?action=query&list=geosearch&gsradius=10000&gscoord=44.414165|8.942184&gslimit=500&format=json&origin=*";
    const myHeaders = {
      Accept: "application/json"
   
    };
    const myRequest = {
      method: "GET",
      headers: myHeaders
    };
    // fetch it
    fetch(url, myRequest)
      // extract json
      .then(response => {
        if (response) {
          return response.json();
        }
      })
      // save data on state
      .then(data => {
        const markers = data.query.geosearch.map(pin => {
          let mark = pin;
          mark.lat = pin.lat;
          mark.lng = pin.lon;
          mark.id = pin.pageid;
          mark.name = pin.title;
          return mark;
        });
        this.setState({
          allStations: data.query.geosearch,
          selectedMarkers: markers,
          savedMarkers: markers
        });
        return data;
      })
      // handle network errors
      .catch(error => {
        const confirm = window.confirm("API Error [" + error + "] Retry?");
        if (confirm === true) {
          // retry
          this.getData();
        }
      });
  };
  
  /**
   * Get all images present on the given wikipedia page,
   * call this.getUrlsFromImageTitle passing it the page id and the found images
   *
   * @param {Number} id the wikipedia pageid
   * @memberof App
   */

  /**
   * When a marker is clicked, handle focus and call selectStation
   *
   * @param {Event} event the event object
   * @param {Number} id the station id
   * @memberof App
   */
  clickStation = (event, id) => {
    // check if the event object have a target property
    if (event && event.target) {
      // take focus away from the originating element
      const heading = document.getElementById(event.target.id);
      heading.blur();
      // focus on the map
      const menu = document.getElementById("map");
      menu.focus();
    } else {
      // if there's no target property, just focus on the map
      const focusMap = document.getElementById("map");
      focusMap.focus();
    }
    
    // select marker
    this.getLocationImages(id);
  };

  /**
   * Find the images used on a location wikipedia page, 
   * then call getUrlsFromImageTitle to find the images url
   *
   * @param {*} id the location pageid
   */
  getLocationImages = id => {
    // create the request
    // get location images
    const url =
      "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=images&pageids=" +
      id +
      "&origin=*";
    const myHeaders = {
      Accept: "application/json"
    };
    const myRequest = {
      method: "GET",
      headers: myHeaders
    };
    // fetch it
    fetch(url, myRequest)
      // extract json
      .then(response => {
        if (response) {
          return response.json();
        }
      })
      // call getUrlsFromImageTitle and pass the found images and the pageid
      .then(data => {
        const pageid = Object.keys(data.query.pages);
        return this.getUrlsFromImageTitle(data.query.pages[pageid].images, id);
      })
      // handle network errors
      .catch(error => {
        const confirm = window.confirm("API Error [" + error + "] Retry?");
        if (confirm === true) {
          // retry
          this.getLocationImages(id);
        }
      });
  };

  /**
   * Map an array of wikipedia image names to an array of urls
   * save the result on local state
   *
   * @param {Array} images
   * @param {Number} id
   * @memberof App
   */
  getUrlsFromImageTitle = (images, id) => {
    // results array
    let imageUrls = [];
    images.map(image => {
      // create the request
      // get  image url by name
      const urlRequest =
        "https://en.wikipedia.org/w/api.php?action=query&titles=" +
        image.title +
        "&prop=imageinfo&iiprop=url&format=json&origin=*";
      const myHeaders = {
        Accept: "application/json"
      };
      const myRequest = {
        method: "GET",
        headers: myHeaders
      };
      // fetch it
      fetch(urlRequest, myRequest)
        // extract json
        .then(response => {
          if (response) {
            return response.json();
          }
        })
        // extract url and append it to results array
        .then(data => {
          const pageid = Object.keys(data.query.pages);
          const url = data.query.pages[pageid[0]].imageinfo[0].url;
          imageUrls.push(url);
          // return urls
          return imageUrls;
        })
        // update local state with results and select the location
        .then(urls => {
          // find the marker to select
          let updatedStationsList = this.state.selectedMarkers.filter(
            station => {
              if (station.id === id) {
                return true;
              } else {
                return false;
              }
            }
          );

          this.setState(oldState => {
            const newState = oldState;
            // save urls
            newState.imageUrls = urls;
            // select location
            newState.selectedMarkers = updatedStationsList;
            newState.activeStation = updatedStationsList;
            // close the search nav
            newState.hamburgerClicked = false;
            return newState;
          });
        })
        // handle network errors
        .catch(error => {
          const confirm = window.confirm("API Error [" + error + "] Retry?");
          if (confirm === true) {
            // retry
            this.getUrlsFromImageTitle(images, id);
          }
        });
    return null;
      });
  };

  /**
   * Close the marker infowindow and the location details section
   *
   * @param {Event} event the event that initialized the closing
   */
  resetSelection = event => {
    // if the event source is known
    if (event && event.target) {
      const heading = document.getElementById(event.target.id);
      // remove focus from the source event
      heading.blur();
      const menu = document.getElementById("open-search");
      // focus on the navigation
      menu.focus();
    }
    // if the event source is unknown
    else {
      // focus on the navigation
      const menu = document.getElementById("open-search");
      menu.focus();
    }
    // rebuild the markers list
    const markers = this.state.allStations.map(pin => {
      let mark = pin;
      mark.lat = pin.lat;
      mark.lng = pin.lon;
      mark.id = pin.pageid;
      mark.name = pin.title;
      return mark;
    });
    // save the restored list to local state and set activeStation to 0
    this.setState(oldState => {
      const newState = oldState;
      newState.selectedMarkers = markers;
      newState.activeStation = 0;
      return newState;
    });
  };

  /**
   * Toggle the navigation
   *
   * @param {Event} e the event initiating toggling
   */
  hamburgerClicked = e => {
    e.preventDefault();
    //  if nav was hidden, set state to true to show it and reset station selection
    if (this.state.hamburgerClicked !== true) {
      this.setState(oldState => {
        const newState = oldState;
        newState.hamburgerClicked = true;
        newState.activeStation = 0;
        newState.selectedMarkers = oldState.savedMarkers;
        return newState;
      });
    }
    // if the navigation was shown, set state to false to hide it
    if (this.state.hamburgerClicked === true) {
      this.setState(oldState => {
        const newState = oldState;
        newState.hamburgerClicked = false;
        return newState;
      });
    }
  };

  /**
   * Filter the selected locations by name
   *
   * @param {String} e the query
   */
  search = e => {
    // if a marker is selected, reset selection
    if (this.state.activeStation) {
      this.resetSelection();
    }

    // if the query is valid
    if (e) {
      const query = e
        // convert the query to lower case
        .toLowerCase();
      // filter markers by lower case name
      let foundMarkers = this.state.savedMarkers.filter(marker => {
        const findIn = marker.name.toLowerCase();
        return findIn.search(query) !== -1;
      });
      // save found markers to local state
      this.setState(oldState => {
        const newState = oldState;
        newState.selectedMarkers = foundMarkers;
        return newState;
      });
    }
    // if the query is empty, restore the unfiltered list
    if (!e || e === "") {
      this.setState(oldState => {
        const newState = oldState;
        newState.selectedMarkers = this.state.savedMarkers;
        return newState;
      });
    }
  };

  /**
   * When the component is inserted into the DOM, load locations data from API
   *
   * @memberof App
   */
  componentDidMount = () => {
    this.getData();
  };

  /**
   * Render the app component
   *
   * @returns component
   * @memberof App
   */
  render() {
    return (
      <div className="container">
        <Header hamburgerClicked={this.hamburgerClicked} />
        <div className="nav-map-wrapper">
          <Nav
            role="navigation"
            hamburgerClicked={this.state.hamburgerClicked}
            closeClicked={this.closeClicked}
            selectedMarkers={this.state.selectedMarkers}
            onSearch={this.search}
            clickStation={this.clickStation}
          />
          <div id="map" role="application" tabIndex="0">
            <Map
              loadingElement={<div />}
              // containerElement={<div/>}
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyD7G8BpIglzpBYCVp4xy7pJCWAwfNeI0u8"
              resetSelection={this.resetSelection}
              activeStation={this.state.activeStation}
              clickStation={this.clickStation}
              allPins={this.state.allPins ? this.state.allPins : []}
              allMarkers={
                this.state.selectedMarkers ? this.state.selectedMarkers : []
              }
              containerElement={<div className="map-container" />}
              mapElement={<div style={{ height: "70vh", width: "100%" }} />}
            />
          </div>
          <StationDetails
            imageUrls={this.state.imageUrls ? this.state.imageUrls : ""}
            locationImages={this.state.locationImages}
            selectedMarkers={this.state.selectedMarkers}
            clickStation={this.clickStation}
            activeStation={this.state.activeStation}
            resetSelection={this.resetSelection}
          />
        </div>

        <Footer />
      </div>
    );
  }
}

export default App;
