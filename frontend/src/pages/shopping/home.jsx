import React, { useEffect, useState } from 'react'
import { BsArrowRightCircleFill } from "react-icons/bs";
import Banner1 from "../../../src/assets/banner1.png"
import Banner2 from "../../../src/assets/banner2.jpg"
import Banner3 from "../../../src/assets/banner3.jpg"
import Banner4 from "../../../src/assets/banner4.jpg"

import Addidas from "../../../src/assets/addidas.png"
import Levi from "../../../src/assets/levi.png"
import HandM from "../../../src/assets/handm.png"
import Nike from "../../../src/assets/nike.png"
import Puma from "../../../src/assets/puma.png"
import Zara from "../../../src/assets/zara.png"

import Mens from "../../../src/assets/mens.png"
import Womens from "../../../src/assets/womens.png"
import Kids from "../../../src/assets/kids.png"
import Accsssories from "../../../src/assets/accessories.png"
import Footwear from "../../../src/assets/footware.png"

import { Button } from '@/components/ui/button'

import { Baby, ChevronLeft, ChevronLeftIcon, ChevronRightIcon, Glasses, ShirtIcon } from 'lucide-react'
import { GrUserFemale } from "react-icons/gr"
import { GiSonicShoes } from "react-icons/gi";
import { Card, CardContent } from '@/components/ui/card'
import { useDispatch, useSelector } from 'react-redux'
import { fetchALLFilteredProducts, fetchProductDetails } from '@/store/shop/product-slice'
import ShoppingProductTile from '@/components/shopping/product-tile'
import { Navigate, useNavigate } from 'react-router-dom'
import { addTocart, fetchCartItems } from '@/store/shop/cart-slice'
import ProductsDetailsDialog from '@/components/shopping/product-details'
import toast from 'react-hot-toast'
import { getFeatureImages } from '@/store/common-slice';



