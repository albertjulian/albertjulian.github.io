import React, { useState } from 'react';
import { Router } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { createBrowserHistory } from 'history';
import MomentUtils from '@date-io/moment';
import { Provider as StoreProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from '@material-ui/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import 'react-perfect-scrollbar/dist/css/styles.css';
import {
  theme,
} from './theme';
import reduxStore from './store';
import routes from './routes';
import templateRoutes from './templateRoutes';
import IntercomWidget from './components/IntercomWidget';
import ScrollReset from './components/ScrollReset';
import StylesProvider from './components/StylesProvider';
import SnackbarWrapper from './SnackbarWrapper';

import './mixins/chartjs';
import './mixins/moment';
import './mixins/validate';
import './mixins/prismjs';
import './mock';
import './config/amplify-config';
import './utils/firebaseService';

import './assets/scss/main.scss';

const history = createBrowserHistory();
const { store, persistor } = reduxStore;

function App() {
  const [
    direction,
  ] = useState('ltr');

  return (
      <div>
        Hello Anjay
      </div>
    // <StoreProvider store={store}>
    //   <PersistGate loading={null} persistor={persistor}>
    //     <ThemeProvider theme={theme}>
    //       <StylesProvider direction={direction}>
    //         <MuiPickersUtilsProvider utils={MomentUtils}>
    //           <Router history={history}>
    //             <ScrollReset />
    //             <IntercomWidget />
    //             {renderRoutes(routes.concat(templateRoutes))}
    //           </Router>
    //           <SnackbarWrapper />
    //         </MuiPickersUtilsProvider>
    //       </StylesProvider>
    //     </ThemeProvider>
    //   </PersistGate>
    // </StoreProvider>
  );
}

export default App;
