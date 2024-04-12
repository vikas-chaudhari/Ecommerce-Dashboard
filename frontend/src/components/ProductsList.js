import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductsList = () => {
  let [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let product = await fetch("http://localhost:5000/get-products");
    product = await product.json();
    setProducts(product);
    console.log(product);
  };

  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:5000/delete/${id}`, {
      method: "Delete",
    });
    console.log(await result.json());
    if (result) {
      getProducts();
    }
  };

  const searchHandle = async (value) => {
    if (!value) {
      getProducts();
    }
    let data = await fetch(`http://localhost:5000/search/${value}`);
    data = await data.json();
    if (data) {
      setProducts(data);
    }
  };

  return (
    <div className="product-list">
      <h1>Products List</h1>

      <div className="search">
        <input
          type="search"
          onChange={(e) => searchHandle(e.target.value)}
          placeholder="Search Product here"
        ></input>
      </div>

      <table>
        <thead>
          <tr>
            <td>Sr. No.</td>
            <td>Name</td>
            <td>Price</td>
            <td>Category</td>
            <td>Company</td>
            <td colSpan="2">Operations</td>
          </tr>
        </thead>
        <tbody>
          {products.length ? (
            products.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>$ {item.price}</td>
                <td>{item.category}</td>
                <td>{item.company}</td>
                <td className="btn">
                  <button onClick={() => deleteProduct(item._id)}>
                    Delete
                  </button>
                </td>
                <td className="update-link">
                  <Link to={"/update/" + item._id}>Update</Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">
                <h2>No results found</h2>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsList;
