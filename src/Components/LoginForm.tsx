import { signInWithEmailAndPassword } from "firebase/auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Button, Label, TextInput } from "flowbite-react";
import { Dispatch, SetStateAction } from "react";

type LoginFormProps = {
    setShowLogin: Dispatch<SetStateAction<boolean>>,
};

interface LoginForm  {
    email : string,
    passwords : string
};
export const LoginForm = ({setShowLogin}: LoginFormProps) => {
    const { register, formState: { errors }, handleSubmit } = useForm<LoginForm>();
    const navigate = useNavigate();

    const onSubmitLogin: SubmitHandler<LoginForm> = (data) =>{
        signInWithEmailAndPassword(auth, data.email, data.passwords)
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
    }


    return(<>
        <form onSubmit={handleSubmit(onSubmitLogin)}>
                <div className='mb-2 block'>
                  <Label htmlFor='email' value='Your email' />
                </div>
                <TextInput {...register("email", {
                    
                    pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
                })} placeholder='name@company.com'/>
                {errors.email && <p className="text-red-500 text-sm my-1">Invalid Pattern</p>}
                <div className='mb-2 block'>
                  <Label htmlFor='password' value='Your password' />
                </div>
                <TextInput {...register("passwords", { required: true })} />
                {errors.passwords && <p className="text-red-500 text-sm my-1">Password is required</p>}
                <div className='w-full'>
                  <Button type="submit" className=" text-white bg-pink-300 hover:bg-pink-200 text-center mt-5 ">Log in</Button>
                </div>
                
        </form>
    </>
    
    );

}