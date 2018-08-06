import React, { Component } from "react";

/**
 * List the results of search
 *
 * @class ResultsList
 * @extends {Component}
 */
class ResultsList extends Component {
 
  /**
   * Handler for the keyboard event listeners
   *
   * @param {Event} e the event object
   * @param {Number} id the station id
   * @memberof ResultsList
   */
  handleKeyUp = (e, id) => {
    // make the event accessible in the callback
    e.persist();
    // if the pressed key was enter
    if (e.keyCode === 13 && e.target.href !== "#nav") {
      // call clickStation from app component passing in the originating event and the station id
      this.props.clickStation(e, id);
    }
  };

  /**
   * Render results list component
   *
   * @returns component
   * @memberof ResultsList
   */
  render() {
    if (this.props.selectedMarkers.length > 0) {
      return this.props.selectedMarkers.map(station => {
        if (this.props.selectedMarkers !== 0) {
          return (
            <li className="search-result" id="results" key={station.id}>
              <a
                id={station.id}
                tabIndex="0"
                onClick={e => {
                  this.props.clickStation(e, station.id);
                }}
                onKeyUp={e => {
                  this.handleKeyUp(e, station.id);
                }}
                className="results-link"
              >
                {station.name}
              </a>
            </li>
          );
        }
        return null;
      });
    } else {
      return (
        <span>
          <li className="results-link" tabIndex="0">
            No results
          </li>
        </span>
      );
    }
  }
}

export default ResultsList;
