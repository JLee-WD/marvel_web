'use client'

import styles from "./page.module.css";
import Cards from "../components/Cards";
import ReadingList from "../components/ReadingList";

export default function Home() {
  return (
    <main className={styles.main}>
      <ReadingList />
      <Cards />
    </main>
  );
}
