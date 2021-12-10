import { FC, ReactElement, SetStateAction, Dispatch } from "react";

import "./navbar.scss";

interface Props {
  leftIcon?: ReactElement | FC | string | number | null | undefined;
  rightIcon?: ReactElement | FC | string | number | null | undefined;
  goToMenu?: string;
  setActiveMenu?: Dispatch<SetStateAction<string>>;
}

const DropdownItem: FC<Props> = (props) => {
  const { setActiveMenu } = props;
  return (
    <div>
      <a
        href="#"
        className="menu-item"
        onClick={() => props.goToMenu && setActiveMenu && setActiveMenu(props.goToMenu)}
      >
        {props.leftIcon && (
          <span className="icon-button icon-left">{props.leftIcon}</span>
        )}
        {props.children}
        {props.rightIcon && <span className="icon-right">{props.rightIcon}</span>}
      </a>
    </div>
  );
};

export default DropdownItem;
