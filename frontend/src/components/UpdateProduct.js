import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  let [name, setName] = useState("");
  let [price, setPrice] = useState("");
  let [category, setCategory] = useState("");
  let [company, setCompany] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    console.warn(params);
    let result = await fetch(`http://localhost:5000/delete/${params.id}`);
    result = await result.json();
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  };

  const addProduct = async () => {
    let result = await fetch(`http://localhost:5000/delete/${params.id}`, {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price, category, company }),
    });
    console.log(await result.json());
    navigate("/");
  };
  return (
    <div className="addproduct">
      <h1>Update Product</h1>
      <div className="inputs">
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter product name"
          value={name}
        />

        <input
          type="number"
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Enter product price (in $)"
          value={price}
        />

        <input
          type="text"
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Enter product category"
          value={category}
        />

        <input
          type="text"
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Enter product company"
          value={company}
        />
      </div>
      <button onClick={addProduct}>Update Product</button>
    </div>
  );
};

export default UpdateProduct;
