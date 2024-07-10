import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetProductQuery, useUpdateProductMutation } from "../rtkQuery/createApi.ts";

const UpdateProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const {id} = useParams();
    const navigate = useNavigate();

    const { data: product } = useGetProductQuery(id);
    const [updateproduct] = useUpdateProductMutation();

    useEffect(() => {
        if(product) {
            setName(product.name);
            setPrice(product.price);
            setCategory(product.category);
            setBrand(product.brand);
        }
    }, [product])


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateproduct({id, name, brand, category, price}).unwrap();
            navigate("/");
        } catch {
            console.error("Failed Updating Data")
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
