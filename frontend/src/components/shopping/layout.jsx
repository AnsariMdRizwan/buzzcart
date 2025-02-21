import React from 'react'
import { Outlet } from 'react-router-dom'

import Shoppingheader from './header'

const Shoppingloyout = () => {
  return (
    <>
      <div className='flex flex-col bg-white overflow-hidden'>



        {/* Shopping header */}

        <Shoppingheader />
        <main className='flex flex-col w-full'>
          <Outlet />
        </main>
      </div>

    </>
  )
}

export default Shoppingloyout
