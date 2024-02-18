import { useEffect } from "react";
import classNames from "classnames";
import styles from "./calendar.module.scss";

export const Calendar = () => {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div
      className={classNames("calendly-inline-widget", styles.calendlyWidget)}
      data-url="https://calendly.com/cameronbrill"
    />
  );
};
