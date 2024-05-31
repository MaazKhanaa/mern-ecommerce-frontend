import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const params = useParams();
    const navigate = useNavigate()

    const getProductData = async () => {
        console.log(params.id)
        try {
            const response = await fetch(`http://localhost:5000/product/${params.id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const updateData = await response.json();
            console.log(updateData);
            // Set the state with the fetched data
            setName(updateData.name);
            setPrice(updateData.price);
            setCategory(updateData.category);
            setBrand(updateData.brand);
        } catch (error) {
            console.error('Error fetching product data:', error);
        }
    };

    useEffect(() => {
        getProductData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(name, brand, category, price);
        try {
            let updateProdData = await fetch(`http://localhost:5000/product/${params.id}`, {
                method: "PUT",
                body: JSON.stringify({name, price, category, brand}),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            let resultData = await updateProdData.json();
            navigate("/")
            console.log(resultData);
        } catch(err) {
            console.log(err)
        }
    };

    return (
        <div>
            <div className="row justify-content-center mx-0">
                <div className="col-lg-5 col-sm-9">
                    <h3 className="mb-5">Update Product</h3>
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
                            Update Product
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateProduct;
