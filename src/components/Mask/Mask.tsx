import classNames from "classnames";
import React from "react";
import styles from "./mask.module.scss";

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
      aria-hidden="true"
    >
      {children}
    </div>
  );
};
