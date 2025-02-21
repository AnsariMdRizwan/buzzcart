import React, { useEffect, useState } from "react";
import img from "../../assets/account.jpg";
import Address from "@/components/shopping/address";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping/cards-items-content";
import { Button } from "@/components/ui/button";
import { createNewOrder } from "@/store/shop/order-slice";
import toast from "react-hot-toast";
import { clearCartState } from "@/store/shop/cart-slice";
import { useNavigate } from "react-router-dom";  // Import useNavigate for redirection

const Shoppingcheckout = () => {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { approvalURL } = useSelector((state) => state.shoppingOrder);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymentStart] = useState(false);

  // Calculate total cart amount
  const totalCartAmount =
    cartItems?.items?.length > 0
      ? cartItems.items.reduce(
        (sum, item) =>
          sum +
          (item?.salePrice > 0 ? item.salePrice : item?.price) * item?.quantity,
        0
      )
      : 0;

  const handleInitiatePayment = async () => {
    if (!cartItems || cartItems?.items?.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }
    if (!currentSelectedAddress) {
      toast.error("Please select at least one address to proceed.");
      return;
    }

    setIsPaymentStart(true); // Disable button to prevent multiple clicks

    const orderData = {
      userId: user?.id,
      cartId: cartItems?.id,
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      cartItems: cartItems.items.map((item) => ({
        productId: item?.productId,
        title: item?.title,
        image: item?.image,
        price: item?.salePrice > 0 ? item.salePrice : item?.price,
        quantity: item?.quantity,
      })),
      orderStatus: "Pending",
      paymentMethod: "paypal",
      paymentStatus: "Pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      PaymentId: "",
      PayerId: "",
    };

    try {
      const response = await dispatch(createNewOrder(orderData)).unwrap();

      if (response?.success) {
        console.log("Payment is started, redirecting...");
      } else {
        setIsPaymentStart(false);
        console.error("Payment could not be initiated");
      }
    } catch (error) {
      console.error("Error while processing payment:", error);
      setIsPaymentStart(false);
    }
  };

  // Redirect user to PayPal approval URL
  useEffect(() => {
    if (approvalURL) {
      dispatch(clearCartState());
      window.location.href = approvalURL;
    }
  }, [approvalURL, dispatch]);

  // Ensure the user is authenticated before proceeding
  useEffect(() => {
    if (!isAuthenticated && isPaymentStart) {
      setIsPaymentStart(false);
      navigate("/auth/login");
    }
  }, [isAuthenticated, isPaymentStart, navigate]);

  return (
    <div className="flex flex-col mt-14">
      {/* Banner Image */}
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} className="h-full w-full object-cover object-center" alt="Checkout Banner" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 mt-5 p-5 gap-5">
        {/* Address Selection */}
        <Address selectedId={currentSelectedAddress} setCurrentSelectedAddress={setCurrentSelectedAddress} />

        {/* Cart Items and Checkout */}
        <div className="flex flex-col gap-4">
          {cartItems?.items?.length > 0 &&
            cartItems.items.map((item, index) => (
              <UserCartItemsContent key={item.productId || index} cartItem={item} />
            ))}

          {/* Total Amount */}
          <div className="mt-8 space-y-4 bg-emerald-100 rounded-md p-5">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">₹ {totalCartAmount}</span>
            </div>
          </div>

          {/* Checkout Button */}
          <div className="mt-4 w-full">
            <Button onClick={handleInitiatePayment} className="bg-emerald-700" disabled={isPaymentStart}>
              {isPaymentStart ? "Processing..." : "Checkout With PayPal"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shoppingcheckout;
