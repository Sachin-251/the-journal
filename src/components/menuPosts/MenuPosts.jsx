import React from 'react'
import styles from './menuPosts.module.css';
import Link from 'next/link';
import Image from 'next/image';

const getData = async () => {
    const res = await fetch(`${process.env.URL}/api/posts/editorchoice`,{cache: "no-store"});
  
    if(!res.ok){
      throw new Error("Failed")
    }
    return res.json();
  }

const MenuPosts = async () => {

    const posts = await getData();

  return (
    <>
        <div className={styles.items}>
            {
                posts?.map(post => (
                    <Link href={`/posts/${post?.slug}`} className={styles.item} key={post?._id} shallow>
                        <div className={styles.imageContainer}>
                            <Image src={post?.img} alt='' fill sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' className={styles.image} />
                        </div>

                        <div className={styles.textContainer}>
                            <span className={`${styles.category} ${styles.travel}`}>{post?.catSlug}</span>
                            <h3 className={styles.postTitle}>{post?.title}</h3>
                            <div className={styles.detail}>
                                <span className={styles.date}>{post.createdAt.substring(0,10)}</span>
                            </div>
                        </div>
                    </Link>
                ))
            }
            
        </div>
    </>
  )
}

export default MenuPosts