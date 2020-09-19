import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Bar, HorizontalBar } from 'react-chartjs-2';
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

const BarChart = React.memo(({
  data: dataProp,
  respondents,
  labels,
  className,
  horizontal, ...rest
}) => {
  const classes = useStyles();
  const theme = useTheme();

  const data = {
    datasets: [
      {
        label: 'This year',
        backgroundColor: [
          ...[
            colors.blue[100],
            colors.blue[200],
            colors.blue[300],
            colors.blue[400],
            colors.blue[500],
            colors.blue[600],
            colors.blue[700],
            colors.lightBlue[50],
            colors.lightBlue[100],
            colors.lightBlue[200],
            colors.lightBlue[300],
            colors.lightBlue[400],
            colors.lightBlue[500],
            colors.lightBlue[600],
            colors.lightBlue[700],
          ].sort(() => Math.random() - 0.5),
        ],
        data: dataProp,
        barThickness: 12,
        maxBarThickness: 10,
        barPercentage: 0.5,
        categoryPercentage: 0.5,
      },
    ],
    labels,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    cornerRadius: 20,
    legend: {
      display: false,
    },
    layout: {
      padding: 0,
    },
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
            drawBorder: false,
          },
          ticks: {
            precision: 0,
            padding: 20,
            fontColor: theme.palette.text.secondary,
            ...(horizontal && { beginAtZero: true }),
            callback: (value) => {
              const characterLimit = 10;
              if (value.length >= characterLimit) {
                return (
                  `${value
                    .slice(0, value.length)
                    .substring(0, characterLimit - 1)
                    .trim()}...`
                );
              }
              return value;
            },
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider,
          },
          ticks: {
            padding: 20,
            fontColor: theme.palette.text.secondary,
            ...(!horizontal && { beginAtZero: true }),
            min: 0,
            maxTicksLimit: 15,
            callback: (value) => {
              const characterLimit = 20;
              if (value.length >= characterLimit) {
                return (
                  `${value
                    .slice(0, value.length)
                    .substring(0, characterLimit - 1)
                    .trim()}...`
                );
              }
              return value;
            },
            stepSize: 1,
          },
        },
      ],
    },
    tooltips: {
      enabled: true,
      mode: 'index',
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
        title: (tooltipItems) => {
          const tooltipItem = tooltipItems[0];
          const label = data.labels[tooltipItem.index];
          const value = data.datasets[0].data[tooltipItem.index];
          const totalData = respondents || 0;
          const valueInPercentage = totalData ? Math.round((value / totalData) * 100) : 0;
          return `${label} (${valueInPercentage}%)`;
        },
        label: (tooltipItem) => (typeof tooltipItem.yLabel === 'number'
            ? ` ${tooltipItem.yLabel} ${
                tooltipItem.yLabel > 1 ? 'Respondents' : 'Respondent'
              }`
            : ` ${tooltipItem.xLabel} ${
                tooltipItem.xLabel > 1 ? 'Respondents' : 'Respondent'
              }`),
      },
    },
  };

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      {horizontal ? (
        <HorizontalBar data={data} options={options} />
      ) : (
        <Bar data={data} options={options} />
      )}
    </div>
  );
});

BarChart.propTypes = {
  className: PropTypes.string,
  respondents: PropTypes.number,
  data: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired,
  horizontal: PropTypes.bool,
};

export default React.memo(BarChart, isEqual);
