import React from 'react';
import PropTypes from 'prop-types';
import PinField from 'react-pin-field';

const CodeInput = ({ fieldLength = 6, onComplete }) => {
  return (
    <div className="pin-container">
      <PinField
        className="pin-field"
        validate="0123456789"
        length={fieldLength}
        onComplete={(code) => onComplete(code)}
      />
    </div>
  );
};

CodeInput.propTypes = {
  fieldLength: PropTypes.number,
  onComplete: PropTypes.func,
};

export default CodeInput;
