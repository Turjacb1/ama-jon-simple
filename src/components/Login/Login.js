
// //with html css


// import firebase from "firebase/compat/app";
// import firebaseConfig from './FirebaseConfig';
// import "firebase/compat/auth";
// import { useContext, useState } from 'react';
// import { UserContext } from "../../App";




// firebase.initializeApp(firebaseConfig);






// function Login() {

//   const [newUser,setNewUser]=useState(false);


//   const [user,setUser]=useState({
//     isSignedIn:false,
//     name:'',
//     email:'',
//     password:'',
//     photo:''

//   });

//   const [loggedInUser,setLoggedInUser]=useContext(UserContext);



//   var provider = new firebase.auth.GoogleAuthProvider();
//   const handleSignIn=()=>{
//     firebase.auth()
//   .signInWithPopup(provider)
//   .then(result => {
//     const {displayName,photoURL,email}=result.user;
    
//     const signInUser={
//       isSignedIn:true,
      
//       name:displayName,
//       email:email,
//       photo:photoURL
//     }
//     setUser(signInUser);
//     console.log(displayName,email,photoURL);
    
//   })
//   .catch(err=>{
//     console.log(err);
//   })
//   }
 



//   const handleSignOUt=()=>{
//     firebase.auth().signOut()
//     .then(result => {
     
//     const signOutUser={
//       isSignedIn:false,
//       name:'',
//       email:'',
//       password:'',
//       photo:'',
//       error:'',
//       success:false
//     }
//     setUser(signOutUser);
    

//     }).catch((error) => {
     
//     });

//   }




// const handleBlur=(event)=>
// {
// let isFormValid=true;



// if(event.target.name==="email")
// {
// isFormValid=/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(event.target.value);

// }


// if(event.target.name==="password")
// {
//   const isPassword=event.target.value.length>6;
// const passwordNumber=/\d{1}/.test(event.target.value);
//   isFormValid=isPassword && passwordNumber;
// }
// if(isFormValid)
// {
//   const newUserInfo={...user};
//   newUserInfo[event.target.name]=event.target.value;
//   setUser(newUserInfo);
// }
// }



// const handleSubmit =(event)=>{
//   console.log( user.email,user.password)
//   if(newUser && user.email && user.password)
//   {
//     firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
//     .then((res) => {
//       // Signed in 
//       const newUserInfo={...user};
//       newUserInfo.error='';
//       newUserInfo.success=true;
//       setUser(newUserInfo);
//       updateUserName(user.name);
//       // ...
//     })
//     .catch((error) => {
//       const newUserInfo={...user};
//       newUserInfo.error=error.message;
//       newUserInfo.success=false;
//       setUser(newUserInfo);
//     });
//   }



//   if(!newUser && user.email && user.password)
//   {
//     firebase.auth().signInWithEmailAndPassword(user.email, user.password)
//   .then((res) => {
//     // Signed in
//     const newUserInfo={...user};
//       newUserInfo.error='';
//       newUserInfo.success=true;

//       setUser(newUserInfo);
//       setLoggedInUser(newUserInfo);
//     // ...
//     console.log('sign in user info',res.user);
//   })
//   .catch((error) => {
//     const newUserInfo={...user};
//     newUserInfo.error=error.message;
//     newUserInfo.success=false;
//     setUser(newUserInfo);
//   });
//   }
//   event.preventDefault();




// const updateUserName= name =>{

// const user = firebase.auth().currentUser;

// user.updateProfile({
//   displayName: name
 
// }).then(() => {
//   console.log("update user successfully")
// }).catch((error) => {
//   console.log(error)
// });  

// }


// }

//   return (
//     <div style={{textAlign:'center'}}>
//       {
//         user.isSignedIn ? (<button onClick={handleSignOUt}>Sign Out</button>) :
//         (<button onClick={handleSignIn}>sign in</button>)
//       }
//       <br/>
//       <button>Sign Using Facebook</button>
     
