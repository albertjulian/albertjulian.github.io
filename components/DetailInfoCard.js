import React from 'react';
import PropTypes from 'prop-types';
import { Card, List } from '@material-ui/core';

import { ListTitle, ListItem } from './List';

const DetailInfoCard = ({ data, title, hasMenu, onMenuClick, maxHeight }) => {
  return (
    <Card>
      <ListTitle title={title} hasMenu={hasMenu} onMenuClick={onMenuClick} />
      <List style={{ maxHeight, overflow: maxHeight ? 'auto' : 'none'}}>
        { data.map((val, idx) => (
          <ListItem
            key={idx}
            title={val.label || ''}
            subtitle={val.value || ''}
            icon={val.icon}
            customItem={val.customItem}
          />
        ))}
      </List>

    </Card>
  );
};

DetailInfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  hasMenu: PropTypes.bool,
  onMenuClick: PropTypes.func,
  maxHeight: PropTypes.string,
};

DetailInfoCard.defaultProps = {
  hasMenu: false,
};

export default DetailInfoCard;
