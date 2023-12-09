
import React, { use } from 'react';
import { useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
function Checkoutform({amount}: {amount: number}) { 
    const stripe:any=useStripe();
    const elements=useElements();
const handleSubmit = async (event:any) => {
    event.preventDefault();
    if (elements == null) {
      return;
    }
const {error:submitError}=await elements.submit(); 
if (submitError) {
    return;
}
const res = await fetch('/api/create-intent', {
    method: 'POST',
    body: JSON.stringify({
      amount: amount,
    }),
});
const secretKey = await res.json();
console.log(secretKey);
const {error} =await stripe.confirmPayment(
    {
    clientSecret:secretKey,
    elements,
    confirmParams:{
        return_url: "https://fyyp-q8ydz782v-shezi443.vercel.app/trips"
    },
}

);
}
    return (
        

       <div className='flex flex-col justify-center items-center w-full mt-6'>
        
        <h1 className='m-6 font-bold'> -</h1>
        <form onSubmit={handleSubmit}
        className='max-w-sm'
        >
        <PaymentElement />
        <button type="submit"
        className='w-full bg-rose-500 p-2 text-white rounded-lg mt-2'
         disabled={!stripe || !elements}>
         Amount to Pay : {amount} Rs
        </button>
        </form>
        </div>
        
    )
    }
    export default Checkoutform
