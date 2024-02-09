import React, { Suspense } from 'react';
import styles from './singlePage.module.css';
import Menu from '@/components/Menu/Menu';
import Image from 'next/image';
import Comments from '@/components/comments/Comments';
import Loader from '@/components/loader/Loader';
import Link from 'next/link';

const getData = async (slug) => {
    const res = await fetch(`${process.env.URL}/api/posts/${slug}`,{
      cache: "no-store"
    });
  
    if(!res.ok){
      throw new Error("Failed")
    }
    return res.json();
  }

const SinglePage = async ({params}) => {

    const { slug } = params;
    const data = await getData(slug);

  return (
    <Suspense fallback={<Loader />}>
    <div className={styles.container}>
        <div className={styles.infoContainer}>
            <div className={styles.textContainer}>
                <h1 className={styles.title}>{data?.title}</h1>
                <div className={styles.user}>
                    {data?.user?.image && (
                        <div className={styles.userImageContainer}>
                            <Image src={data.user.image} alt='' fill sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' className={styles.avatar} priority />
                        </div>
                    )}
                    
                    <div className={styles.userTextContainer}>
                        <Link href={`/author?name=${data?.user?.name}&postId=${data?.id}`} shallow>
                            <span className={styles.username}>{data?.user?.name}</span>
                        </Link>
                        
                        <span className={styles.date}>{data?.createdAt.substring(0, 10)}</span>
                    </div>
                </div>
            </div>
            <div className={styles.imageContainer}>
                <Image src={data?.img} alt='' fill sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' className={styles.image} />
            </div>
        </div>

        <div className={styles.content}>
            <div className={styles.post}>
                <div className={styles.description} dangerouslySetInnerHTML={{ __html: data?.desc }}></div>

                <div className={styles.comment}>
                    <Comments postSlug={slug} />
                </div>
            </div>

            <Menu />
        </div>
    </div>
    </Suspense>
  )
}

export default SinglePage