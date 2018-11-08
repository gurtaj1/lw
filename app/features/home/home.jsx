import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from 'features/home/home.scss';

export default class Home extends Component {
  /**
   * React render method
   * @returns {JSX}
   */
  render () {
    return (
      <div className={styles['home']}>
        content will go here
      </div>
    );
  }
}

Home.propTypes = {

};

Home.defaultProps = {

};
