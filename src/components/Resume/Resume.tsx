import React from "react";
import { Modal } from "antd";
import { pdfjs, Document, Page } from "react-pdf";

import styles from "./Resume.module.scss";
import classNames from "classnames";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

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
            <Document
              file={`https://raw.githubusercontent.com/cameronbrill/public/main/resume/cameron_brill_resume.pdf`}
              className={styles.document}
            >
              <Page
                key={`resume_page_1`}
                pageNumber={1}
                onClick={(e: { stopPropagation: () => any }) =>
                  e.stopPropagation()
                }
              />
            </Document>
          </main>
        </Modal>
      )}
    </>
  );
};
