import React from 'react';
import PropTypes from 'prop-types';
import styles from './BuildControl.css';

const buildControl = (props) => (
  <div className={styles.BuildControl}>
    <div className={styles.Label}>{props.label.toUpperCase()}</div>
    <button
      className={styles.More}
      onClick={() => props.onAddHandler(props.label)}
    >+
    </button>
    <button
      disabled={props.removeIngredientDisabled}
      className={styles.Less}
      onClick={() => props.onRemoveHandler(props.label)}
    >-
    </button>
  </div>
);

buildControl.propTypes = {
  label: PropTypes.string.isRequired,
  onAddHandler: PropTypes.func.isRequired,
  removeIngredientDisabled: PropTypes.bool.isRequired,
  onRemoveHandler: PropTypes.func.isRequired,
};

export default buildControl;
