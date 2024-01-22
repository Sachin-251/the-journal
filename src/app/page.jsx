import Featured from "@/components/featured/Featured";
import styles from "./homepage.module.css";
import CategoryList from "@/components/categoryList/CategoryList";
import CardList from "@/components/cardList/CardList";
import Menu from "@/components/Menu/Menu";
import { Suspense } from "react";
import Loader from "@/components/loader/Loader";

export default function Home({searchParams}) {

  const page = parseInt(searchParams.page) || 1;

  return (
    <div className={styles.container}>
      <Suspense fallback={<Loader />}>
      <Featured />
      <CategoryList />
      <div className={styles.content}>
        <CardList page={page} />
        <Menu />
      </div>
      </Suspense>
    </div>
  );
}
