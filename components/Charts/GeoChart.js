/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-template */
/* eslint-disable no-use-before-define */
/* eslint-disable no-inner-declarations */
import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import * as topojson from 'topojson';
import * as d3 from 'd3';
import blue from '@material-ui/core/colors/blue';
import grey from '@material-ui/core/colors/grey';
import { makeStyles } from '@material-ui/styles';
import topoJsonDataIndonesia from 'src/assets/IndonesiaProvinceData.json';

const useResizeObserver = (ref) => {
  const [dimensions, setDimensions] = useState(null);
  useEffect(() => {
    const observeTarget = ref.current;
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        setDimensions(entry.contentRect);
      });
    });
    resizeObserver.observe(observeTarget);
    return () => {
      resizeObserver.unobserve(observeTarget);
    };
  }, [ref]);
  return dimensions;
};

const useStyles = makeStyles((theme) => ({
  root: {},
  svgMap: {
    display: 'block',
    width: '100%',
    height: 'auto',
    marginTop: '-100px',
    [theme.breakpoints.down('md')]: {
      marginTop: '-70px',
    },
  },
}));

function GeoChart({ geoChartData }) {
  const classes = useStyles();
  let centered;

  const dataIndonesia = topoJsonDataIndonesia;

  const divWrapperRef = useRef(null);

  const dimensions = useResizeObserver(divWrapperRef);

  const d3Container = useRef(null);

  const [isRendered, setIsRendered] = useState(false);
  useEffect(() => {
    if (!dimensions) return;

    if (!isRendered && dataIndonesia && Object.keys(geoChartData).length) {
      const { width } = dimensions;
      const height = width / 1.85;

      const d3Projection = d3
        .geoEquirectangular()
        .scale([width * 1.1])
        .rotate([-118, 0])
        .translate([width / 2, height / 2]);

      const path = d3.geoPath().projection(d3Projection);

      const data = dataIndonesia;

      // svg dom object
      const svg = d3.select(d3Container.current);

      // g dom object
      let g;

      // manual html tooltip
      const divTooltip = d3
        .select('body')
        .append('div')
        .attr('id', 'tooltip')
        .style('text-align', 'left')
        .style('line-height', '20px')
        .style('opacity', 0);

      function clicked(clickedFeature) {
        let x;
        let y;
        let zoomScale;

        if (clickedFeature && centered !== clickedFeature) {
          const [centroid0, centroid1] = path.centroid(clickedFeature);
          x = centroid0;
          y = centroid1;
          zoomScale = 4;
          centered = clickedFeature;
        } else {
          x = width / 2;
          y = height / 2;
          zoomScale = 1;
          centered = null;
        }

        g.selectAll('path').classed(
          'active',
          centered && ((activePath) => activePath === centered),
        );

        g.transition()
          .duration(750)
          .attr(
            'transform',
            `translate(${width / 2}, ${height /
              2}) scale(${zoomScale}) translate(-${x}, -${y})`,
          )
          .style('stroke-width', `${1.5 / zoomScale}px`);
      }

      svg
        .attr('viewBox', `0 0 ${width} ${height}`)
        .attr('preserveAspectRatio', 'xMinYMin')
        .append('rect')
        .attr('class', 'background')
        .style('fill', 'none')
        .style('pointer-events', 'all')
        .attr('width', width)
        .attr('height', height)
        .on('click', clicked);

      g = svg.append('g');

      const countPerProvince = {};
      let max = 0;
      Object.entries(geoChartData).forEach(([province, citiesInProvince]) => {
        if (citiesInProvince) {
          let total = 0;

          const objectKeys = Object.keys(citiesInProvince);
          for (let i = 0; i < objectKeys.length; i += 1) {
            total += parseFloat(citiesInProvince[objectKeys[i]] || 0);
          }

          if (total > max) {
            max = total;
          }
          countPerProvince[province] = {
            count: total,
          };
        }
      });

      const interval = Math.ceil(max / 4);
      const colorRanges = [
        {
          min: 0,
          max: 0,
          color: grey[500],
        },
        {
          min: 1,
          max: interval,
          color: blue[100],
        },
        {
          min: interval + 1,
          max: interval * 2,
          color: blue[500],
        },
        {
          min: interval * 2 + 1,
          max: interval * 3,
          color: blue[700],
        },
        {
          min: interval * 3 + 1,
          max: interval * 4,
          color: blue[900],
        },
      ];

      g.append('g')
        .attr('id', 'subunits')
        .selectAll('path')
        .data(
          // for cities data
          topojson.feature(data, data.objects.provinces).features,
        )
        .enter()
        .append('path')
        .attr('fill', (_d, _i) => {
          // choosing color if the data exist
          const provinceExists = geoChartData[_d.properties.provinsi];

          if (provinceExists) {
            const respondentsCount =
              countPerProvince[_d.properties.provinsi].count;
            return colorRanges.find(
              (c) => respondentsCount >= c.min && respondentsCount <= c.max,
            ).color;
          }

          return grey[500];
        })
        .attr('d', path)
        .on('click', clicked)
        .on('mouseover', (d, i) => {
          // city hover animation
          d3.select(d3.event.currentTarget).style('fill-opacity', 0.5);
          d3.select(d3.event.currentTarget).style('cursor', 'pointer');

          // show tooltip
          divTooltip
            .transition()
            .duration(200)
            .style('opacity', 1);

          const selectedProvinces = geoChartData[d.properties.provinsi];

          let selectedColor = grey[500];
          if (selectedProvinces) {
            const respondentsCount =
              countPerProvince[d.properties.provinsi].count;
            selectedColor = colorRanges.find(
              (c) => respondentsCount >= c.min && respondentsCount <= c.max,
            ).color;
          }

          let htmlCityListString = '';
          let lengthColumn = 0;

          const getCountString = (count) => {
            return count > 1 ? `${count} Respondents` : `${count} Respondent`;
          };

          if (geoChartData[d.properties.provinsi]) {
            const cityList = Object.keys(selectedProvinces);
            lengthColumn = Math.ceil(cityList.length / 8);
            for (const city of cityList) {
              htmlCityListString =
                htmlCityListString +
                '<li>' +
                '<p>' +
                '<strong>' +
                city +
                '</strong>' +
                ' : ' +
                getCountString(selectedProvinces[city]) +
                ' </p>' +
                '</li>';
            }
          }
          divTooltip
            .html(
              '<span style="height: 10px;width: 10px;background-color:' +
                selectedColor +
                ';border-radius: 5px;display: inline-block; margin-right: 5px;"></span>' +
                '<h3 style="display: inline-block;">' +
                '<strong>' +
                d.properties.provinsi +
                '</strong>' +
                ' </h3>' +
                (htmlCityListString
                  ? '<div style="padding-left: 15px">' +
                    `<ul style="list-style: none; columns: ${lengthColumn}; -webkit-columns: ${lengthColumn}; -moz-columns: ${lengthColumn};">` +
                    htmlCityListString +
                    ' </ul>' +
                    '</div>'
                  : '<p>no data</p>'),
            )
            .style('left', `${d3.event.pageX}px`)
            .style('top', `${d3.event.pageY - 28}px`);
        })
        .on('mouseout', (d, i) => {
          // city hover animation
          d3.select(d3.event.currentTarget).style('fill-opacity', 1);

          // hide tooltip
          divTooltip
            .transition()
            .duration(500)
            .style('opacity', 0);
        });

      g.append('path')
        .datum(
          topojson.mesh(data, data.objects.provinces, (a, b) => {
            return a !== b;
          }),
        )
        .attr('id', 'state-borders')
        .style('fill', 'none')
        .style('stroke', '#fff')
        .style('stroke-width', '0.1px')
        .style('stroke-linejoin', 'round')
        .style('stroke-linecap', 'round')
        .style('pointer-events', 'none')
        .attr('d', path);

      setIsRendered(true);
    }
  }, [geoChartData, dataIndonesia, isRendered, dimensions]);

  return (
    <div
      ref={divWrapperRef}
      style={{
        display: 'flex',
        width: 'inherit',
        justifyContent: 'center',
      }}
    >
      <svg className={classes.svgMap} ref={d3Container} />
    </div>
  );
}

GeoChart.propTypes = {
  geoChartData: PropTypes.object,
};

export default GeoChart;
