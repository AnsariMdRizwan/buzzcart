
import { BadgeCheck, LayoutDashboard, ShoppingBasket } from 'lucide-react';
import React, { Fragment } from 'react'
import { RiAdminLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';

export const adminsidebarMenuitems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/admin/dashboard',
    icon: <LayoutDashboard />
  },
  {
    id: 'products',
    label: 'Products',
    path: '/admin/products',
    icon: <ShoppingBasket />
  },
  {
    id: 'orders',
    label: 'Orders',
    path: '/admin/orders',
    icon: <BadgeCheck />
  },
]

const Menuitems = ({ setOpen }) => {
  const navigate = useNavigate();
  return < nav className='mt-8 flex-col flex gap-2'>
    {
      adminsidebarMenuitems.map(Menuitems => <div key={Menuitems.id}
        onClick={() => {
          navigate(Menuitems.path)
          setOpen ? setOpen(false) : null;
        }} className={`flex items-center gap-2 rounded-md px-3 py-2  hover:text-black cursor-pointer
           ${
              location.pathname === Menuitems.path 
                ? 'text-black font-bold' // Active menu item styles
                : 'text-zinc-500 hover:text-black' // Default styles
            }
          `
          
        }>
        {Menuitems.icon}
        <span>{Menuitems.label}</span>
      </div>)
    }
  </nav>
}

const Adminsidebar = ({ open, setOpen }) => {


  const navigate = useNavigate();

  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64 bg-white">
          <div className='flex flex-col h-full'>
            <SheetHeader className="border-b">
              <SheetTitle className="flex gap-2 mt-5 mb-5">
                <RiAdminLine size={30} />
                <h1 className='text-xl font-extrabold'>Admin Panel</h1>
              </SheetTitle>
            </SheetHeader>
            <Menuitems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
      <aside className='hidden w-64 flex-col border-r p-6 lg:flex'>
        <div onClick={() => navigate('/admin/dashboard')} className='flex items-center gap-2 cursor-pointer'>
          <RiAdminLine size={30} />
          <h1 className='text-xl font-extrabold'>Admin Panel</h1>
        </div>
        <Menuitems />
      </aside>
    </Fragment>
  )
}

export default Adminsidebar
