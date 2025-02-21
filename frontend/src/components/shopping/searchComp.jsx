import { getSearchResult, resetSearchResults } from '@/store/shop/search-slice';
import React, { useEffect, useState } from 'react';
import { FiSearch } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import ShoppingProductTile from './product-tile';
import { addTocart, fetchCartItems } from '@/store/shop/cart-slice';
import ProductsDetailsDialog from './product-details';
import { fetchProductDetails } from '@/store/shop/product-slice';

const SearchComp = () => {

  const [keyword, setKeyword] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [openDetailsDialog,setOpenDetailsDialog]= useState(false)
  const dispatch = useDispatch();
  const { searchResults } = useSelector(state => state.shopSearch);
  const { productsDetails } = useSelector(state => state.shopProducts);
  const { cartItems } = useSelector(state => state.shopCart);
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    if (keyword && keyword.trim() !== "" && keyword.trim().length > 1) {
      setTimeout(() => {
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
        dispatch(getSearchResult(keyword));
      }, 1000);
    } else {
      setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
      dispatch(resetSearchResults());
    }
  }, [keyword]);




  const handleAddtoCart=(getCurrentProductId,getTotalStock )=>{
    
    console.log(getCurrentProductId);

    let getCartItem = cartItems.items || [] ;

    if(getCartItem.length){
       const indexOfCurrentItem = getCartItem.findIndex(item => item.productId === getCurrentProductId)
       
       if(indexOfCurrentItem > -1){
        const getQuantity = getCartItem[indexOfCurrentItem].quantity 
        if (getQuantity + 1 > getTotalStock){
          toast.error(`only ${getQuantity} quantity can be added for this Item`)
          return 
        }
       }

    }

    dispatch(addTocart({userId : user?.id ,productId:getCurrentProductId,quantity:1 })).then((data)=>{
      if(data?.payload?.success){
        dispatch(fetchCartItems(user?.id))
        // toast.success("Product added to Cart ")
      }
    })
  }

  const handleGetProductDetails = (getCurrentProductId) => {
      dispatch(fetchProductDetails(getCurrentProductId))
    }

  useEffect(() => {
      if (productsDetails !== null) setOpenDetailsDialog(true)
    }, [productsDetails])

  console.log(searchResults, "searchResult");

  return (
    <div className="mt-16 Container mx-auto md:px-6 px-4 py-8 w-full">
      <div className="flex justify-end mb-8">
        <div className="w-full relative flex items-center">
          {/* Input Field */}
          <input
            value={keyword} name='keyword' onChange={(event) => setKeyword(event.target.value)}
            className="py-2 pl-4 pr-12 w-full border border-gray-300 rounded-l-md focus:outline-none"
            placeholder="Search In E-Com"
          />

          {/* Search Icon with Square Background */}
          <div className="absolute right-0 top-0 h-full bg-blue-300 flex items-center justify-center w-12 border border-blue-800 rounded-r-md cursor-pointer">
            <FiSearch className="text-black text-xl" />
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 sm:grid-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        { 
          !keyword.trim() ? (
            <h1 className='flex items-center justify-center font-bold'>Search...</h1>
          ) : (
            searchResults && searchResults.length ? (
              searchResults.map((item) => <ShoppingProductTile
              handleGetProductDetails={handleGetProductDetails}
              handleAddtoCart={handleAddtoCart}
              key={item.id} product={item} />)
            ) : (
              <h1 className='flex items-center justify-center font-bold'>Didn't Found any {keyword.trim()}</h1>
            )
          )
        }
      </div>
      <ProductsDetailsDialog 
      open={openDetailsDialog}
      setOpen={setOpenDetailsDialog} 
      productsDetails={productsDetails}/>
    </div>
  );
};

export default SearchComp;
