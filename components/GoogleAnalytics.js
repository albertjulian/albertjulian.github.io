/* eslint-disable react/no-danger */
import React from 'react';
import { Helmet } from 'react-helmet';

// eslint-disable-next-line no-undef
const GA_MEASUREMENT_ID = process.env.REACT_APP_GA_MEASUREMENT_ID;
const GTM_ID = process.env.REACT_APP_GOOGLE_TAG_MANAGER_ID;

function GoogleAnalytics() {
  if (process.env.REACT_APP_ENVIRONMENT !== 'production') {
    return null;
  }
  if (process.env.REACT_APP_ENVIRONMENT === 'production') {
    return (
      <Helmet>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        />
        <script>
          {`
          window.dataLayer = window.dataLayer || [];

          function gtag() {
            dataLayer.push(arguments);
          }

          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
        </script>
        {/*  Google Tag Manager */}
        <script>
          {`
          (function(w, d, s, l, i) {
            w[l] = w[l] || [];
            w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
            var f = d.getElementsByTagName(s)[0],
              j = d.createElement(s),
              dl = l != 'dataLayer' ? '&l=' + l : '';
            j.async = true;
            j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
            f.parentNode.insertBefore(j, f);
          })(window, document, 'script', 'dataLayer', '${GTM_ID}');
        `}
        </script>
        {/* <!-- End Google Tag Manager --> */}
      </Helmet>
    );
  }
}

export default GoogleAnalytics;