//       {
//         user.isSignedIn && <div>
//           <p>{user.name}</p>
//           <p>{user.email}</p>
//           </div>
//       }

//       <p>our own Aunthintication</p>
//      <input type="checkbox" onChange={()=>setNewUser(!newUser)} name="newUser" id=""></input>
//      <label htmlFor="newUser">New User Sign Up</label>
//       <form onSubmit={handleSubmit}>
//      {newUser && <input  type="text" onBlur={handleBlur } name="name" placeholder="your name"></input>}
//      <br/>
//       <input type="text"  onBlur={handleBlur}  name="email" placeholder="your email adress"></input>
//       <br/>
//       <input type="password"  onBlur={handleBlur} name="password" placeholder="password"></input>
//       <br/>
//       <input type="submit" value={newUser ?'Sign Up' :'Sign In'}></input>
//       </form>
//       <p style={{color:'red'}}>{user.error}</p>
//       { user.success && <p style={{color:'green'}}>user {newUser ?'created':'Logged in'} successfuly</p>}
//     </div>
//   );
// }

// export default Login;














import React, { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { UserContext } from '../../App';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import firebaseConfig from './FirebaseConfig';
import { getAuth, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";

firebase.initializeApp(firebaseConfig);

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: '',
    error: '',
    success: false,
    message: ''
  });





  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/' } };

  const provider = new firebase.auth.GoogleAuthProvider();

  const handleSignIn = () => {
    firebase.auth().signInWithPopup(provider)
      .then(result => {
        const { displayName, photoURL, email } = result.user;
        const signInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photo: photoURL
        };
        setUser(signInUser);
        setLoggedInUser(signInUser);
        navigate(from);
      })
      .catch(err => {
        console.log(err);
      });
  };




  const handleSignOut = () => {
    firebase.auth().signOut()
      .then(() => {
        const signOutUser = {
          isSignedIn: false,
          name: '',
          email: '',
          password: '',
          photo: '',
          error: '',
          success: false
        };
        setUser(signOutUser);
        setLoggedInUser({});
      }).catch(error => {
        console.log(error);
      });
  };



  const handleBlur = (event) => {
    let isFormValid = true;

    if (event.target.name === "email") {
      isFormValid = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i.test(event.target.value);
    }

    if (event.target.name === "password") {
      const isPassword = event.target.value.length > 6;
      const passwordNumber = /\d{1}/.test(event.target.value);
      isFormValid = isPassword && passwordNumber;
    }

    if (isFormValid) {
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  };



  const handleSubmit = (event) => {
    event.preventDefault();

    if (newUser && user.email && user.password) {
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .then(res => {
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          verifyEmail();
          navigate(from);
        })
        .catch(error => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }



    const verifyEmail = () => {
      const auth = getAuth();
      sendEmailVerification(auth.currentUser)
        .then(() => {
          // Email verification sent
        });
    };



    if (!newUser && user.email && user.password) {
      firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          const newUserInfo = { ...user };
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          navigate(from);
        })
        .catch(error => {
          const newUserInfo = { ...user };
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        });
    }
  };



  const handlePasswordReset = () => {
    if (!user.email) {
      const newUserInfo = { ...user };
      newUserInfo.error = "Please enter your email address first";
      setUser(newUserInfo);
      return;
    }


    
    const auth = getAuth();
    sendPasswordResetEmail(auth, user.email)
      .then(() => {
        const newUserInfo = { ...user };
        newUserInfo.error = '';
        newUserInfo.success = true;
        newUserInfo.message = "Password reset email sent!";
        setUser(newUserInfo);
      })
      .catch(error => {
        const newUserInfo = { ...user };
        newUserInfo.error = error.message;
        newUserInfo.success = false;
        setUser(newUserInfo);
      });
  };






  return (
    <Container style={{ padding: '20px', borderRadius: '10px', backgroundColor: '#f8f9fa', textAlign: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        {user.isSignedIn ? (
          <Button onClick={handleSignOut} variant="danger" style={{ marginBottom: '20px' }}>Sign Out</Button>
        ) : (
          <Button onClick={handleSignIn} variant="primary" style={{ marginBottom: '20px' }}>Sign in with Google</Button>
        )}
        <Button variant="primary" style={{ marginBottom: '20px' }}>Sign in using Facebook</Button>
        {user.isSignedIn && (
          <div>
            <p>{user.name}</p>
            <p>{user.email}</p>
          </div>
        )}
        <p>Our own Authentication</p>
        <Form.Check
          type="checkbox"
          label="New User Sign Up"
          onChange={() => setNewUser(!newUser)}
          id="newUser"
          style={{ marginBottom: '20px' }}
        />
      </div>
      <Form onSubmit={handleSubmit}>
        {newUser && (
          <Form.Group>
            <Form.Label>Your Name</Form.Label>
            <Form.Control type="text" name="name" onBlur={handleBlur} placeholder="Your name" style={{ marginBottom: '20px' }} />
          </Form.Group>
        )}
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" name="email" onBlur={handleBlur} placeholder="Your email address" style={{ marginBottom: '20px' }} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" onBlur={handleBlur} placeholder="Password" style={{ marginBottom: '20px' }} />
        </Form.Group>
        <Button variant="success" type="submit" style={{ width: '100%' }}>
          {newUser ? 'Sign Up' : 'Sign In'}
        </Button>
      </Form>

      {/* Forgot Password Button */}
      {!newUser && (
        <Button variant="link" onClick={handlePasswordReset} style={{ marginTop: '20px' }}>
          Forgot Password?
        </Button>
      )}

      {user.error && <Alert variant="danger" style={{ marginTop: '20px' }}>{user.error}</Alert>}
      {user.success && (
        <Alert variant="success" style={{ marginTop: '20px' }}>
          {user.message || `User ${newUser ? 'created' : 'logged in'} successfully`}
        </Alert>
      )}
    </Container>
  );
}

export default Login;










//with react bootstrap


// import firebase from "firebase/compat/app";
// import firebaseConfig from './FirebaseConfig';
// import "firebase/compat/auth";
// import { useContext, useState } from 'react';
// import { UserContext } from "../../App";
// import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap';

// firebase.initializeApp(firebaseConfig);

// function Login() {

//   const [newUser, setNewUser] = useState(false);
//   const [user, setUser] = useState({
//     isSignedIn: false,
//     name: '',
//     email: '',
//     password: '',
//     photo: ''
//   });

//   const [loggedInUser, setLoggedInUser] = useContext(UserContext);

//   var provider = new firebase.auth.GoogleAuthProvider();

//   const handleSignIn = () => {
//     firebase.auth()
//       .signInWithPopup(provider)
//       .then(result => {
//         const { displayName, photoURL, email } = result.user;
//         const signInUser = {
//           isSignedIn: true,
//           name: displayName,
//           email: email,
//           photo: photoURL
//         };
//         setUser(signInUser);
//         console.log(displayName, email, photoURL);
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   };

