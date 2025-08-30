import { Button, Input, Select, SelectItem } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { sendLoginData } from '../services/loginService'
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { schema } from '../Schema/LoginShcema'
import { AuthContext } from '../Context/AuthContext'
import { getProfileData } from '../services/ProfileService'



 
 


export default function Login() {



  const {isLoggedin , setIsLoggedin , setProfiledata , Profiledata} = useContext(AuthContext)
  
  let navigate = useNavigate()

  const [apiError, setapiError] = useState(null)

  const {handleSubmit , register ,formState:{errors ,touchedFields}} = useForm({

    defaultValues : {
      email:'',
      password:'',

    },

    resolver:zodResolver(schema),
            
    mode :'onBlur',
    reValidateMode : 'onBlur',

  })



  async function login(data){

    const response = await sendLoginData(data)


    if(response.message){
      
      navigate('/')
      localStorage.setItem('token' , response.token)
      setIsLoggedin(response.token)
      
   
    }
    else{
      setapiError(response.error)
    }
  }


  return <>
  
            <div className=" bg-white shadow-2xl p-8 rounded-2xl min-w-md">
            <h1 className=' text-center mb-4 text-3xl'>Log in</h1>
            <form onSubmit={handleSubmit(login)} className=' flex flex-col gap-4'>
                

                <Input isInvalid={Boolean(errors.email && touchedFields.email)} errorMessage ={errors.email?.message} variant='bordered' label="Email" {...register('email')} type="email" />
                
                <Input isInvalid={Boolean(errors.password && touchedFields.password) } errorMessage ={errors.password?.message} variant='bordered' label="Password" {...register('password')} type="password" />
            

                <Button type='submit' >Log in</Button>
                <p>Dont have an account ? <Link  className=' text-blue-700' to={'/register'}>Register Now </Link> </p>
                {apiError && <p className=' text-center text-red-500'> {apiError} </p>}
            </form>
        </div>

  </>
}
