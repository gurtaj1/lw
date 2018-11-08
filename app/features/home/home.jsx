import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from 'features/home/home.scss';

export const negativeBalanceCheck = (prevBalance, balance) => {
  if (prevBalance >= 0 && balance < 0) {
    alert('Warning! You are now going into your overdraft');
  };
}

export default class Home extends Component {
  constructor (props){
    super(props);
    this.state = {
      balance: 12.00
    };
    this.increaseBalance = this.increaseBalance.bind(this);
    this.decreaseBalance = this.decreaseBalance.bind(this);
  }

  increaseBalance () {
    this.setState({
      balance: this.state.balance + 1
    });
  }
  
  decreaseBalance () {
    this.setState({
      balance: this.state.balance - 1
    });
  }

  componentDidUpdate (prevProps, prevState) {
    negativeBalanceCheck(prevState.balance, this.state.balance);
  }

  /**
   * React render method
   * @returns {JSX}
   */
  render () {
    return (
      <div className={styles['home']}>
        Your Balance: {`£${this.state.balance}`}
        <div className={styles['balance-buttons']}>
          <button onClick={this.decreaseBalance}>
            -
          </button>
          <button onClick={this.increaseBalance}>
            +
          </button>
        </div>
      </div>
    );
  }
}
