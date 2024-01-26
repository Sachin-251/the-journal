import React from 'react'

const getData = async () => {
    const res = await fetch(`http://localhost:3000/api/categories`,{
      cache: "no-store"
    });
  
    if(!res.ok){
      throw new Error("Failed")
    }
    return res.json();
  }

const CategoriesOptions = async () => {

    const categories = await getData();

  return (
    <>
        <option value="">Category</option>
        {
            categories?.map((category) => (
                <option key={category?.id} value={category?.slug}>{category?.title}</option>
            ))
        }
    </>
  )
}

export default CategoriesOptions