import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDeleteProductMutation, useGetProductsQuery } from "../rtkQuery/createApi.ts";

const ProductsList = () => {

  const { data: products, error, isLoading, isError } = useGetProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id).unwrap()
    } catch {
      console.error("Failed to Delete the Product")
    }
  }
   return (
    <div className="container">
      <h1>Products List</h1>
      <div className="row">
        {
        isLoading ? (
          <p className="text-center">Loading...</p>
        ) : isError ? (
          <p className="text-center">
            {error.error || "Something went wrong"}
          </p>
        ) : ( products.map((item, index) => (
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
                  <Link to={`update/${item._id}`} className="btn btn-info">
                    Update
                  </Link>
                </div>
                <div className="col-6">
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )))}
      </div>
    </div>
  );
};

export default ProductsList;
