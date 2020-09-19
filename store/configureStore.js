import { applyMiddleware, createStore, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import rootReducer from 'src/reducers';

const loggerMiddleware = createLogger();
const persistConfig = {
  key: 'populix',
  storage,
  whitelist: ['session']
};

export function configureStore(preloadedState = {}) {
  const middlewares = [thunkMiddleware];

  // log redux only in development env
  if (process.env.NODE_ENV === 'development') {
    middlewares.push(loggerMiddleware);
  }

  const middlewareEnhancer = composeWithDevTools(
    applyMiddleware(...middlewares)
  );

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = compose(...enhancers);

  // const store = createStore(rootReducer, preloadedState, composedEnhancers);
  const store = createStore(
    persistReducer(persistConfig, rootReducer),
    preloadedState,
    composedEnhancers
  );
  const persistor = persistStore(store);

  return { store, persistor };
}

const reduxStore = configureStore();
export default reduxStore;
