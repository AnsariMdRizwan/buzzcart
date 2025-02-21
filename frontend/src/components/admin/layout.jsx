import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Adminsidebar from './sidebar'
import Adminheader from './header'

const Adminloyout = () => {


const [openSidebar,setOpenSidebar]=useState(false)

  return (
    <>
      <div className='flex min-h-screen w-full'>

        <Adminsidebar open={openSidebar} setOpen={setOpenSidebar} />
        <div className='flex flex-1 flex-col'>
            {/* admin header */}

            <Adminheader open={openSidebar} setOpen={setOpenSidebar} />
            <main className='flex-1 flex-col  p-4 md:p-6'>
                <Outlet/>
            </main>
        </div>
      </div>
    </>
  )
}

export default Adminloyout
