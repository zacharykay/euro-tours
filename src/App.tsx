import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Footer from "./components/Footer";
// import Header from "./components/Header";

import Home from "./pages/Home";
import MobileNav from "./components/app-navbar/AppNavbar";
import AdminPanel from "./pages/AdminPanel";
import Filters from "./components/Filters";

import { useFilterContext } from "./context/filter_context";


function App() {
  const { filtered_tours, showFilters, stickyHeader } = useFilterContext();

  return (
    <Router>
      <MobileNav />
      <div
        className={
          showFilters ? (
            "filters-hidden filters-wrapper"
          ) : (
            "filters-visible filters-wrapper"
          )
        }
        style={stickyHeader && { paddingTop: "5rem" }}
      >
        <Filters />
      </div>
      {/* <Header /> */}
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/admin">
          <AdminPanel />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
