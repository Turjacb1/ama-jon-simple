// import React, { useContext } from 'react';
// import { useForm } from 'react-hook-form';
// import './Shipment.css';
// import { UserContext } from '../../App';
// import ProcessPayment from '../ProcessPayment/ProcessPayment';






// const Shipment = () => {
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm()
//   const [loggedInUser]=useContext(UserContext);

//   const onSubmit = (data) => console.log(data)

//   console.log(watch("example")) 
//   return (
   
//     <div className="row">
//       <div className="col-md-6">
//       <form  className="ship-form" onSubmit={handleSubmit(onSubmit)}>
      
      

     
//       <input defaultValue={loggedInUser.name} {...register("name",  { required: true })} placeholder="your name" />
      
//       {errors.Name && <span className="error">This field is required</span>}



//       <input defaultValue={loggedInUser.email} {...register("email", { required: true })} placeholder="your email"/>
      
//       {errors.Email && <span className="error">This field is required</span>}



//       <input {...register("Adress", { required: true })} placeholder="your adress"/>
      
//       {errors.Adress && <span className="error">This field is required</span>}



//       <input {...register("PhoneNumber", { required: true })} placeholder="your phonenumber" />
      
//       {errors.PhoneNumber && <span className="error">This field is required</span>}

//       <input type="submit" />
//     </form>
//       </div>
//       <div className="col-md-6">
//        <ProcessPayment></ProcessPayment>
//       </div>

//     </div>

    
//   )
// };

// export default Shipment;






// import React, { useContext, useState } from 'react';
// import { useForm } from 'react-hook-form';
// import './Shipment.css';
// import { UserContext } from '../../App';
// import ProcessPayment from '../ProcessPayment/ProcessPayment';

// const Shipment = () => {
//   const { register, handleSubmit, watch, formState: { errors } } = useForm();
//   const [loggedInUser] = useContext(UserContext);
//   const [showPayment, setShowPayment] = useState(false); // State to toggle payment section

//   const onSubmit = (data) => {
//     console.log(data);
//     setShowPayment(true); // Show the payment option after form submission
//   };

//   return (
//     <div className="row">
//       <div className="col-md-6">
//         {!showPayment && (
//           <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
//             <input defaultValue={loggedInUser.name} {...register("name", { required: true })} placeholder="Your Name" />
//             {errors.name && <span className="error">This field is required</span>}

//             <input defaultValue={loggedInUser.email} {...register("email", { required: true })} placeholder="Your Email" />
//             {errors.email && <span className="error">This field is required</span>}

//             <input {...register("address", { required: true })} placeholder="Your Address" />
//             {errors.address && <span className="error">This field is required</span>}

//             <input {...register("phoneNumber", { required: true })} placeholder="Your Phone Number" />
//             {errors.phoneNumber && <span className="error">This field is required</span>}

//             <input type="submit" value="Submit Query" />
//           </form>
//         )}
//       </div>
      
//       <div className="col-md-6">
//         {showPayment && <ProcessPayment />} {/* Show payment only after form submission */}
//       </div>
//     </div>
//   );
// };

// export default Shipment;






import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css';
import { UserContext } from '../../App';
import ProcessPayment from '../ProcessPayment/ProcessPayment';

const Shipment = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loggedInUser] = useContext(UserContext);
    const [showPayment, setShowPayment] = useState(false);
    const [shipmentData, setShipmentData] = useState({});

    const onSubmit = (data) => {
        setShipmentData(data);
        setShowPayment(true);
    };

    return (
        <div className="row">
            <div className="col-md-6">
                {!showPayment && (
                    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
                        <input defaultValue={loggedInUser.name} {...register("name", { required: true })} placeholder="Your Name" />
                        {errors.name && <span className="error">This field is required</span>}

                        <input defaultValue={loggedInUser.email} {...register("email", { required: true })} placeholder="Your Email" />
                        {errors.email && <span className="error">This field is required</span>}

                        <input {...register("address", { required: true })} placeholder="Your Address" />
                        {errors.address && <span className="error">This field is required</span>}

                        <input {...register("phoneNumber", { required: true })} placeholder="Your Phone Number" />
                        {errors.phoneNumber && <span className="error">This field is required</span>}

                        <input type="submit" value="Submit Query" />
                    </form>
                )}
            </div>
            
            <div className="col-md-6">
                {showPayment && <ProcessPayment shipmentData={shipmentData} />}
            </div>
        </div>
    );
};

export default Shipment;
