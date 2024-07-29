import React from 'react';


const Cart = (props) => {
    const cart=props.cart;


   // const total=cart.reduce((total,prd)=>total+prd.price,0);//calcultion of total product price 
    let total=0;
    for(let i=0;i<cart.length;i++)
    {
        const product=cart[i];
        total= total +product.price * product.quantity;
    }




    let shipping=0;

    if(total>500.00)
    {
        shipping=0;
    }
    else if(total>200)
    {
      shipping=5.00;
    }
    else if(total>1 && total<200)
    {
        shipping=25.50;
    }


    const tax=(total/10).toFixed(2);
    const grandTotal=(total+shipping+Number(tax)).toFixed(2);


    const formatNumber=num=>
    {
        const precision=num.toFixed(2);
        return Number(precision);
    }

    return (
        <div >
            <h3 >Order Summary</h3>
            <h3>Items:{cart.length}</h3>
            <p> ProductPrice : {formatNumber(total)}</p>
            <p><small>Shipping Cost :{shipping}</small></p>
            <p><small>Tax +Vat: {tax}</small></p>
            <p>Total price: {grandTotal}</p>


            <br/>
            {
                props.children
            }
        </div>
    );
};

export default Cart;