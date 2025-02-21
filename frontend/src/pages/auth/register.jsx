import CommonForm from '@/components/common/form.jsx'
import { registerFormControls } from '@/config'
import { registerUser } from '@/store/auth-slice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'  



const initialState = {
  userName: '',
  email: '',
  password: '',
}

const AuthRegister = () => {
  const [formData, setFormData] = useState(initialState)

  console.log(formData);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => { 
      if (data?.payload?.success) {
        toast.success(data?.payload?.message);  // Success toast
        navigate('/auth/login');
      } else {
        toast.error(data?.payload?.message);  // Error toast
      }
    });
  }

  return (
    <>
      <div className='z-10 mx-auto w-full max-w-md space-y-6'>
        <div className='text-center'>
          <h1 className='text-3xl font-bold tracking-tight '>Create new Account</h1>
          <p className='mt-2'>Already Have an Account?
            <Link className="ml-2 font-medium text-pretty hover:underline" to='/auth/login'>Login</Link>
          </p>
        </div>
        <CommonForm
          formControls={registerFormControls}
          buttonText={"Sign up"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />
      </div>
    </>
  )
}

export default AuthRegister;
