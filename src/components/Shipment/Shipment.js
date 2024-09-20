import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css';
import { UserContext } from '../../App';
import ProcessPayment from '../ProcessPayment/ProcessPayment';







const Shipment = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const [loggedInUser]=useContext(UserContext);

  const onSubmit = (data) => console.log(data)

  console.log(watch("example")) 
  return (
   
    <div className="row">
      <div className="col-md-6">
      <form  className="ship-form" onSubmit={handleSubmit(onSubmit)}>
      
      

     
      <input defaultValue={loggedInUser.name} {...register("name",  { required: true })} placeholder="your name" />
      
      {errors.Name && <span className="error">This field is required</span>}



      <input defaultValue={loggedInUser.email} {...register("email", { required: true })} placeholder="your email"/>
      
      {errors.Email && <span className="error">This field is required</span>}



      <input {...register("Adress", { required: true })} placeholder="your adress"/>
      
      {errors.Adress && <span className="error">This field is required</span>}



      <input {...register("PhoneNumber", { required: true })} placeholder="your phonenumber" />
      
      {errors.PhoneNumber && <span className="error">This field is required</span>}

      <input type="submit" />
    </form>
      </div>
      <div className="col-md-6">
       <ProcessPayment></ProcessPayment>
      </div>

    </div>

    
  )
};

export default Shipment;
