"use client";
import React from 'react'
import styles from './card.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

function Card({key, item, name}) {
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{once:true, amount:0.5}} transition={{duration:0.5}} variants={{hidden:{opacity: 0, y: 50}, visible:{opacity: 1, y: 0}}} className={styles.container} key={key}>
            <div className={styles.imageContainer}>
                <Image src={item.img} alt='' fill className={styles.image}/>
            </div>
            <div className={styles.textContainer}>
                <div className={styles.detail}>
                    <span className={styles.date}>{item.createdAt.substring(0, 10)} -{" "}</span>
                    <span className={styles.category}>{item.catSlug}</span>
                    <span style={{color: 'orange'}}> - {item?.user?.name || name}</span>
                </div>

                <Link href={`/posts/${item.slug}`} shallow>
                    <h1>{item.title}</h1>
                </Link>
                <p className={styles.desc} dangerouslySetInnerHTML={{ __html: item?.desc.substring(0, 170)+'...' }}></p>

                <Link className={styles.link} href={`/posts/${item.slug}`} shallow>Read More</Link>
            </div>
    </motion.div>
  )
}

export default Card