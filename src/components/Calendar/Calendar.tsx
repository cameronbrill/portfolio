import classNames from "classnames";
import { useEffect } from "react";

import styles from "./Calendar.module.scss";

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
