import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css';
import { UserContext } from '../../App';



const Shipment = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const [loggedInUser,setLoggedInUser]=useContext(UserContext);

  const onSubmit = (data) => console.log(data)

  console.log(watch("example")) 
  return (
   
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
  )
};

export default Shipment;