//   const handleSignOut = () => {
//     firebase.auth().signOut()
//       .then(result => {
//         const signOutUser = {
//           isSignedIn: false,
//           name: '',
//           email: '',
//           password: '',
//           photo: '',
//           error: '',
//           success: false
//         };
//         setUser(signOutUser);
//       }).catch((error) => {
//         console.log(error);
//       });
//   };

//   const handleBlur = (event) => {
//     let isFormValid = true;

//     if (event.target.name === "email") {
//       isFormValid = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i.test(event.target.value);
//     }

//     if (event.target.name === "password") {
//       const isPassword = event.target.value.length > 6;
//       const passwordNumber = /\d{1}/.test(event.target.value);
//       isFormValid = isPassword && passwordNumber;
//     }

//     if (isFormValid) {
//       const newUserInfo = { ...user };
//       newUserInfo[event.target.name] = event.target.value;
//       setUser(newUserInfo);
//     }
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     console.log(user.email, user.password);

//     if (newUser && user.email && user.password) {
//       firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
//         .then((res) => {
//           const newUserInfo = { ...user };
//           newUserInfo.error = '';
//           newUserInfo.success = true;
//           setUser(newUserInfo);
//           updateUserName(user.name);
//         })
//         .catch((error) => {
//           const newUserInfo = { ...user };
//           newUserInfo.error = error.message;
//           newUserInfo.success = false;
//           setUser(newUserInfo);
//         });
//     }

