import classNames from "classnames";
import type React from "react";

import styles from "./Mask.module.scss";

interface MaskProps {
  onClick: () => void;
  children?: React.ReactNode;
  className?: string;
}
export const Mask = ({ onClick, children, className }: MaskProps) => {
  return (
    <div
      onClick={onClick}
      onKeyUp={onClick}
      className={classNames(styles.mask, className)}
    >
      {children}
    </div>
  );
};
