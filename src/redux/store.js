import {
  createStore,
  compose,
  applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';

// import reducers
import reducer from './reducer';

/* eslint-disable no-underscore-dangle */
const composeEnhancers = typeof window === 'object'
    && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
  // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
  }) : compose;
/* eslint-enable */

const middleware = composeEnhancers(applyMiddleware(thunk));

export default createStore(reducer, middleware);
