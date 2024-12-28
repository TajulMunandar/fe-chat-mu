import {useState} from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const InputProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveProduct = async (e)=>{
    e.preventDefault();
    try{
      await axios.post('http://localhost:5001/products', {
        name:name,
        price:price
      });
      navigate("/dashboard/products")
    } catch(error) {
      if(error.response) {
        setMsg(error.response.data.msg);
      }
    }
  }


  return (
    <>
    <h4 className="mb-4 text-lg font-semibold text-green-700">
      Add Products
    </h4>
    {msg && <p className="text-red-500 text-sm">{msg}</p>}
    <form onSubmit={saveProduct}>
      <div className="px-4 py-3 mb-8 font-[poppins] bg-white border-2 rounded-lg shadow-md">
        <label className="block text-sm">
          <span className="text-green-700">Name</span>
          <input
            className="block w-full rounded-lg mt-1 text-sm py-2 px-3 border-2 focus:outline-green-600 placeholder:text-slate-300 form-input"
            placeholder="Enter username"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label className="block text-sm my-3">
          <span className="text-gray-700 dark:text-gray-400">Price</span>
          <input
            type="text"
            className="block w-full rounded-lg mt-1 text-sm py-2 px-3 border-2 focus:outline-green-600 placeholder:text-slate-300 form-input"
            placeholder="Enter email"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>
        <button type="submit" className='bg-slate-400 px-5 text-white py-1 float-right rounded text-base my-5'>Save</button>
      </div>
    </form>
  </>
  )
}

export default InputProduct