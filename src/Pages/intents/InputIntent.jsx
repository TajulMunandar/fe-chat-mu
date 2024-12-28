import {useState} from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const InputIntent = () => {
  const [intent_name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveProduct = async (e)=>{
    e.preventDefault();
    try{
      await axios.post('http://localhost:5001/intent', {
        intent_name:intent_name,
      });
      navigate("/dashboard/intent")
    } catch(error) {
      if(error.response) {
        setMsg(error.response.data.msg);
      }
    }
  }


  return (
    <>
    <h4 className="mb-4 text-lg font-semibold text-green-700">
      Add Intent
    </h4>
    {msg && <p className="text-red-500 text-sm">{msg}</p>}
    <form onSubmit={saveProduct}>
      <div className="px-4 py-3 mb-8 font-[poppins] bg-white border-2 rounded-lg shadow-md">
        <label className="block text-sm">
          <span className="text-green-700">Intent Name</span>
          <input
            className="block w-full rounded-lg mt-1 text-sm py-2 px-3 border-2 focus:outline-green-600 placeholder:text-slate-300 form-input"
            placeholder="Enter username"
            value={intent_name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <button type="submit" className='bg-slate-400 px-5 text-white py-1 float-right rounded text-base my-5'>Save</button>
      </div>
    </form>
  </>
  )
}

export default InputIntent