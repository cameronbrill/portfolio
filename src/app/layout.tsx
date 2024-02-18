import type { ReactNode } from "react";
import "./styles.scss";
import { H } from "highlight.run";
import LogRocket from "logrocket";
import KBar from "@Components/KBar/KBar";
import styles from "./layout.module.scss";

H.init(process.env.REACT_APP_HIGHLIGHT_PROJ_ID, {
  environment: process.env.NODE_ENV,
  enableCanvasRecording: true,
});
LogRocket.init(`${process.env.REACT_APP_LOG_ROCKET_PROJ_ID}`);

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <KBar />
      <head />
      <body>
        <div>
          <main>
            <div className={styles.content}>{children}</div>
          </main>
          <div className={styles.name}>cameron brill</div>
        </div>
      </body>
    </html>
  );
}
