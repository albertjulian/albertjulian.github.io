import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Paper, Button, Input } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  search: {
    flexGrow: 1,
    height: 42,
    padding: theme.spacing(0, 2),
    display: 'flex',
    alignItems: 'center',
  },
  searchIcon: {
    marginRight: theme.spacing(2),
    color: theme.palette.icon,
  },
  searchInput: {
    flexGrow: 1,
  },
  searchButton: {
    backgroundColor: '#F2F9FE',
    marginLeft: theme.spacing(2),
  },
}));

// eslint-disable-next-line react/prop-types
function Search({ onSearch, className, placeHolder, value, ...rest }) {
  const classes = useStyles();
  const [searchValue, setSearchValue] = useState(value || '');

  return (
    <form
      onSubmit={(e) => {
        onSearch(searchValue);
        e.preventDefault();
      }}
    >
      <div {...rest} className={clsx(classes.root, className)}>
        <Paper className={classes.search} elevation={1}>
          <SearchIcon className={classes.searchIcon} />
          <Input
            className={classes.searchInput}
            disableUnderline
            placeholder={placeHolder}
            onChange={(e) => {
              const { target } = e;
              setSearchValue(target.value);
            }}
            value={searchValue}
          />
        </Paper>
        <Button
          className={classes.searchButton}
          onClick={() => onSearch(searchValue)}
          size="large"
          variant="contained"
        >
          Search
        </Button>
      </div>
    </form>
  );
}

Search.propTypes = {
  className: PropTypes.string,
  onSearch: PropTypes.func,
  placeHolder: PropTypes.string,
  value: PropTypes.string,
};

export default Search;
