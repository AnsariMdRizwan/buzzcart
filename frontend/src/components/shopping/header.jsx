import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { shoppingViewHeaderMenuitems } from '@/config';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '../ui/dropdown-menu';
import { DropdownMenuContent, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { logOutUser } from '@/store/auth-slice';
import toast from 'react-hot-toast';
import UserCardWrapper from './card-wrapper';
import { Label } from '../ui/label';
import { getProfileImages } from '@/store/profile-slice';

const MenuItems = ({ onCloseSheet }) => {
  const navigate = useNavigate();
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);

  const handleNavigate = (menuItem) => {
    sessionStorage.removeItem('filters');
    const currentFilter =
      menuItem.id !== 'home' && menuItem.id !== 'products' && menuItem.id !== 'search'
        ? { category: [menuItem.id] }
        : null;
    sessionStorage.setItem('filters', JSON.stringify(currentFilter));

    setSelectedMenuItem(menuItem.id);
    if (window.location.pathname === menuItem.path) {
      window.location.reload();
      onCloseSheet(); // Close the sheet
    } else {
      navigate(menuItem.path);
      onCloseSheet(); // Close the sheet
    }
  };

  return (
    <nav className="font-extrabold text-3xl text-lime-950 flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuitems.map((menuItem) => (
        <Label
          onClick={() => handleNavigate(menuItem)}
          className={`text-sm font-extrabold cursor-pointer ${selectedMenuItem === menuItem.id ? 'text-blue-500' : 'text-zinc-700'
            }`}
          key={menuItem.id}
        >
          {menuItem.label}
        </Label>
      ))}
    </nav>
  );
};

const HeaderRightContent = ({ onCloseSheet }) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.shopCart);
  const dispatch = useDispatch();
  const [openshoppingCartSheet, setOpenshoppingCartSheet] = useState(false);
  const { profileImage } = useSelector(state => state.profilePhoto)

  const handleLogOut = () => {
    dispatch(logOutUser());
    toast.success("LogOut Successfully");
    onCloseSheet(); // Close the header sheet after logout
  };
  console.log(profileImage[0]?.image,"this is image");
  console.log(profileImage," this is Profile image");
  console.log(user);
  

  const handleOpenCart = () => {
    setOpenshoppingCartSheet(true); // Open the cart sheet
    onCloseSheet(); // Close the header sheet (without affecting the cart sheet)
  };
  useEffect(() => {
    // Fetch profile image on page load
    dispatch(getProfileImages());
  }, [dispatch]);

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      {/* Shopping Cart Button */}
      <Sheet open={openshoppingCartSheet} onOpenChange={() => setOpenshoppingCartSheet(false)}>
        <Button
          onClick={() => setOpenshoppingCartSheet(true)}
          variant="outline"
          size="icon"
          className="relative"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="bg-red-500 text-white absolute rounded-full pl-2 pr-2 top-[-5px] right-[-5px] text-sm">
            {cartItems?.items?.length || 0}
          </span>
          <span className="sr-only">User cart</span>
        </Button>
        <UserCardWrapper
          setOpenshoppingCartSheet={setOpenshoppingCartSheet}
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </Sheet>


      {/* User Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black">
            {profileImage && profileImage.length >0 ?  (
              <AvatarImage
                src={profileImage[0]?.image}
                alt="Profile Image"
                className="rounded-full object-cover"
              />
            ) : (
              <AvatarFallback className="bg-black text-white font-extrabold">
                {user?.userName[0].toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56 bg-white border">
          <DropdownMenuLabel>
            <span className="text-lime-600 font-bold">Logged in as</span> {user?.userName}
          </DropdownMenuLabel>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              navigate("/shop/account");
              onCloseSheet(); // Close the header sheet after navigating
            }}
          >
            <UserCog className="mr-2 h-4 w-4" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogOut} className="cursor-pointer">
            <LogOut className="mr-2 h-4 w-4" />
            LogOut
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Cart Sheet */}

    </div>
  );
};





const Shoppingheader = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [openCartSheet, setOpenCartSheet] = useState(false);

  const handleCloseSheet = () => {
    setOpenCartSheet(false);
  };

  return (
    <div className="fixed top-0 z-40 w-full border-b bg-slate-200">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <label to="/shop/home" className="flex items-center gap-2">
          <HousePlug className="h-6 w-6" />
          <span className="font-bold">BuZZCart</span>
        </label>

        <Sheet open={openCartSheet} onOpenChange={setOpenCartSheet}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-full font-bold max-w-xs bg-white"
          >
            <MenuItems onCloseSheet={handleCloseSheet} />
            <HeaderRightContent onCloseSheet={handleCloseSheet} />
          </SheetContent>
        </Sheet>

        <div className="hidden lg:block">
          <MenuItems />
        </div>
        {isAuthenticated ? (
          <div className="hidden lg:block">
            <HeaderRightContent onCloseSheet={handleCloseSheet} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Shoppingheader;
