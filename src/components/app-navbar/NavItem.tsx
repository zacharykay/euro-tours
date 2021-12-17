import { FC, ReactElement, useState } from "react";
import { useFilterContext } from "../../context/filter_context";

import "./navbar.scss";

interface Props {
  icon?: string | number | ReactElement;
  linkUrl?: string;
  filterIcon?: boolean;
}

const NavItem: FC<Props> = ({ icon, children, filterIcon, linkUrl }) => {
  const [ open, setOpen ] = useState(false);

  const { toggleFiltersMenu } = useFilterContext();

  return (
    <li className="nav-item">
      <a
        href={linkUrl ? linkUrl : "#"}
        className="icon-button"
        onClick={() => {
          if (filterIcon) {
            toggleFiltersMenu();
          }
          setOpen(!open);
        }}
      >
        {icon}
      </a>

      {open && children}
    </li>
  );
};

export default NavItem;
