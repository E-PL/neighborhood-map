import React, { Component } from 'react';


/**
 * Footer component
 *
 * @class Footer
 * @extends {Component}
 */
class Footer extends Component {
  
  /**
   * Render footer
   *
   * @returns component
   * @memberof Footer
   */
  render() {
    return (
      <footer className="footer" role="contentinfo">
        
        <p className="footer-text">Locations data and images by <a className="footer-link" href="https://www.wikipedia.org">WikiPedia</a></p>
        
        <p className="footer-text">Marker Icon by SimpleIcon from <a className="footer-link" href="http://www.flaticon.com">flaticon</a></p>
      </footer>
    );
  }
}

export default Footer;