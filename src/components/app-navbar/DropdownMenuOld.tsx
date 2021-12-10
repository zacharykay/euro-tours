import { useState, useEffect, useRef, MutableRefObject } from "react";
import { CSSTransition } from "react-transition-group";

import { ReactComponent as Settings } from "../../icons/settings.svg";
import { ReactComponent as GoForward } from "../../icons/go-forward.svg";
import { ReactComponent as GoBack } from "../../icons/go-back.svg";
import { ReactComponent as User } from "../../icons/user.svg";
import { ReactComponent as Language } from "../../icons/translate.svg";
import { ReactComponent as Puzzle } from "../../icons/puzzle.svg";

import DropdownItem from "./DropdownItem";

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

  interface DropdownItems {}

  interface DropdownSection {
    menuName: string;
    primaryMenu: boolean;
    dropdownItems: DropdownItems;
  }

  return (
    <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
      <CSSTransition
        in={activeMenu === "main"}
        unmountOnExit
        timeout={500}
        classNames="menu-primary"
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem leftIcon={<User />}>My Profile</DropdownItem>
          <DropdownItem
            leftIcon={<Settings />}
            rightIcon={<GoForward />}
            goToMenu="settings"
            setActiveMenu={setActiveMenu}
          >
            Settings
          </DropdownItem>
          <DropdownItem
            leftIcon={<Language />}
            rightIcon={<GoForward />}
            goToMenu="languages"
            setActiveMenu={setActiveMenu}
          >
            Languages
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "settings"}
        unmountOnExit
        timeout={500}
        classNames="menu-secondary"
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem
            leftIcon={<GoBack />}
            goToMenu="main"
            setActiveMenu={setActiveMenu}
          >
            Go Back
          </DropdownItem>
          <DropdownItem leftIcon={<Puzzle />}>HTML</DropdownItem>
          <DropdownItem leftIcon={<Puzzle />}>CSS</DropdownItem>
          <DropdownItem leftIcon={<Puzzle />}>JavaScript</DropdownItem>
          <DropdownItem leftIcon={<Puzzle />}>React</DropdownItem>
          <DropdownItem leftIcon={<Puzzle />}>Next.js</DropdownItem>
        </div>
      </CSSTransition>
      <CSSTransition
        in={activeMenu === "languages"}
        unmountOnExit
        timeout={500}
        classNames="menu-secondary"
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem
            leftIcon={<GoBack />}
            goToMenu="main"
            setActiveMenu={setActiveMenu}
          >
            Go Back
          </DropdownItem>
          <DropdownItem leftIcon={<Language />}>English</DropdownItem>
          <DropdownItem leftIcon={<Language />}>Spanish</DropdownItem>
          <DropdownItem leftIcon={<Language />}>French</DropdownItem>
          <DropdownItem leftIcon={<Language />}>German</DropdownItem>
          <DropdownItem leftIcon={<Language />}>Dutch</DropdownItem>
          <DropdownItem leftIcon={<Language />}>Japanese</DropdownItem>
          <DropdownItem leftIcon={<Language />}>Italian</DropdownItem>
          <DropdownItem leftIcon={<Language />}>Arabic</DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "main"}
        unmountOnExit
        timeout={500}
        classNames="menu-primary"
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem leftIcon={<User />}>My Profile</DropdownItem>
          <DropdownItem
            leftIcon={<Settings />}
            rightIcon={<GoForward />}
            goToMenu="settings"
            setActiveMenu={setActiveMenu}
          >
            Settings
          </DropdownItem>
          <DropdownItem
            leftIcon={<Language />}
            rightIcon={<GoForward />}
            goToMenu="languages"
            setActiveMenu={setActiveMenu}
          >
            Languages
          </DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === "settings"}
        unmountOnExit
        timeout={500}
        classNames="menu-secondary"
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem
            leftIcon={<GoBack />}
            goToMenu="main"
            setActiveMenu={setActiveMenu}
          >
            Go Back
          </DropdownItem>
          <DropdownItem leftIcon={<Puzzle />}>HTML</DropdownItem>
          <DropdownItem leftIcon={<Puzzle />}>CSS</DropdownItem>
          <DropdownItem leftIcon={<Puzzle />}>JavaScript</DropdownItem>
          <DropdownItem leftIcon={<Puzzle />}>React</DropdownItem>
          <DropdownItem leftIcon={<Puzzle />}>Next.js</DropdownItem>
        </div>
      </CSSTransition>
      <CSSTransition
        in={activeMenu === "languages"}
        unmountOnExit
        timeout={500}
        classNames="menu-secondary"
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem
            leftIcon={<GoBack />}
            goToMenu="main"
            setActiveMenu={setActiveMenu}
          >
            Go Back
          </DropdownItem>
          <DropdownItem leftIcon={<Language />}>English</DropdownItem>
          <DropdownItem leftIcon={<Language />}>Spanish</DropdownItem>
          <DropdownItem leftIcon={<Language />}>French</DropdownItem>
          <DropdownItem leftIcon={<Language />}>German</DropdownItem>
          <DropdownItem leftIcon={<Language />}>Dutch</DropdownItem>
          <DropdownItem leftIcon={<Language />}>Japanese</DropdownItem>
          <DropdownItem leftIcon={<Language />}>Italian</DropdownItem>
          <DropdownItem leftIcon={<Language />}>Arabic</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
};

export default DropdownMenu;
