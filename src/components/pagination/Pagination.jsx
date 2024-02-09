"use client";
import React from 'react'
import styles from './pagination.module.css';
import { useRouter } from 'next/navigation';

function Pagination({page, hasPrev, hasNext}) {

  const router = useRouter();

  return (
    <div className={styles.container}>
      <button className={styles.button} disabled={!hasPrev} onClick={() => router.push(`?page=${page - 1}`, {shallow: true})}>Previous</button>
      <button className={styles.button} disabled={!hasNext} onClick={() => router.push(`?page=${page + 1}`,{shallow: true})}>Next</button>
    </div>
  )
}

export default Pagination