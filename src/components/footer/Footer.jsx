import React from 'react'
import styles from './footer.module.css';
import Image from 'next/image';
import Link from 'next/link';

function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.logo}>
          <Image src='/logo.png' alt='logo' width={50} height={50} />
          <h1 className={styles.logoText}>The Journal</h1>
        </div>

        <p className={styles.desc}>where words take flight and creativity finds its digital canvas. Our blogging platform is more than just a space to share thoughts; it's a vibrant community of storytellers, vandrers, tech enthusiasts, thinkers and what not.</p>

        <div className={styles.icons}>
          <Image src='/facebook.png' alt='facebook' width={18} height={18} />
          <Image src='/instagram.png' alt='instagram' width={18} height={18} />
          <Image src='/linkedin.png' alt='linkedin' width={18} height={18} />
          <Image src='/youtube.png' alt='youtube' width={18} height={18} />
        </div>
      </div>

      <div className={styles.links}>
        <div className={styles.list}>
          <span className={styles.listTitle}>Links</span>
          <Link href='/'>Home</Link>
          <Link href='/'>Blogs</Link>
          <Link href='/'>About</Link>
          <Link href='/'>Contact</Link>
        </div>

        <div className={styles.list}>
          <span className={styles.listTitle}>Tags</span>
          <Link href='/'>Travel</Link>
          <Link href='/'>Fashion</Link>
          <Link href='/'>Coding</Link>
          <Link href='/'>Culture</Link>
        </div>

        <div className={styles.list}>
          <span className={styles.listTitle}>Social</span>
          <Link href='/'>Facebook</Link>
          <Link href='/'>Instagram</Link>
          <Link href='/'>LinkedIn</Link>
          <Link href='/'>Youtube</Link>
        </div>
      </div>
    </div>
  )
}

export default Footer