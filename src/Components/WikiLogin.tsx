import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { Button, Label, Modal, TextInput } from "flowbite-react";

export const WikiLogin = () => {
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  return (
    <>
      <React.Fragment>
        <Button onClick={() => setShowLogin(true)}>Login</Button>
        <Modal
          show={showLogin}
          size='md'
          popup={true}
          onClose={() => setShowLogin(false)}
        >
          <Modal.Header />
          <Modal.Body>
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
                <Button onClick={onLogin}>Log in</Button>
              </div>
              <div className='text-sm font-medium text-gray-500 dark:text-gray-300'>
                Not registered?{" "}
                <a
                  href='/modal'
                  className='text-blue-700 hover:underline dark:text-blue-500'
                >
                  Create account
                </a>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </React.Fragment>

      {/* <main>
        <section>
          <div>
            <p> FocusApp </p>

            <form>
              <div>
                <label htmlFor='email-address'>Email address</label>
                <input
                  id='email-address'
                  name='email'
                  type='email'
                  required
                  placeholder='Email address'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor='password'>Password</label>
                <input
                  id='password'
                  name='password'
                  type='password'
                  required
                  placeholder='Password'
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <button onClick={onLogin}>Login</button>
              </div>
            </form>

            <p className='text-sm text-white text-center'>
              No account yet? <NavLink to='/signup'>Sign up</NavLink>
            </p>
          </div>
        </section>
      </main> */}
    </>
  );
};