//     if (!newUser && user.email && user.password) {
//       firebase.auth().signInWithEmailAndPassword(user.email, user.password)
//         .then((res) => {
//           const newUserInfo = { ...user };
//           newUserInfo.error = '';
//           newUserInfo.success = true;
//           setUser(newUserInfo);
//           setLoggedInUser(newUserInfo);
//           console.log('sign in user info', res.user);
//         })
//         .catch((error) => {
//           const newUserInfo = { ...user };
//           newUserInfo.error = error.message;
//           newUserInfo.success = false;
//           setUser(newUserInfo);
//         });
//     }
//   };

//   const updateUserName = name => {
//     const user = firebase.auth().currentUser;

//     user.updateProfile({
//       displayName: name
//     }).then(() => {
//       console.log("update user successfully");
//     }).catch((error) => {
//       console.log(error);
//     });
//   };

//   return (
//     <Container style={{  padding: '20px', borderRadius: '10px', backgroundColor: '#f8f9fa' ,textAlign:'center'}}>
//       <div style={{ textAlign: 'center' }}>
//         {user.isSignedIn ? (
//           <Button onClick={handleSignOut} variant="danger" style={{ marginBottom: '20px' }}>Sign Out</Button>
//         ) : (
//           <Button onClick={handleSignIn} variant="primary" style={{ marginBottom: '20px' }}>Sign in with Google</Button>
//         )}
//         <Button variant="primary" style={{ marginBottom: '20px' }}>Sign in using Facebook</Button>
//         {user.isSignedIn && (
//           <div>
//             <p>{user.name}</p>
//             <p>{user.email}</p>
//           </div>
//         )}
//         <p>Our own Authentication</p>
//         <Form.Check
//           type="checkbox"
//           label="New User Sign Up"
//           onChange={() => setNewUser(!newUser)}
//           id="newUser"
//           style={{ marginBottom: '20px' }}
//         />
//       </div>
//       <Form onSubmit={handleSubmit}>
//         {newUser && (
//           <Form.Group>
//             <Form.Label>Your Name</Form.Label>
//             <Form.Control type="text" name="name" onBlur={handleBlur} placeholder="Your name" style={{ marginBottom: '20px' }} />
//           </Form.Group>
//         )}
//         <Form.Group>
//           <Form.Label>Email address</Form.Label>
//           <Form.Control type="email" name="email" onBlur={handleBlur} placeholder="Your email address" style={{ marginBottom: '20px' }} />
//         </Form.Group>
//         <Form.Group>
//           <Form.Label>Password</Form.Label>
//           <Form.Control type="password" name="password" onBlur={handleBlur} placeholder="Password" style={{ marginBottom: '20px' }} />
//         </Form.Group>
//         <Button variant="success" type="submit" style={{ width: '100%' }}>
//           {newUser ? 'Sign Up' : 'Sign In'}
//         </Button>
//       </Form>
//       {user.error && <Alert variant="danger" style={{ marginTop: '20px' }}>{user.error}</Alert>}
//       {user.success && (
//         <Alert variant="success" style={{ marginTop: '20px' }}>
//           User {newUser ? 'created' : 'logged in'} successfully
//         </Alert>
//       )}
//     </Container>
//   );
// }

// export default Login;


