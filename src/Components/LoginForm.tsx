import { signInWithEmailAndPassword } from "firebase/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Button, Label, TextInput } from "flowbite-react";
import { Dispatch, SetStateAction, useState } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { startSession } from "../LocalSession";

type LoginFormProps = {
    setShowLogin: Dispatch<SetStateAction<boolean>>,
};

interface LoginForm  {
    email : string,
    passwords : string
};
export const LoginForm = ({setShowLogin}: LoginFormProps) => {
    const [loginFail, setLoginFail] = useState(false);
    const {logInFirebase} = useAuth();
    const { register, formState: { errors }, handleSubmit } = useForm<LoginForm>();
    const navigate = useNavigate();

    const onSubmitLogin: SubmitHandler<LoginForm> = (data) =>{
        //signInWithEmailAndPassword(auth, data.email, data.passwords)
        
        logInFirebase(data.email, data.passwords)
        .then((userCredential:  any ) => {
          // Signed in
          const user = userCredential.user;
          navigate(window.location.pathname);
          console.log(user);
          setShowLogin(false);
          startSession(data.email, user.accessToken, user.displayName );
        })
        .catch((error: any) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          setLoginFail(true);
        });
    }


    return(<>
        <form onSubmit={handleSubmit(onSubmitLogin)}>
                
                <div className='mb-2 block'>
                  <Label htmlFor='email' value='Your email' />
                </div>
                <TextInput {...register("email", {
                    
                    pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                })} placeholder='name@company.com' onFocus={()=>{setLoginFail(false)}} />
                {errors.email && <p className="text-red-500 text-sm my-1">Invalid Pattern</p>}
                <div className='mb-2 block'>
                  <Label htmlFor='password' value='Your password' />
                </div>
                <TextInput {...register("passwords", { required: true })} onFocus={()=>{setLoginFail(false)}} />
                {errors.passwords && <p className="text-red-500 text-sm my-1">Password is required</p>}
                {loginFail && <p className="text-red-500 text-sm my-1">Incorrect email or passwords</p>}
                <div className='w-full'>
                  <Button type="submit" className=" text-white bg-pink-300 hover:bg-pink-200 text-center mt-5 ">Log in</Button>
                </div>
                
        </form>
    </>
    
    );

}