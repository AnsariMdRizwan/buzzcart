import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Authlayout from './components/auth/layout'
import Authlogin from './pages/auth/login'
import AuthRegister from './pages/auth/register'
import Adminloyout from './components/admin/layout'
import Admindashboard from './pages/admin/dashboard'
import Adminproduct from './pages/admin/adminproducts'
import Adminorder from './pages/admin/orders'
import Adminfeature from './pages/admin/features'
import Shoppingloyout from './components/shopping/layout'
import Notfoundpage from './pages/not-found'
import Shoppinglisting from './pages/shopping/listing'
import ShoppingAccount from './pages/shopping/account'
import Shoppingcheckout from './pages/shopping/Checkout'
import Shoppinghome from './pages/shopping/home'
import Checkauth from './components/common/check-auth'
import UnAuthPage from './pages/unauthpage'
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux'
import { checkAuth } from './store/auth-slice'
import PayPalReturn from './pages/shopping/paypal-returnPage'
import PayPalCancelPage from './pages/shopping/paypal-cancel'
import PaymentSuccess from './pages/shopping/payment-success'
import SearchComp from './components/shopping/searchComp'
import { GiSkeleton } from 'react-icons/gi'
import { Skeleton } from './components/ui/skeleton'
import SpiralLoader from './components/ui/loader'
import Footer from './components/common/footer'

const App = () => {


  const { user, isAuthenticated, isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen 
      
      ">
        <SpiralLoader />

      </div>

    );
  }

  console.log(isLoading, user);


  return (

    <>
      <div className='flex flex-col overflow-hidden bg-white '>


        <Routes>
          <Route path='/' element={

            <Checkauth isAuthenticated={isAuthenticated} user={user}>
            </Checkauth>
          } />

          <Route path='/auth' element={

            <Checkauth isAuthenticated={isAuthenticated} user={user}><Authlayout /></Checkauth>
          }>
            <Route path='login' element={<Authlogin />}></Route>
            <Route path='register' element={<AuthRegister />}></Route>
          </Route>

          <Route path='/admin' element={<Checkauth isAuthenticated={isAuthenticated} user={user}><Adminloyout /></Checkauth>}>
            <Route path='dashboard' element={<Admindashboard />} />
            <Route path='products' element={<Adminproduct />} />
            <Route path='orders' element={<Adminorder />} />
            <Route path='features' element={<Adminfeature />} />


          </Route>

          <Route path='/shop' element={<Checkauth isAuthenticated={isAuthenticated} user={user}><Shoppingloyout /></Checkauth>} >
            <Route path='home' element={<Shoppinghome />} />
            <Route path='checkout' element={<Shoppingcheckout />} />
            <Route path='account' element={<ShoppingAccount />} />
            <Route path='listing' element={<Shoppinglisting />} />
            <Route path='paypal-return' element={<PayPalReturn />} />
            <Route path='paypal-cancel' element={<PayPalCancelPage />} />
            <Route path='payment-success' element={<PaymentSuccess />} />
            <Route path='search' element={<SearchComp />} />
          </Route>



          <Route path='/unauthpage' element={<UnAuthPage />} />
          <Route path='*' element={<Notfoundpage />} />
        </Routes>
        <Toaster />
        <Footer />
      </div>
    </>
  )
}

export default App
