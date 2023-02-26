import { signInWithEmailAndPassword, getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth, app } from "../firebase";
import { Button, Label, Modal, TextInput } from "flowbite-react";




export const WikiLogin = () => {
  const[showRegister, setShowregister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [error, setError] = useState("");
  const onLogin = (e: any) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/home");
        console.log(user);
        setShowLogin(false);
      })
      .catch((error: any) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const isEmailAlreadyinUse = ():any =>{
    const url: string = `http://localhost:8081/admin/checkemail?email=${email}`;
    return fetch(url)
        .then(response => response.json()); 
  }
  const createNewUserHandle = (e: any): any=>{
    e.preventDefault();
    if(error == ""){
      createUserWithEmailAndPassword(auth, email, password).then((userCredential)=>{
          const setUserClaimUrl: string = `http://localhost:8081/admin/user-claims/${userCredential.user.uid}`;
          const setnewUsertoDatabase: string = `http://localhost:8081/admin/register`;
          fetch(setUserClaimUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
          });

          fetch(setnewUsertoDatabase, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: username, email: email})
          });


      })
    
    }
   
  }

  const validdation = ():boolean => {

    return true;

  }
  
  const onRegister = (e: any) => {

  }

  return (
    <>
      <React.Fragment>
        <Button className="text-white bg-pink-300 hover:bg-pink-200 text-center" onClick={() => setShowLogin(true)}>Login</Button>
        <Modal
          show={showLogin}
          size='md'
          popup={true}
          onClose={() => setShowLogin(false)}
        >
          <Modal.Header />
          <Modal.Body>
            { !showRegister ? 
            <>           
            <div className='space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8'>
              <h3 className='text-xl font-medium text-gray-900 dark:text-white'>
                Sign in
              </h3>
              <div>
                <div className='mb-2 block'>
                  <Label htmlFor='email' value='Your email' />
                </div>
                <TextInput
                  id='email'
                  placeholder='name@company.com'
                  required={true}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <div className='mb-2 block'>
                  <Label htmlFor='password' value='Your password' />
                </div>
                <TextInput
                  id='password'
                  type='password'
                  required={true}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className='flex justify-between'>
                <a
                  href='/modal'
                  className='text-sm text-blue-700 hover:underline dark:text-blue-500'
                >
                  Lost Password?
                </a>
              </div>
              <div className='w-full'>
                <Button onClick={onLogin} className=" text-white bg-pink-300 hover:bg-pink-200 text-center ">Log in</Button>
              </div>
              <div className='text-sm font-medium text-gray-500 dark:text-gray-300'>
                Not registered?{" "}
                <a
                  href="#"
                  className=' text-sm text-blue-700 hover:underline dark:text-blue-500 '
                  onClick={()=> setShowregister(true)}
                >
                  Create account
                </a>
              </div>
            </div>
            </> : <>
            <div className='space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8'>
              <h3 className='text-xl font-medium text-gray-900 dark:text-white'>
                Register
              </h3>
              <div>
                <div className='mb-2 block'>
                  <Label htmlFor='username' value='Your Username' />
                </div>
                <TextInput
                  id='username'
                  placeholder='enter username'
                  required={true}
                  onChange={(e) => setUsername(e.target.value)}
                  onBlur={()=>{
                    if(username == "") setError("Please enter username"); 
                    else if(username.length < 5) setError("Username is too short"); 
                  }}
                />
              </div>
              <div>
                <div className='mb-2 block'>
                  <Label htmlFor='email' value='Your Email' />
                </div>
                <TextInput
                  id='email'
                  placeholder='name@company.com'
                  required={true}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={()=>{
                    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                    if(!email.match(mailformat)) setError("Invalid email form");
                    else setError("");
                    if(email == "") setError("Please enter email");
                    else setError("");
                    isEmailAlreadyinUse().then((data:any)=>{
                      if(data) setError("Email is already in use");
                      else setError("");
                    }) 
                  }}
                />
              </div>
              <div>
                <div className='mb-2 block'>
                  <Label htmlFor='password' value='Your Password' />
                </div>
                <TextInput
                  id='password'
                  type='password'
                  placeholder='Enter password'
                  required={true}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <div className='mb-2 block'>
                  <Label htmlFor='password' value='Confirm Password' />
                </div>
                <TextInput
                  id='password'
                  placeholder='Confirm password'
                  type='password'
                  required={true}
                  onChange={(e) => {
                    setReEnterPassword(e.target.value);
                    
                    
                  }}
                  onBlur={()=>{
                    if(password != reEnterPassword) {
                      setError("Passwords do not match !")
                    } else {
                      setError("");
                      console.log(error);
                    };
                  }}
                />
              </div>
              <div>
                <p className="text-red-500">{(error != "") ? error : <></> }</p>
              </div>
              
              <div className='w-full'>
                <Button onClick={createNewUserHandle} className=" text-white bg-pink-300 hover:bg-pink-200 text-center ">Log in</Button>
              </div>
              <div className='text-sm font-medium text-gray-500 dark:text-gray-300'>
                Already have an account{" "}
                <a
                  href="#"
                  className=' text-sm text-blue-700 hover:underline dark:text-blue-500 '
                  onClick={()=> setShowregister(false)}
                >
                  Login
                </a>
              </div>
            </div>
            </>
            }
          </Modal.Body>
        </Modal>
      </React.Fragment>

    </>
  );
};
