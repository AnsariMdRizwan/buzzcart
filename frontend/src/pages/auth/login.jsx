import CommonForm from '@/components/common/form.jsx'
import { LoginFormControls } from '@/config'
import { loginUser } from '@/store/auth-slice'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'



const initialState = {
  email: '',
  password: '',
}

const Authlogin = () => {
  const [formData, setFormData] = useState(initialState)

  const dispatch = useDispatch()


  const onsubmit =(event)=>{
    event.preventDefault();
    dispatch(loginUser(formData)).then((data)=>{
      if (data?.payload?.success) {
        toast.success(data?.payload?.message);  // Success toast
        console.log(data?.payload?.message);
        
      } else {
        console.log(data?.payload?.message);
        
        toast.error(data?.payload?.message);  
      }
    })
  }

  return (
    <>
      {/* <div className="flex  min-h-screen items-center justify-center"> */}
      <div className='z-10 mx-auto w-full max-w-md space-y-6 mt-20'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold tracking-tight '>Login </h1>
          <p className='mt-2'>Don't Have an Account?
            <Link className=" ml-2 font-medium text-pretty hover:underline" to='/auth/register'>Register</Link>
          </p>
        </div>
        <CommonForm
          formControls={LoginFormControls}
          buttonText={"Sign In"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onsubmit}
        />
      </div>


      {/* </div> */}
    </>
  )
}

export default Authlogin
