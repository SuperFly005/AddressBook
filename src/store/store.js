import {
  applyMiddleware as applyReduxMiddleware,
  createStore as createReduxStore,
} from "redux";
import reducer from "../reducer";
import { composeWithDevTools as composeWithReduxDevTools } from "redux-devtools-extension";
import reduxThunk from "redux-thunk";
import debounce from "debounce-promise";

import {SEARCH_REQUEST_MIN_INTERVAL_IN_MILLIS} from '../httpApi/fakeHttpApi'

import DataCache from "../dataCache";

const logger = store => next => action => {
  console.log("action:", action);
  return next(action);
};

export const setupStore = ({ httpApi }) => {

  const middlewares = [];

  middlewares.push(
    reduxThunk.withExtraArgument({
      httpApi: {
        getFirst5MatchingContacts: debounce(httpApi.getFirst5MatchingContacts, SEARCH_REQUEST_MIN_INTERVAL_IN_MILLIS),
        getContact: debounce(httpApi.getContact, SEARCH_REQUEST_MIN_INTERVAL_IN_MILLIS),
      },
      dataCache: new DataCache(),
    }),
  );

  if (process.env.NODE_ENV === "development") {
    middlewares.push(logger);
  }

  return createReduxStore(
    reducer,
    composeWithReduxDevTools(
      applyReduxMiddleware(...middlewares),
    ),
  );
};