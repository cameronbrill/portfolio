import {
  Action,
  KBarAnimator,
  KBarPortal,
  KBarPositioner,
  KBarProvider,
  KBarResults,
  KBarSearch,
  useMatches,
} from "kbar";
import { Document, Page, pdfjs } from "react-pdf";

import { H } from "highlight.run";
import { NO_GROUP } from "kbar/lib/useMatches";
import React, { useState } from "react";

import styles from "./App.module.scss";
import classNames from "classnames";

import { message, Modal } from "antd";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const RenderResults = () => {
  const groups = useMatches();
  const flattened = React.useMemo(
    () =>
      groups.reduce((acc: any[], curr) => {
        acc.push(curr.name);
        acc.push(...curr.actions);
        return acc;
      }, []),
    [groups]
  );

  return (
    <KBarResults
      items={flattened.filter((i) => i !== NO_GROUP)}
      onRender={({ item, active }) =>
        typeof item === "string" ? (
          <div className={styles.groupName}>{item}</div>
        ) : (
          <ResultItem action={item} active={active} />
        )
      }
    />
  );
};
const ResultItem = React.forwardRef(
  (
    {
      action,
      active,
    }: {
      action: Action;
      active: boolean;
    },
    ref: React.Ref<HTMLDivElement>
  ) => {
    return (
      <div
        ref={ref}
        className={classNames(
          { [styles.resultItemActive]: active },
          styles.resultItem
        )}
      >
        <div className={styles.resultItemIcon}>
          {action.icon && action.icon}
          <div className={styles.resultItemIconSubtitle}>
            <span>{action.name}</span>
            {action.subtitle && (
              <span style={{ fontSize: 12 }}>{action.subtitle}</span>
            )}
          </div>
        </div>
        {action.shortcut?.length ? (
          <div className={styles.resultItemShortCut}>
            {action.shortcut.map((sc: any) => (
              <kbd key={sc}>{sc}</kbd>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
);

const getOs = () => {
  if (navigator.userAgent.includes("Mac")) {
    return "⌘+K";
  }
  return "ctrl+K";
};

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const onOk = () => setShowModal(false);
  const onCancel = () => setShowModal(false);

  const actions = [
    {
      id: "resume",
      name: "Resume",
      shortcut: ["r"],
      keywords: "experience jobs",
      perform: () => {
        setShowModal(true);
        H.track("kbar-selected-resume");
      },
    },
    {
      id: "email",
      name: "Email",
      shortcut: ["e"],
      keywords: "contact",
      perform: () => {
        /* just copy my email to clipboard */
        navigator.clipboard.writeText("contact@cameronbrill.me");
        message.success({
          content: "copied email to clipboard",
          duration: 3,
          style: {
            key: "key",
            top: 0,
            paddingTop: "3vh",
            position: "absolute",
            width: "100vw",
            textAlign: "-webkit-center",
          },
        });
        H.track("kbar-selected-email");
        setTimeout(() => {
          //Start the timer
          message.destroy("key");
        }, 3000);
      },
    },
    {
      id: "snowboarding",
      name: "Snowboarding",
      shortcut: ["s"],
      keywords: "snow",
      perform: () => {
        window.open(
          "https://www.youtube.com/channel/UC12W_hVgvbhF0kEn3sf7ECA",
          "_blank"
        );
        H.track("kbar-selected-snowboarding");
      },
    },
    {
      id: "github",
      name: "Github",
      shortcut: ["g"],
      keywords: "social professional",
      section: "Social Media",
      perform: () => {
        window.open("https://github.com/cameronbrill", "_blank");
        H.track("kbar-selected-github");
      },
    },
    {
      id: "devpost",
      name: "Devpost",
      shortcut: ["d"],
      keywords: "social professional",
      section: "Social Media",
      perform: () => {
        window.open("https://devpost.com/cameronbrill", "_blank");
        H.track("kbar-selected-devpost");
      },
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      shortcut: ["l"],
      keywords: "social professional",
      section: "Social Media",
      perform: () => {
        window.open("https://www.linkedin.com/in/cameronbrill/", "_blank");
        H.track("kbar-selected-linkedin");
      },
    },
  ];

  const [numPages, setNumPages] = useState<number>(0);
  const onDocumentLoadSuccess = (pdf: { numPages: number }) => {
    setNumPages(pdf.numPages);
  };

  return (
    <>
      <Modal
        destroyOnClose
        maskClosable
        closable={false}
        footer={null}
        className={styles.modal}
        visible={showModal}
        onCancel={onCancel}
        onOk={onOk}
      >
        <main className={styles.modalContent}>
          <Document
            file={`https://raw.githubusercontent.com/cameronbrill/public/main/resume/cameron_brill_resume.pdf`}
            className={styles.resume}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
        </main>
      </Modal>
      <KBarProvider actions={actions}>
        <KBarPortal>
          <KBarPositioner>
            <KBarAnimator className={styles.animator}>
              <KBarSearch
                className={styles.search}
                placeholder="Type a command or search..."
              />
              <RenderResults />
            </KBarAnimator>
          </KBarPositioner>
        </KBarPortal>
        <div className={styles.text}>{getOs()}</div>
      </KBarProvider>
      <div className={styles.name}>cameron brill</div>
    </>
  );
};

export default App;
