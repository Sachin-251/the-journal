"use client";
import React, { useEffect, useState } from 'react'
import styles from './writePage.module.css';
import Image from 'next/image';
import ReactQuill, { Quill } from 'react-quill';
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
import ImageResize from 'quill-image-resize-module-react';

Quill.register('modules/imageResize', ImageResize);

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
    ],
    imageResize: {
        parchment: Quill.import('parchment'),
        modules: ['Resize', 'DisplaySize'],
    }
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
    'imageResize',
  ];

const WritePage = () => {

    const { status } = useSession();
    const router = useRouter();

    const [file, setFile] = useState(null);
    const [media, setMedia] = useState("");
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    const [title, setTitle] = useState("");
    const [catSlug, setCatSlug] = useState("");

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
    console.log(value);

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


  return (
    <div className={styles.container}>
        <input type="text" placeholder='Title' className={styles.input} onChange={(e) => setTitle(e.target.value)} />
        <select className={styles.select} onChange={(e) => setCatSlug(e.target.value)} required>
            <option value="">Category</option>
            <option value="style">style</option>
            <option value="fashion">fashion</option>
            <option value="food">food</option>
            <option value="culture">culture</option>
            <option value="travel">travel</option>
            <option value="coding">coding</option>
        </select>
        <div className={styles.editor}>
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
                    <button className={styles.addButton}>
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
            <ReactQuill className={styles.descArea} theme='snow' modules={modules} formats={formats} value={value} onChange={setValue} placeholder='Tell your story...' />
        </div>

        <button className={styles.publish} onClick={handleSubmit}>Publish</button>
    </div>
  )
}

export default WritePage