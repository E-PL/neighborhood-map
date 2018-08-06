import React, { Component } from "react";

/**
 * Top bar component
 *
 * @class Header
 * @extends {Component}
 */
class Header extends Component {

  /**
   * Render header
   *
   * @returns component
   * @memberof Header
   */
  render() {
    return (
      <header className="main-header-container">
        <a
          onClick={e => {
            this.props.hamburgerClicked(e);
          }}
          id="open-search"
          href="#Search"
          role="button"
          tabIndex="0"
          aria-label="open station list"
        >
          <i className="fa fa-bars" />
        </a>
        <h1 className="main-header">Genoa wiki map</h1>
      </header>
    );
  }
}

export default Header;
