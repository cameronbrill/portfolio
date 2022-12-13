"use client";
import React, { useEffect, useRef, useState } from "react";
import { Modal } from "antd";

import styles from "./Resume.module.scss";
import classNames from "classnames";
import type PSPDFKit from "pspdfkit";

interface MaskProps {
  onClick: () => void;
  children?: React.ReactNode;
  className?: string;
}
export const Mask = ({ onClick, children, className }: MaskProps) => {
  return (
    <div onClick={onClick} className={classNames(styles.mask, className)}>
      {children}
    </div>
  );
};

interface ResumeProps {
  visible: boolean;
}

export const Resume = ({ visible }: ResumeProps) => {
  const { height, width } = useWindowSize();
  //   const [renderHeight, setRenderHeight] = useState<number>(-1);
  //   const [renderWidth, setRenderWidth] = useState<number>(-1);
  //
  //   useEffect(() => {
  //     if (height && width) {
  //       if (height / width > 11 / 8.5) {
  //         setRenderHeight((width * 0.9 * 11) / 8.5);
  //         setRenderWidth(width * 0.9);
  //       } else {
  //         setRenderHeight(height * 0.9);
  //         setRenderWidth((height * 0.9 * 8.5) / 11);
  //       }
  //     }
  //   }, [height, width, setRenderHeight, setRenderWidth]);
  const viewer = useRef(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    if (!run) {
      setRun(true);
      const container = viewer.current;
      let pdfKit: typeof PSPDFKit;

      (async function () {
        pdfKit = await import("pspdfkit");

        if (pdfKit) {
          pdfKit.unload(container);
        }

        await pdfKit.load({
          container,
          document: "/cameron_brill_resume.pdf",
          baseUrl: `${window.location.protocol}//${window.location.host}/`,
        });
      })();

      return () => pdfKit && pdfKit.unload(container);
    }
  }, [setRun, run]);

  return (
    <>
      {visible && (
        <Modal
          closable={false}
          footer={null}
          className={styles.modal}
          visible={visible}
        >
          <main className={styles.modalContent}>
            <div
              ref={viewer}
              style={{ height: "100vh" }}
              className={styles.document}
            />
          </main>
        </Modal>
      )}
    </>
  );
};

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: -1,
    height: -1,
  });

  useEffect(() => {
    // only execute all the code below in client side
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}
