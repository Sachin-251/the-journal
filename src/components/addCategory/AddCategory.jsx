"use client";
import React, { useEffect, useState } from 'react';
import styles from './addCategory.module.css';
import toast from 'react-hot-toast';

const AddCategory = ({setCatSlug}) => {

    const [newCat, setNewCat] = useState("");
    const [catList, setCatList] = useState([]);

    const getData = async () => {
        return await fetch('/api/categories')
            .then((res) => res.json())
            .then((d) => d.sort(function(a,b){
                return (a.title > b.title) - (a.title < b.title);
            }))
            .then((data) => setCatList(data))
    }

    const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const handleAddCategory = async () => {
        const res = await fetch("/api/categories", {
            method: "POST",
            body: JSON.stringify({
                slug: slugify(newCat),
                title: newCat,
                img: '/technology.png'
            }),
        });

        if(res.status === 402){
            toast.error("Category already exist");
        }

        if(res.status === 200){
            setNewCat("");
            const data = await res.json();
            console.log(data);
            toast.success("Category Created");
        }
    }

    useEffect(() => {
        getData();
    },[catList]);


  return (
    <div className={styles.selectCategory}>
        <select className={styles.select} onChange={(e) => setCatSlug(e.target.value)}>
            <option value="">Category</option>
            {
                catList?.map((category) => (
                    <option value={category.slug}>{category.title}</option>
                ))
            }
            {/* <option value="technology">Technology</option>
            <option value="fashion">Fashion</option>
            <option value="food">Food</option>
            <option value="culture">Culture</option>
            <option value="travel">Travel</option>
            <option value="coding">Coding</option> */}
        </select>
        <p>OR</p>
        <input type='text' placeholder='Add Category' value={newCat} onChange={(e) => {setNewCat(e.target.value)}}/>
        <button onClick={handleAddCategory}>Add Category</button>
    </div>
  )
}

export default AddCategory