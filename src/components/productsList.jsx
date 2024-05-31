import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductsList = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const response = await fetch("http://localhost:5000/products", {
      headers: {
        authorization: JSON.stringify(localStorage.getItem('token'))
      }
    });
    const result = await response.json();
    setProducts(result);
  };
  useEffect(() => {
    getProducts();
  }, []);

  const handleDelete = async (id) => {
    let deleteRec = await fetch(`http://localhost:5000/product/${id}`, {
        method: "Delete"
    })
    deleteRec = await deleteRec.json();
    if(deleteRec) {
        getProducts();
    }
  }
  console.log(products);
  return (
    <div className="container">
      <h1>Products List</h1>
      <div className="row">
        {products.map((item, index) => (
          <div className="col-sm-3 mb-4" key={index}>
            <div className="card p-2">
              <div className="row">
                <div className="col-6">
                  <h4>Name</h4>
                </div>
                <div className="col-6">
                  <h5>{item.name}</h5>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <h5>Price</h5>
                </div>
                <div className="col-6">
                  <h6>{item.price}</h6>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <h5>Brand</h5>
                </div>
                <div className="col-6">
                  <h6>{item.brand}</h6>
                </div>
              </div>
              <div className="row">
                <div className="col-6">
                  <h5>Category</h5>
                </div>
                <div className="col-6">
                  <h6>{item.category}</h6>
                </div>
              </div>

              <div className="row">
                <div className="col-6">
                  <Link to={`update/${item._id}`} className="btn btn-info">Update</Link>
                </div>
                <div className="col-6">
                    <button className="btn btn-danger" onClick={() => handleDelete(item.id)}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
