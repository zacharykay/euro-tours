import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Footer from "./components/Footer";
// import Header from "./components/Header";

import Home from "./pages/Home";
import MobileNav from "./components/app-navbar/AppNavbar";
import AdminPanel from "./pages/AdminPanel";
import Filters from "./components/Filters";
import AuthWrapper from "./pages/AuthWrapper";

import { useFilterContext } from "./context/filter_context";

function App() {
  const { showFilters, stickyHeader, initializeFilters } = useFilterContext();

  return (
    <AuthWrapper>
      <Router>
        <MobileNav />
        <div
          className={
            showFilters && initializeFilters ? (
              "filters-hidden filters-wrapper"
            ) : !showFilters && initializeFilters ? (
              "filters-visible filters-wrapper"
            ) : (
              "filters-wrapper filters-initial-hidden"
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
    </AuthWrapper>
  );
}

export default App;
