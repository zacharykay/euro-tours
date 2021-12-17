import { FC } from "react";
import NavItem from "./NavItem";
import { ReactComponent as Filters } from "../../icons/filters.svg";
import { ReactComponent as Cart } from "../../icons/shopping-cart.svg";
import { ReactComponent as Home } from "../../icons/home.svg";
import { ReactComponent as Dots } from "../../icons/dots-circle.svg";

import "./navbar.scss";
import DropdownMenu from "./DropdownMenu";
// import DropdownMenuOld from "./DropdownMenuOld";

const AppNavbar: FC = (props) => {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <NavItem icon={<Home />} linkUrl={"/"} />
        <NavItem icon={<Cart />} />
        <NavItem icon={<Filters />} filterIcon />
        <NavItem icon={<Dots />}>
          <DropdownMenu />
        </NavItem>
      </ul>
    </nav>
  );
};

export default AppNavbar;
