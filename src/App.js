import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import CssBaseline from "@mui/material/CssBaseline";
import throttle from "lodash/throttle";
import { saveState, loadState } from "./helpers/storage";

import modules from "./modules";
import Containers from "./containers";
import "./App.css";

export const store = createStore(
  modules,
  loadState(),
  composeWithDevTools(applyMiddleware(thunk))
);

// Subscribe to state changes, saving the store's state to the browser's
// local storage. Added throttle to prevent excessive work.
store.subscribe(throttle(() => saveState(store.getState()), 1000));

const App = () => {
  return (
    <Provider store={store}>
      <CssBaseline />
      <Containers />
    </Provider>
  );
};

export default App;
