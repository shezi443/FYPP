"use client"
import React, { useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Checkoutform from "../checkout/CheckoutForm";

import { useSearchParams } from "next/navigation";



function Payment () {
  
  const searchParam = useSearchParams();
  let amount = 0;
  if (searchParam) {
    amount = Number(searchParam.get('amount') ?? 0);
  }
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as any);
  const options: any = {
    mode: 'payment',
    amount: amount,
    currency: 'usd',
  };
    return (
       <Elements stripe={stripePromise} options={options}>
        <Checkoutform amount={amount} />
       </Elements>
    )
}
export default Payment
