import { useSelector } from 'react-redux';
import { selectUser } from '../features/authSlice';
import { IoPerson } from "react-icons/io5";

const Setting = () => {
  const user = useSelector(selectUser);

  return (
    <>
         <h4 className="mb-4 text-lg font-semibold text-gray-600">
              Setting Account
            </h4>
            <div className="w-full p-8 bg-white shadow-md font-[poppins]">
              <div className="rounded p-6 flex flex-col justify-center items-center">
              <IoPerson className='text-9xl p-3 rounded-full border'/>
                  <div>
                  <div className="pb-6 lg:w-96">
                        <label htmlFor="name" className="font-semibold text-gray-700 block pb-1">Name</label>
                        <div className="flex border p-3 text-xl">
                            {user ? user.name : 'Guest'}
                        </div>  
                      </div>
                      <div className="pb-6">
                        <label htmlFor="name" className="font-semibold text-gray-700 block pb-1">Email</label>
                        <div className="flex border p-3 text-xl">
                            {user ? user.email : 'Guest'}
                        </div>  
                      </div>
                      <div className="pb-6">
                        <label htmlFor="name" className="font-semibold text-gray-700 block pb-1">Position</label>
                        <div className="flex border p-3 text-xl ">
                          <span className='bg-green-800 px-4 py-1 rounded-full text-white'>
                            {user ? user.role : 'Guest'}
                          </span>
                        </div>  
                      </div>
                  </div>

              </div>
            </div>
    </>
  )
}

export default Setting