const Shoppinghome = () => {

  const [currSlide, setCurrSlide] = useState(0);
  const dispatch = useDispatch();
  const { cartItems } = useSelector(state => state.shopCart)

  const { productList, productsDetails } = useSelector(state => state.shopProducts,)
  const { user } = useSelector(state => state.auth)
  const { featureImageList } = useSelector(state => state.commonFeature)
  const slogans = [
    "We picked every item with care. You must try at least one!",
    "Discover your perfect style today.",
    "Unmatched quality for every occasion.",
    "Experience fashion like never before."
  ];

  const navigate = useNavigate();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  console.log(featureImageList, " featureIMageList");


  useEffect(() => {
    const timer = setInterval(() => {
      setCurrSlide(prevSlide => (prevSlide + 1) % featureImageList.length)
    }, 10000);

    return () => clearInterval(timer);
  }, [featureImageList])


  const handleNavigateTOListingpage = (getCurrentItem, section) => {
    sessionStorage.removeItem('filters');
    const currentFilter = {
      [section]: [getCurrentItem.id]
    }

    sessionStorage.setItem('filters', JSON.stringify(currentFilter))
    navigate(`/shop/listing`)
  }


  useEffect(() => {
    dispatch(fetchALLFilteredProducts({ filterParams: {}, sortParam: "price-lowtohigh" }))
  }, [dispatch]);

  const categorieswithmap = [
    { id: 'men', label: 'Men', image: Mens },
    { id: 'women', label: 'Women', image: Womens },
    { id: 'kids', label: 'Kids', image: Kids },
    { id: 'accessories', label: 'Accessories', image: Accsssories },
    { id: 'footwear', label: 'Footwear', image: Footwear },
  ]

  const mapppingbrand = [
    { id: "nike", label: "Nike", image: Nike },
    { id: "addidas", label: "Addidas", image: Addidas },
    { id: "puma", label: "Puma", image: Puma },
    { id: "zara", label: "Zara", image: Zara },
    { id: "levi", label: "Levi", image: Levi },
    { id: "handm", label: "H & M", image: HandM },

  ]

  const handleAddtoCart = (getCurrentProductId, getTotalStock) => {
    console.log(getCurrentProductId);


    let getCartItem = cartItems.items || [];

    if (getCartItem.length) {
      const indexOfCurrentItem = getCartItem.findIndex(item => item.productId === getCurrentProductId)

      if (indexOfCurrentItem > -1) {
        const getQuantity = getCartItem[indexOfCurrentItem].quantity
        if (getQuantity + 1 > getTotalStock) {
          toast.error(`only ${getQuantity} quantity can be added for this Item`)
          return
        }
      }

    }

    dispatch(addTocart({ userId: user?.id, productId: getCurrentProductId, quantity: 1 })).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id))
        // toast.success("product added to Cart ")
      }
    })
  }
  const handleGetProductDetails = (getCurrentProductId) => {
    dispatch(fetchProductDetails(getCurrentProductId))
  }

  useEffect(() => {
    if (productsDetails !== null) setOpenDetailsDialog(true)
  }, [productsDetails])

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);


  return (
    <div className='flex flex-col min-h-screen pt-16'>
      {/* Banner Section */}
      <div className="p-10 relative w-full h-[300px] sm:h-[400px] lg:h-[600px] overflow-hidden">
        {featureImageList && featureImageList.length > 0 ? featureImageList.map((featureImageList, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full ${index === currSlide ? "opacity-100" : "opacity-0"
              } transition-opacity duration-1000`}
          >
            <img
              src={featureImageList?.image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover sm:object-contain lg:object-cover md:object-cover"
            />
            {/* Slogan for Each Slide */}
            <div className="absolute top-1/2 left-10 transform -translate-y-1/2 bg-opacity-50 text-xl sm:text-sm md:text-4xl font-bold bg-slate-500 m-10 text-gray-300 px-4 py-2 rounded-md text-left md:text-center flex flex-col items-center justify-center sm:flex">

              {slogans[index]}
              <div
                onClick={() => navigate('/shop/listing')}
                className="flex justify-center cursor-pointer mt-2">
                <BsArrowRightCircleFill />
              </div>
            </div>




          </div>
        )) : null}
        {/* Previous Slide Button */}
        <Button
          size="icon"
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-transparent"
          onClick={() => setCurrSlide((prevSlide) => (prevSlide - 1 + featureImageList.length) % featureImageList.length)}
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        {/* Next Slide Button */}
        <Button
          size="icon"
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-transparent"
          onClick={() => setCurrSlide((prevSlide) => (prevSlide + 1) % featureImageList.length)}
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>


      {/* Categories Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 ">
            Shop By Category

          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {categorieswithmap.map((categoryItem) => (
              <Card onClick={() => handleNavigateTOListingpage(categoryItem, 'category')} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="flex flex-col items-center justify-center p-6 w-30 h-30">
                  <img src={categoryItem.image} alt={categoryItem.label}
                    className="w-40 h-40 mb-4 object-cover"
                  />
                  <span className="font-bold">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 ">
            Shop By Brands

          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {mapppingbrand.map((branditem) => (
              <Card
                onClick={() => handleNavigateTOListingpage(branditem, 'brand')}
                className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <img src={branditem.image} alt={branditem.label} />
                  <span className="font-bold">{branditem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className='py-12'>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Features Products
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {
              productList && productList.length > 0 ?
                productList.map(productitems => <ShoppingProductTile
                  handleGetProductDetails={handleGetProductDetails}
                  handleAddtoCart={handleAddtoCart}
                  product={productitems} />)
                : null
            }
          </div>
        </div>
      </section>
      <ProductsDetailsDialog open={openDetailsDialog}
        setOpen={setOpenDetailsDialog} productsDetails={productsDetails} />
    </div>
  )
}

export default Shoppinghome

// we picked evry item with care ,you Must Try Atleast One 
