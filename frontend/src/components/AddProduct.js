import React, { useEffect, useState } from "react";

const AddProduct = () => {
  let [name, setName] = useState();
  let [price, setPrice] = useState();
  let [category, setCategory] = useState();
  let [company, setCompany] = useState();
  let [error, setError] = useState(false);

  const addProduct = async () => {
    if (!name || !price || !category || !company) {
      setError(true);
      return false;
    }

    console.log(name, price, category, company);
    let auth = JSON.parse(localStorage.getItem("user"));
    console.log(auth._id);
    let data = await fetch("http://localhost:5000/add-product", {
      method: "post",
      body: JSON.stringify({
        userId: auth._id,
        name,
        price,
        category,
        company,
      }),
      headers: { "Content-Type": "application/json" },
    });
    data = JSON.stringify(data);
    console.warn(data);
    alert("Product added Successfully");
  };
  return (
    <div className="addproduct">
      <h1>Add Product</h1>
      <div className="inputs">
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder="enter product name"
        />
        {!name && error && (
          <span className="error">Enter valid product name</span>
        )}
        <input
          type="number"
          onChange={(e) => setPrice(e.target.value)}
          placeholder="enter product price (in $)"
        />
        {!price && error && (
          <span className="error">Enter valid product price</span>
        )}

        <input
          type="text"
          onChange={(e) => setCategory(e.target.value)}
          placeholder="enter product category"
        />
        {!category && error && (
          <span className="error">Enter valid product category</span>
        )}

        <input
          type="text"
          onChange={(e) => setCompany(e.target.value)}
          placeholder="enter product company"
        />
        {!company && error && (
          <span className="error">Enter valid product company</span>
        )}
      </div>
      <button onClick={addProduct}>Add Product</button>
    </div>
  );
};

export default AddProduct;
