import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Table, TableRow, TableCell, TableBody } from '@material-ui/core';
import { formatNumber } from 'src/utils/helper';

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
  },
  rowName: {
    fontWeight: 'bold',
    paddingLeft: 50,
    paddingTop: 20,
  },
  rowTotal: {
    color: 'blue',
    paddingRight: 50
  },
}));

function TopProvincesChart({
  data,
  className,
  page,
  rowsPerPage,
  handleClick,
  ...rest
}) {
  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Table>
        <TableBody>
          {
            data && data.length > 0 &&
            data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) =>
              <TableRow
                key={index}
                style={{
                  cursor: handleClick ? 'pointer' : 'auto',
                }}
                onClick={(e) => handleClick && handleClick(e, row)}
              >
                <TableCell component="th" scope="row" className={classes.rowName}>
                  {row.name}
                </TableCell>
                <TableCell align="right" className={classes.rowTotal}>
                  {formatNumber(row.total)}
                </TableCell>
              </TableRow>)
          }
        </TableBody>
      </Table>

    </div>
  );
}

TopProvincesChart.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array.isRequired,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  handleClick: PropTypes.func,
};

export default TopProvincesChart;
