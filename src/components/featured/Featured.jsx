import React from 'react'
import styles from './featured.module.css';
import Image from 'next/image';
import Link from 'next/link';

const getData = async () => {
  const res = await fetch(`${process.env.URL}/api/featured`,{
    cache: "no-store"
  });

  if(!res.ok){
    throw new Error("Failed")
  }
  return res.json();
}

async function Featured() {

  const data = await getData();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}><b>The Journal -</b> A Place to Express Yourself</h1>

      <div className={styles.post}>
        <div className={styles.imgContainer}>
          <Image src={data.img} alt='' fill sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' className={styles.image} priority />
        </div>

        <div className={styles.textContainer}>
          <Link href={`/posts/${data?.slug}`} shallow><h2 className={styles.postTitle}>{data?.title}</h2></Link>
          <p className={styles.postDesc} dangerouslySetInnerHTML={{ __html: data?.desc?.substring(0, 250)+'...' }}></p>
          <Link href={`/posts/${data?.slug}`} className={styles.button} shallow>Read More</Link>
        </div>
      </div>
    </div>
  )
}

export default Featured