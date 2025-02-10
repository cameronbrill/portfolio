"use client";

import { useKBar } from "kbar";
import React, { useEffect } from "react";

import styles from "./page.module.scss";

const isMobile = (): boolean => {
  let hasTouchScreen = false;

  if ("maxTouchPoints" in navigator) {
    hasTouchScreen = navigator.maxTouchPoints > 0;
  } else if ("msMaxTouchPoints" in navigator) {
    // @ts-ignore
    hasTouchScreen = navigator.msMaxTouchPoints > 0;
  } else {
    // @ts-ignore
    const mQ = window.matchMedia && matchMedia("(pointer:coarse)");
    if (mQ && mQ.media === "(pointer:coarse)") {
      hasTouchScreen = !!mQ.matches;
    } else if ("orientation" in window) {
      hasTouchScreen = true; // deprecated, but good fallback
    } else {
      // Only as a last resort, fall back to user agent sniffing
      hasTouchScreen =
        /\b(BlackBerry|webOS|iPhone|IEMobile|Android|Windows Phone|iPad|iPod)\b/i.test(
          // @ts-ignore
          navigator.userAgent,
        );
    }
  }
  return hasTouchScreen;
};

const getTriggerMessage = () => {
  if (isMobile()) {
    return "Tap anywhere";
  }
  if (navigator.userAgent.includes("Mac")) {
    return "⌘+K";
  }
  return "ctrl+K";
};

const Home = () => {
  const [triggerMessage, setTriggerMessage] = React.useState<string>("");

  useEffect(() => {
    setTriggerMessage(getTriggerMessage());
  }, []);

  const { query } = useKBar();

  const shouldAllowNonKeyboardInteractivity = isMobile();

  const handleClick = () => {
    if (shouldAllowNonKeyboardInteractivity) {
      query.toggle();
    }
  };

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: keyboard interactivity is handled by KBar
    <div
      role="heading"
      aria-level={1}
      className={styles.cta}
      onClick={handleClick}
    >
      {triggerMessage}
    </div>
  );
};

export default Home;
