import React from 'react';
import ReactWordcloud from 'react-wordcloud';
import PropTypes from 'prop-types';

const isEqual = (prevProps, nextProps) => {
  if (JSON.stringify(prevProps) === JSON.stringify(nextProps)) {
    return true;
  }

  return false;
};

const Wordcloud = React.memo(({ label, value }) => {
  const words = [];
  // only create object for value > 0
  for (let index = 0; index < value.length; index++) {
    if (value[index] !== 0) {
      words.push({ text: label[index], value: value[index] });
    }
  }

  return (
    <ReactWordcloud
      words={words.length && words}
      deterministic
      options={{
        rotations: 2,
        rotationAngles: [0, -90],
        fontFamily: 'open-sans',
        fontSizes: [20, 80],
        padding: 5,
        fontWeight: 'bold',
      }}
    />
  );
});

Wordcloud.propTypes = {
  label: PropTypes.array.isRequired,
  value: PropTypes.array.isRequired,
};

export default React.memo(Wordcloud, isEqual);
