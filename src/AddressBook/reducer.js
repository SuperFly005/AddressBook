import { combineReducers } from "redux";

import { reducer as searchReducer } from "./SearchContacts";
import { reducer as contactDetailsReducer } from "./ContactDetails";

export default combineReducers({
  search: searchReducer,
  contactDetails: contactDetailsReducer,
});
