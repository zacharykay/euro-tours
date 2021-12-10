import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Footer from "./components/Footer";
// import Header from "./components/Header";

import Home from "./pages/Home";
import MobileNav from "./components/app-navbar/AppNavbar";

function App() {
  return (
    <Router>
      <MobileNav />
      {/* <Header /> */}
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
