import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { auth } from "../firebase";
import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface RegisterForm {
    username : string,
    email : string,
    passwords : string,
    confirmPW: string
}
export const RegisterForm = () => {
    const { register, formState: { errors }, handleSubmit, watch } = useForm<RegisterForm>();
    const [isEmailinUse,setIsEmailinUse ] = useState(false);
    const {signUpFirebase, tokenRefreshedFirebase, updateProfileFirebase} = useAuth();
    const navigate = useNavigate();

    const isEmailAlreadyinUse = (email: string):any =>{
        const url: string = `http://localhost:8081/admin/checkemail?email=${email}`;
        return fetch(url)
            .then(response => response.json()); 
      }
    const onSubmitRegister: SubmitHandler<RegisterForm> = (data) =>{
      signUpFirebase(data.email, data.passwords).then((userCredential: any)=>{

        updateProfileFirebase(
          { 
            displayName: data.username,
          }
        );


          const setUserClaimUrl: string = `http://localhost:8081/admin/user-claims/${userCredential.user.uid}`;
          const setnewUsertoDatabase: string = `http://localhost:8081/admin/register`;
          fetch(setUserClaimUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
          }).then(()=>{
            // signOutFirebase();
            // logInFirebase(data.email, data.passwords);
            // console.log(userCredential);
            tokenRefreshedFirebase();
            console.log(1);
            console.log(userCredential);
            navigate("/home");
          });
    
          fetch(setnewUsertoDatabase, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: data.username, email: data.email})
          });
          return userCredential.user.uid;
    
      }).catch((err: any) => {
        console.log(err);
        setIsEmailinUse(true);
      });
    
    
      }

    return(
        <>
        <form onSubmit={handleSubmit(onSubmitRegister)}>
                <div className='mb-2 block'>
                  <Label htmlFor='email' value='Your username' />
                </div>
                <TextInput {...register("username", { minLength: 6 })} />                
                {errors.username && <p className="text-red-500 text-sm my-1">Username is too short</p>}

                <div className='mb-2 block'>
                  <Label htmlFor='email' value='Your email' />
                </div>
                <TextInput {...register("email", {
                    
                    required: true,
                    pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                   
                    
                })} placeholder='name@company.com' onFocus={()=>setIsEmailinUse(false)}/>
                {errors.email?.type == "pattern" && <p className="text-red-500 text-sm my-1">Invalid Pattern</p>}
                {errors.email?.type == "required" && <p className="text-red-500 text-sm my-1">Email is required</p>}
                {isEmailinUse && <p className="text-red-500 text-sm my-1">Email already in use</p>}
                <div className='mb-2 block'>
                  <Label htmlFor='password' value='Enter password' />
                </div>
                <TextInput {...register("passwords", { required: true })} />
                {errors.passwords && <p className="text-red-500 text-sm my-1">Password is required</p>}

                <div className='mb-2 block'>
                  <Label htmlFor='password2' value='Confirm password' />
                </div>
                <TextInput {...register("confirmPW", { 
                    required: true,
                    validate: (val: string) => {
                        if (watch('passwords') != val) {
                          return "Your passwords do no match";
                        }
                      }
                     })} />
                {errors.confirmPW && <p className="text-red-500 text-sm my-1">{errors.confirmPW.message}</p>}
                <div className='w-full'>
                  <Button type="submit" className=" text-white bg-pink-300 hover:bg-pink-200 text-center mt-5 ">Create</Button>
                </div>
                
        </form>
    </>
    )
}