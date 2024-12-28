import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../features/axiosInstance';

const EditProduct = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    name: '',
    price: '',
  });

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axiosInstance.get(`/products/${productId}`);
        setProductData(response.data);
      } catch (error) {
        console.error('Failed to fetch product data:', error);
      }
    };

    if (productId) {
      fetchProductData();
    }
  }, [productId]);

  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.patch(`/products/${productId}`, productData);
      alert('Product updated successfully!');
      navigate('/dashboard/products');
    } catch (error) {
      console.error('Failed to update product:', error.response?.data || error.message);
      alert('Failed to update product');
    }
  };

  return (
    <>
      <h4 className="mb-4 text-lg font-semibold text-gray-600">Edit Product</h4>
      <div className="px-4 py-3 mb-8 bg-green-400 font-[poppins] rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <label className="block text-sm">
            <span className="text-gray-700">Name</span>
            <input
              name="name"
              value={productData.name}
              onChange={handleChange}
              className="block w-full rounded-lg mt-1 text-sm py-2 px-3 focus:outline-none form-input"
              placeholder="Edit product name"
            />
          </label>
          <label className="block text-sm my-3">
            <span className="text-gray-700">Price</span>
            <input
              name="price"
              value={productData.price}
              onChange={handleChange}
              className="block w-full rounded-lg mt-1 text-sm py-2 px-3 focus:outline-none form-input"
              placeholder="Enter product price"
            />
          </label>
          <button
            type="submit"
            className="bg-green-800 px-5 text-white py-1 float-right rounded text-base my-5"
          >
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default EditProduct;
