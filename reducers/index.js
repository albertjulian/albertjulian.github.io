import { combineReducers } from 'redux';
import sessionReducer from './sessionReducer';
import createStudyReducer from './createStudyReducer';
import createStudyResourceReducer from './createStudyResourceReducer';
import snackbarReducer from './snackbarReducer';
import projectReducer from './projectReducer';
import resourceReducer from './resourceReducer';
import createQuotationReducer from './createQuotationReducer';
import featureFlagReducer from './featureFlagReducer';

const rootReducer = combineReducers({
  session: sessionReducer,
  study: createStudyReducer,
  createStudyResource: createStudyResourceReducer,
  snackbar: snackbarReducer,
  project: projectReducer,
  resource: resourceReducer,
  quotation: createQuotationReducer,
  featureFlag: featureFlagReducer,
});

export default rootReducer;
