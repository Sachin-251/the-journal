import React, { Suspense } from 'react'
import styles from './blogPage.module.css';
import CardList from '@/components/cardList/CardList';
import Menu from '@/components/Menu/Menu';
import Loader from '@/components/loader/Loader';

const BlogPage = ({searchParams}) => {

  const page = parseInt(searchParams.page) || 1;
  const { cat } = searchParams;

  return (
    <Suspense fallback={<Loader />}>
    <div className={styles.container}>
        <h1 className={styles.title}>Category: {cat}</h1>
        <div className={styles.content}>
            <CardList page={page} cat={cat} />
            <Menu />
        </div>
    </div>
    </Suspense>
  )
}

export default BlogPage