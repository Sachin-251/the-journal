"use client";
import React, { Suspense } from 'react'
import styles from './loginPage.module.css';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Loader from '@/components/loader/Loader';

const LoginPage = () => {

  const {data,status} = useSession();
  const router = useRouter();
  
  if(status === "loading"){
    return <div className={styles.loading}>Loading...</div>
  }
  if(status === "authenticated"){
    router.push("/");
  }

  return (
    <Suspense fallback={<Loader />}>
    <div className={styles.container}>
        <div className={styles.wrapper}>
            <div className={styles.socialButton} onClick={() => signIn("google")}>Sign in with Google</div>
            <div className={styles.socialButton} onClick={() => signIn("github")}>Sign in with Github</div>
        </div>
    </div>
    </Suspense>
  )
}

export default LoginPage