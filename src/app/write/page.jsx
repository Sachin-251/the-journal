"use client";
import React, { Suspense, useEffect, useState } from 'react'
import styles from './writePage.module.css';
import Image from 'next/image';
import "react-quill/dist/quill.snow.css";
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
  } from "firebase/storage";
import { app } from '@/utils/firebase';
import dynamic from 'next/dynamic';
import Loader from '@/components/loader/Loader';
import CategoriesOptions from '@/components/categoriesOptions/CategoriesOptions';
import toast from 'react-hot-toast';
import AddCategory from '@/components/addCategory/AddCategory';

const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, false] }],
      ['bold', 'italic', 'underline','strike'],
      ['blockquote', 'code-block'],

      [{ 'header': 1 }, { 'header': 2 }],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      [{ 'direction': 'rtl' }],

      [{ 'background': [] }],        
      [{ 'align': [] }],
      ['link', 'image', 'video'],
      ['clean']
    ]
  }

 const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'blockquote', 'code-block',
    'header',
    'list', 'bullet', 'indent',
    'direction',
    'background',
    'align',
    'link', 'image', 'video',
  ];
  

const ReactQuill = dynamic(() => import('react-quill'),{ssr: false});

const WritePage = () => {
    const { status } = useSession();
    const router = useRouter();

    const [file, setFile] = useState(null);
    const [media, setMedia] = useState("");
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    const [title, setTitle] = useState("");
    const [catSlug, setCatSlug] = useState("");
    // const [newCat, setNewCat] = useState("");
    // const [catList, setCatList] = useState([]);
    console.log(catSlug);

    useEffect(() => {
        const storage = getStorage(app);
        const upload = () => {
            const name = new Date().getTime() + file.name;
            const storageRef = ref(storage, name);

            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                switch (snapshot.state) {
                    case "paused":
                    console.log("Upload is paused");
                    break;
                    case "running":
                    console.log("Upload is running");
                    break;
                }
                },
                (error) => {},
                () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setMedia(downloadURL);
                });
                }
            );
        }

        file && upload();
    }, [file])


    if(status === "loading"){
        return <div className={styles.loading}>Loading...</div>
    }
    if(status === "unauthenticated"){
        router.push("/");
    }

    const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const handleSubmit = async () => {
        const res = await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
            title,
            desc: value,
            img: media,
            slug: slugify(title),
            catSlug: catSlug || "style", //If not selected, choose the general category
        }),
        });

        if (res.status === 200) {
        const data = await res.json();
        router.push(`/posts/${data.slug}`);
        }
    };

    // const getData = () => {
    //     return fetch('/api/categories')
    //         .then((res) => res.json())
    //         .then((d) => setCatList(d))
    // }

    // useEffect(() => {
    //     getData();
    // },[catList]);

    // const handleAddCategory = async () => {
    //     const res = await fetch("/api/categories", {
    //         method: "POST",
    //         body: JSON.stringify({
    //             slug: slugify(newCat),
    //             title: newCat,
    //             img: '/technology.png'
    //         }),
    //     });

    //     if(res.status === 402){
    //         toast.error("Category already exist");
    //     }

    //     if(res.status === 200){
    //         setNewCat("");
    //         const data = await res.json();
    //         console.log(data);
    //         toast.success("Category Created");
    //     }
    // }

  return (
    <Suspense fallback={<Loader />}>
    <div className={styles.container}>
        <input type="text" placeholder='Title' className={styles.input} onChange={(e) => setTitle(e.target.value)} />
        
        <AddCategory setCatSlug={setCatSlug} />
        
        <div className={styles.editor}>
            <div>
            <button className={styles.button} onClick={() => setOpen(!open)}>
                <Image src='/plus.png' alt='' width={16} height={16} />
            </button>
            {open && (
                <div className={styles.add}>
                    <input
                        type="file"
                        id="image"
                        onChange={(e) => setFile(e.target.files[0])}
                        style={{ display: "none" }}
                    />
                    <button title='Add Featured Image' className={styles.addButton}>
                        <label htmlFor="image" style={{cursor: "pointer"}}>
                            <Image src='/image.png' alt='' width={16} height={16} />
                        </label>
                    </button>
                    <button className={styles.addButton}>
                        <Image src='/external.png' alt='' width={16} height={16} />
                    </button>
                    <button className={styles.addButton}>
                        <Image src='/video.png' alt='' width={16} height={16} />
                    </button>
                </div>
            )}
            </div>
            <ReactQuill className={styles.descArea} theme='snow' modules={modules} formats={formats} value={value} onChange={setValue} placeholder='Tell your story...' />
        </div>

        <button className={styles.publish} onClick={handleSubmit}>Publish</button>
    </div>
    </Suspense>
  )
}

export default WritePage