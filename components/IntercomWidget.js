import React from 'react';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';

const APP_ID = 'sgfj93ly';

function IntercomWidget() {
  const session = useSelector((state) => state.session);

  const renderWidgetVisitor = () => {
    return (
      <script>
        {`
          window.Intercom('boot', {
            app_id: '${APP_ID}'
          });
        `}
      </script>
    );
  };
  const renderWidgetLoggedIn = () => {
    const { email, firstName, lastName } = session && session.user;
    return (
      <script>
        {`
          window.Intercom('boot', {
            app_id: '${APP_ID}',
            email: '${email}',
            name: '${firstName} ${lastName}',
          });
        `}
      </script>
    );
  };

  return (
    <Helmet>
      <script>
        {`
            (function() {
              var w = window;
              var ic = w.Intercom;
              if (typeof ic === 'function') {
                ic('reattach_activator');
                ic('update', w.intercomSettings);
              } else {
                var d = document;
                var i = function() {
                  i.c(arguments);
                };
                i.q = [];
                i.c = function(args) {
                  i.q.push(args);
                };
                w.Intercom = i;
                var l = function() {
                  var s = d.createElement('script');
                  s.type = 'text/javascript';
                  s.async = true;
                  s.src = 'https://widget.intercom.io/widget/' + '${APP_ID}';
                  var x = d.getElementsByTagName('script')[0];
                  x.parentNode.insertBefore(s, x);
                };
                if (document.readyState === 'complete') {
                  l();
                } else if (w.attachEvent) {
                  w.attachEvent('onload', l);
                } else {
                  w.addEventListener('load', l, false);
                }
              }
            })();
        `}
      </script>
      {session && session.loggedIn && renderWidgetLoggedIn()}
      {session && !session.loggedIn && renderWidgetVisitor()}
    </Helmet>
  );
}

export default IntercomWidget;
