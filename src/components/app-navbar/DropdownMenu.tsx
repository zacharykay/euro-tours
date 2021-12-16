import {
  SetStateAction,
  ReactElement,
  useState,
  useEffect,
  useRef,
  MutableRefObject,
} from "react";
import { CSSTransition } from "react-transition-group";

import { ReactComponent as SettingsIcon } from "../../icons/settings.svg";
import { ReactComponent as GoForwardIcon } from "../../icons/go-forward.svg";
import { ReactComponent as GoBackIcon } from "../../icons/go-back.svg";
import { ReactComponent as UserIcon } from "../../icons/user.svg";
import { ReactComponent as LanguageIcon } from "../../icons/translate.svg";
import { ReactComponent as PuzzleIcon } from "../../icons/puzzle.svg";
import { ReactComponent as KeyIcon } from "../../icons/key.svg";
import {
  Settings,
  GoForward,
  GoBack,
  User,
  Language,
  Puzzle,
  Key,
} from "./dropdownConfig";

import DropdownItem from "./DropdownItem";
import { dropdownMenu as DropdownConfig } from "./dropdownConfig";

import "./navbar.scss";

const DropdownMenu = () => {
  const [ activeMenu, setActiveMenu ] = useState("main");
  const [ menuHeight, setMenuHeight ] = useState(0);
  const dropdownRef: MutableRefObject<any> = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current.firstChild.offsetHeight);
  }, []);

  const calcHeight = (el: any) => {
    const height: any = el.offsetHeight;
    setMenuHeight(height);
  };

  const assignComponent = (comp: string | undefined): ReactElement | null => {
    return comp === Settings ? (
      <SettingsIcon />
    ) : comp === GoForward ? (
      <GoForwardIcon />
    ) : comp === GoBack ? (
      <GoBackIcon />
    ) : comp === User ? (
      <UserIcon />
    ) : comp === Language ? (
      <LanguageIcon />
    ) : comp === Puzzle ? (
      <PuzzleIcon />
    ) : comp === Key ? (
      <KeyIcon />
    ) : null;
  };

  return (
    <div className="dropdown" style={{ height: menuHeight + 30 }} ref={dropdownRef}>
      {DropdownConfig.map((dropdown, index) => {
        const { dropdownItems } = dropdown;
        return (
          <CSSTransition
            key={index}
            in={activeMenu === dropdown.menuName}
            unmountOnExit
            timeout={500}
            classNames={dropdown.primaryMenu ? "menu-primary" : "menu-secondary"}
            onEnter={calcHeight}
          >
            <div className="menu">
              {dropdownItems.map((item, index) => {
                const componentIcon: string | undefined = item.linkIcon;
                const secondaryComponentIcon: string | undefined = item.secondaryIcon;

                return (
                  <DropdownItem
                    key={index}
                    setActiveMenu={
                      dropdown.primaryMenu || index === 0 ? setActiveMenu : undefined
                    }
                    leftIcon={assignComponent(componentIcon)}
                    rightIcon={assignComponent(secondaryComponentIcon)}
                    goToMenu={item.menuLink}
                  >
                    <a href={item.pageLink}>{item.text}</a>
                  </DropdownItem>
                );
              })}
            </div>
          </CSSTransition>
        );
      })}
    </div>
  );
};

export default DropdownMenu;
