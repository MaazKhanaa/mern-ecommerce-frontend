import { useState } from "react";

const AddProducts = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [brand, setBrand] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = JSON.parse(localStorage.getItem("user"))._id;
        const response = await fetch("http://localhost:5000/add-product", {
            method: "post",
            body: JSON.stringify({name, price, category, brand, userId}),
            headers: {
                "Content-Type": "application/json"
            }
        })
        const result = await response.json();
        console.log(result);

        if (response.ok) {
            setName('');
            setPrice('');
            setCategory('');
            setBrand('');
          }
    }
  return (
    <div>
      <div className="row justify-content-center mx-0">
        <div className="col-lg-5 col-sm-9">
          <h3 className="mb-5">Add Product</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input type="text" onChange={(e) => setName(e.target.value)} name="name" value={name} placeholder="Enter product name" />
            </div>

            <div className="form-group">
              <label>Price</label>
              <input type="number" onChange={(e) => setPrice(e.target.value)} name="price" value={price} placeholder="Enter product price" />
            </div>

            <div className="form-group">
              <label>Category</label>
              <input type="text" onChange={(e) => setCategory(e.target.value)} name="category" value={category} placeholder="Enter product category" />
            </div>

            <div className="form-group">
              <label>Brand</label>
              <input type="text" onChange={(e) => setBrand(e.target.value)} name="brand" value={brand} placeholder="Enter product brand" />
            </div>

            <button type="submit" className="primary-btn">
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
