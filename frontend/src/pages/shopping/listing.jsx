import Filterproducts from '@/components/shopping/filterproducts'
import ProductsDetailsDialog from '@/components/shopping/product-details'
import ShoppingProductTile from '@/components/shopping/product-tile'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { sortOptions } from '@/config'
import { addTocart, fetchCartItems } from '@/store/shop/cart-slice'
import { fetchALLFilteredProducts, fetchProductDetails } from '@/store/shop/product-slice'
import { data } from 'autoprefixer'
import { ArrowUpDownIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

const Shoppinglisting = () => {
  const dispatch = useDispatch();
  const { productList, productsDetails } = useSelector(state => state.shopProducts)
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams()
  const {user}= useSelector(state=>state.auth);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const {cartItems}= useSelector(state=>state.shopCart)
 



  const createSearchParamsHelper = (filterParams) => {
    const queryParams = [];

    for (const [key, value] of Object.entries(filterParams)) {
      if (Array.isArray(value) && value.length > 0) {
        const paramValue = value.join(',');

        queryParams.push(`${key}=${encodeURIComponent(paramValue)}`)
      }
    }
    return queryParams.join('&');
  }


  const handleSort = (value) => {
    setSort(value);
  }


  const handleFilter = (getSectionId, getCurrentOption) => {
    

    let cpyfilters = { ...filters };
    const indexOfCurrentSection = Object.keys(cpyfilters).indexOf(getSectionId)

    if (indexOfCurrentSection === -1) {
      cpyfilters = {
        ...cpyfilters,
        [getSectionId]: [getCurrentOption]
      }
    } else {
      const indexOfCurrentOption = cpyfilters[getSectionId].indexOf(getCurrentOption);

      if (indexOfCurrentOption === -1) {
        cpyfilters[getSectionId].push(getCurrentOption)
      }
      else {
        cpyfilters[getSectionId].splice(indexOfCurrentOption, 1);
      }
    }

    setFilters(cpyfilters)
    sessionStorage.setItem('filters', JSON.stringify(cpyfilters))
  }


  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem('filters')) || {})
  }, [])


  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParamsHelper(filters)
      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters])


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

  useEffect(() => {
    if (filters !== null && sort !== null) {

    }
    dispatch(fetchALLFilteredProducts({ filterParams: filters, sortParam: sort }))
  }, [dispatch, sort, filters])

  const handleGetProductDetails = (getCurrentProductId) => {
    dispatch(fetchProductDetails(getCurrentProductId))
  }


  useEffect(() => {
    if (productsDetails !== null) setOpenDetailsDialog(true)
  }, [productsDetails])

  console.log(productList," productList");
  

  return (
    <div className='grid grid-cols-1 md:grid-cols-[300px_1fr] gap-3 p-4 md:p-6'>
      <Filterproducts filters={filters} handleFilter={handleFilter} />

      <div className='bg-background w-full rounded-lg shadow-sm pt-16'>
        <div className='p-4 border-b flex items-center justify-between'>
          <h2 className='text-lg font-extrabold mr-2'>All Products</h2>
          <div className='flex item-center gap-3'>
            <span className='text-gray-400 mt-1'>{productList.length}  Products</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button varient="outline" size="sm" className="flex items-center gap-1">
                  <ArrowUpDownIcon className='h-4 w-4' />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px] bg-white">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {
                    sortOptions.map(sortItem => (
                      <DropdownMenuRadioItem value={sortItem.id} key={sortItem.id}>{sortItem.label}
                      </DropdownMenuRadioItem>
                    ))
                  }
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 align-top justify-center items-center '>
          {
            productList && productList.length > 0 ?
              productList.map((productItem, index) => (
                <ShoppingProductTile handleGetProductDetails={handleGetProductDetails} key={index} product={productItem} 
                handleAddtoCart={handleAddtoCart}
                />
              )) :
              
             
              <p className="text-2xl mx-40 font-bold text-center">
                Didn't Found Any Products 😒😒😒🕓
              </p>
            
              

          }
        </div>
      </div>
      <ProductsDetailsDialog open={openDetailsDialog}
        setOpen={setOpenDetailsDialog} productsDetails={productsDetails}/>
    </div>
  )
}

export default Shoppinglisting
 