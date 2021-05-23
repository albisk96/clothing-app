import Routes from "./routes/Routes";
import { BrowserRouter as Router } from "react-router-dom";

import DataContextProvider from "./contexts/dataContext";
import NavBar from "./components/NavBar";

const App = () => (
  <Router>
    <DataContextProvider>
      <div className="bg-gray-200 h-screen overflow-auto">
        <NavBar />
        <div className="container max-w-8xl mx-auto sm:px-6 lg:px-8">
          <Routes />
        </div>
      </div>
    </DataContextProvider>
  </Router>
);

export default App;
