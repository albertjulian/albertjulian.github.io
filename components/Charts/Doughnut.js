import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Doughnut } from 'react-chartjs-2';
import { makeStyles, useTheme } from '@material-ui/styles';
import { colors } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
  },
}));

const isEqual = (prevProps, nextProps) => {
  if (JSON.stringify(prevProps) === JSON.stringify(nextProps)) {
    return true;
  }

  return false;
};

const sortData = (labels, values, sortType = 'ASC') => {
  const dataToReturn = {
    labels: [],
    values: [],
  };

  // 1) combine the arrays:
  const list = [];
  for (let j = 0; j < labels.length; j++) {
    list.push({ label: labels[j], value: values[j] });
  }

  // 2) sort:
  list.sort((a, b) => {
    // Sort could be modified to, for example, sort on the age
    // if the name is the same.
    if (sortType === 'DESC') {
      return a.value > b.value ? -1 : a.value === b.value ? 0 : 1;
    }

    return a.value < b.value ? -1 : a.value === b.value ? 0 : 1;
  });

  // 3) separate them back out:
  for (let k = 0; k < list.length; k++) {
    dataToReturn.labels.push(list[k].label);
    dataToReturn.values.push(list[k].value);
  }

  return dataToReturn;
};

const DoughnutChart = React.memo(({
  data: dataProp,
  labels,
  respondents,
  className, ...rest
}) => {
  const classes = useStyles();
  const theme = useTheme();

  const sortedData = sortData(labels, dataProp, 'DESC');

  const data = {
    labels: sortedData.labels,
    datasets: [
      {
        data: sortedData.values,
        backgroundColor: [
          colors.blue[700],
          colors.blue[500],
          colors.blue[400],
          colors.blue[300],
          colors.blue[200],
          colors.blue[100],
        ],
        hoverBackgroundColor: [
          colors.blue[700],
          colors.blue[500],
          colors.blue[400],
          colors.blue[300],
          colors.blue[200],
          colors.blue[100],
        ],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    cutoutPercentage: 85,
    legend: {
      display: true,
      fullWidth: true,
      position: 'bottom',
      align: 'start',
      labels: {
        padding: 30,
      },
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    },
    tooltips: {
      enabled: true,
      mode: 'point',
      intersect: false,
      caretSize: 10,
      yPadding: 20,
      xPadding: 20,
      borderWidth: 1,
      borderColor: theme.palette.divider,
      backgroundColor: theme.palette.common.white,
      titleFontColor: theme.palette.text.primary,
      bodyFontColor: theme.palette.text.secondary,
      footerFontColor: theme.palette.text.secondary,
      callbacks: {
        title: (tooltipItems, dataTitle) => {
          const tooltipItem = tooltipItems[0];
          const label = dataTitle.labels[tooltipItem.index];
          const value = dataTitle.datasets[0].data[tooltipItem.index];
          const totalData = respondents || 0;
          const valueInPercentage = Math.round((value / totalData) * 100);
          return `${label} (${valueInPercentage}%)`;
        },
        label: (tooltipItem, dataLabel) => {
          const value = dataLabel.datasets[0].data[tooltipItem.index];
          return ` ${value} ${value > 1 ? 'Respondents' : 'Respondent'}`;
        },
      },
    },
  };

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Doughnut data={data} options={options} />
    </div>
  );
});

DoughnutChart.propTypes = {
  className: PropTypes.string,
  data: PropTypes.array.isRequired,
  respondents: PropTypes.number,
  labels: PropTypes.array.isRequired,
};

export default React.memo(DoughnutChart, isEqual);
