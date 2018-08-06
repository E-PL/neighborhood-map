import React, { Component } from "react";
import ResultsList from "./ResultsList";

/**
 * The nav component holds the search input and results list
 *
 * @class Nav
 * @extends {Component}
 */
class Nav extends Component {

  /**
   * Local state holds the query
   *
   * @memberof Nav
   */
  state = {
    query: ""
  };

  /**
   * Handle the onChange event listener on the search input text field
   *
   * @param {String} e the event target value
   */
  handleSearch = e => {
    // save the query to local state
    this.setState(oldState => {
      const newState = oldState;
      newState.query = e;
      return newState;
    });
    // call the onSearch function in App component passing in the query
    this.props.onSearch(e);
  };

  /**
   * Render nav component
   *
   * @returns component
   * @memberof Nav
   */
  render() {
    if (this.props.hamburgerClicked === true) {
      return (
        <nav className="search open" id="nav" tabIndex="0">
          <form className="filter-form" action="#results">
            <label className="filter">
              <i className="fa fa-filter" />
            </label>
            <input
              id="search-text"
              type="text"
              onChange={e => {
                this.handleSearch(e.target.value);
              }}
              value={this.state.value}
              placeholder="Fiter by name"
            />
          </form>

          <ul className="search-results">
            <ResultsList
              clickStation={this.props.clickStation}
              selectedMarkers={this.props.selectedMarkers}
            />
          </ul>
          <a href="#search-text" className="skip-link">
            Back to search
          </a>
        </nav>
      );
    } else if (this.props.hamburgerClicked !== true) {
      return null;
    }
  }
}

export default Nav;
