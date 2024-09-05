'use client'

import styles from "./page.module.css";
import Cards from "../src/components/Cards";
import ReadingList from "../src/components/ReadingList";

export default function Home() {
  return (
    <main className={styles.main}>
      <Cards />
    </main>
  );
}
