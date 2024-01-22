import React from 'react';
import styles from './loader.module.css';

const Loader = () => {
  return (
    <div className={styles.container}>
    <div className={styles.loader}>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
    </div>
    </div>
  )
}

export default Loader