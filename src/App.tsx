import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./store/store";

//Container
import Header from "./containers/Header";

//Routes
import { Routes } from "./routes";

function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Header />
          <Routes />
        </Router>
      </Provider>
    </>
  );
}

export default App;
