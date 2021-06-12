import { BrowserRouter as Router } from "react-router-dom";

//Container
import { Header } from "./containers";

//Routes
import { Routes } from "./routes";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes />
      </Router>
    </>
  );
}

export default App;
