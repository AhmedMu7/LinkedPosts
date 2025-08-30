import { Button, Input, Select, SelectItem } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod';
import { p, q } from 'framer-motion/client';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { data, Link, useNavigate } from 'react-router-dom';
import { sendRegisterData } from '../services/authService';
import { schema } from '../Schema/RegisterSchema';












export default function Register() {

    let navigate = useNavigate()

    const [loading, setloading] = useState(false)
    const [apiError, setapiError] = useState(null)

    const {handleSubmit , register , formState:{errors , touchedFields} }= useForm({

        defaultValues:{
            name:'',
            email:'',
            password:'',
            rePassword:'',
            dateOfBirth:'',
            gender:''
        },

        resolver : zodResolver(schema),
        
        mode :'onBlur',
        reValidateMode : 'onBlur',

    })


    async function signup(userdata){

    setloading(true)
        
    const response = await sendRegisterData(userdata)

    setloading(false)

    if(response.message){
        
        navigate('/login')

    }
    else{

        setapiError(response.error)

    }
    
    }





    return <>

        <div className=" bg-white shadow-2xl p-8 rounded-2xl min-w-md">
            <h1 className=' text-center mb-4 text-3xl'>Register Now</h1>
            <form onSubmit={handleSubmit(signup)} className=' flex flex-col gap-4'>
                <Input isInvalid={Boolean(errors.name && touchedFields.name) } errorMessage ={errors.name?.message} variant='bordered' label="Name" {...register('name')} type="text" />

                <Input isInvalid={Boolean(errors.email && touchedFields.email)} errorMessage ={errors.email?.message} variant='bordered' label="Email" {...register('email')} type="email" />
                
                <Input isInvalid={Boolean(errors.password && touchedFields.password) } errorMessage ={errors.password?.message} variant='bordered' label="Password" {...register('password')} type="password" />
                
                <Input isInvalid={Boolean(errors.rePassword && touchedFields.rePassword) } errorMessage ={errors.rePassword?.message} variant='bordered' label="Repassword" {...register('rePassword')} type="password" />
                <div className='flex gap-2'>
                    <Input isInvalid={Boolean(errors.dateOfBirth && touchedFields.dateOfBirth) } errorMessage ={errors.dateOfBirth?.message} variant='bordered' label="DateOfBirth" {...register('dateOfBirth')} type="date" />

                    <Select isInvalid={Boolean(errors.gender && touchedFields.gender) } errorMessage ={errors.gender?.message} variant='bordered' {...register('gender')} label="Select your gender  ">

                        <SelectItem key={'male'}>Male</SelectItem>
                        <SelectItem key={'female'}>Female</SelectItem>

                    </Select>
                </div>

                <Button isLoading={loading} type='submit' >Register</Button>
                <p >Already have an account ? <Link className=' text-blue-700' to={'/login'}>Login </Link> </p>
                {apiError && <p className=' text-center text-red-500'> {apiError} </p>}

            </form>
        </div>


    </>
}
