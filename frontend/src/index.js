import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';


import "assets/scss/black-dashboard-react.scss";
import "assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { store } from "./store/store";
import { TicsApp } from "./TicsApp";

ReactDOM.render(
  <Provider store={store}>
    <TicsApp />
  </Provider>,
  document.getElementById("root")
);
