import React from 'react'
import styles from './menu.module.css';
import MenuPosts from '../menuPosts/MenuPosts';
import MenuCategories from '../menuCategories/MenuCategories';
import MenuPopular from '../menuPopular/MenuPopular';

function Menu() {
  return (
    <div className={styles.container}>
      <h2 className={styles.subtitle}>What&apos;s Hot</h2>
      <h1 className={styles.title}>Most Popular</h1>
      <MenuPopular />

    <div className={styles.sidebar}>
      <h2 className={styles.subtitle}>Discover by topic</h2>
      <h1 className={styles.title}>Categories</h1>
      <MenuCategories />

      <h2 className={styles.subtitle}>Chosen by the editor</h2>
      <h1 className={styles.title}>Editor&apos;s Pick</h1>
      <MenuPosts />
    </div>
      
    </div>
  )
}

export default Menu