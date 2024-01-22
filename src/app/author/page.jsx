import React, { Suspense } from 'react'
import styles from './author.module.css';
import Menu from '@/components/Menu/Menu';
import Loader from '@/components/loader/Loader';
import Pagination from '@/components/pagination/Pagination';
import Card from '@/components/card/Card';

const getData = async (posId) => {
    const res = await fetch(`http://localhost:3000/api/author?postId=${posId}`,{
      cache: "no-store"
    });
  
    if(!res.ok){
      throw new Error("Failed")
    }
  
    return res.json();
  }

const AuthorPage = async ({searchParams}) => {

  const page = parseInt(searchParams.page) || 1;
  const { name, postId } = searchParams;
  const data = await getData(postId);

  return (
    <Suspense fallback={<Loader />}>
    <div className={styles.container}>
        <h1 className={styles.title}>Author: {name}</h1>
        <div className={styles.content}>
            
        <div className={styles.container}>
        <div className={styles.posts}>
            {
            data?.map((item) => (
                <Card item={item} key={item._id} />
            ))
            }
        </div>
        </div>

        <Menu />
        </div>
    </div>
    </Suspense>
  )
}

export default AuthorPage