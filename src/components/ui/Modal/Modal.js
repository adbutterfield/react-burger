import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Backdrop from '../Backdrop/Backdrop';
import styles from './Modal.css';

class Modal extends Component {
  static propTypes = {
    shouldShow: PropTypes.bool,
    clickHandler: PropTypes.func.isRequired,
  }

  static defaultProps = {
    shouldShow: false,
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.shouldShow !== this.props.shouldShow ||
      nextProps.children !== this.props.children;
  }

  render() {
    return (
      <React.Fragment>
        <Backdrop
          shouldShow={this.props.shouldShow}
          clickHandler={this.props.clickHandler}
        />
        <div
          className={styles.Modal}
          style={{
            transform: this.props.shouldShow ? 'translateY(0)' : 'translatey(-100vh)',
            opacity: this.props.shouldShow ? 1 : 0,
          }}
        >
          {this.props.children}
        </div>
      </React.Fragment>
    );
  }
}

export default Modal;
