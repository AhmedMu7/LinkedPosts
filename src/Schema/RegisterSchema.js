import * as zod from 'zod'

export const schema = zod.object({

    name: zod.string().nonempty('Name is required')
          .min(3,'Name must be at least 3 characters')
          .max(20,'Name must be at most 20 characters'),

    email: zod.string().nonempty('Email is required')
           .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ , 'Email is invalid'),

    password: zod.string().nonempty('Password is required')
              .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ , 'Password is invalid'),
    
    rePassword: zod.string().nonempty('Repassword is required'),

    dateOfBirth: zod.coerce.date('Date is requierd').refine((value)=>{ 
    
        const userAge = value.getFullYear();
        const nowYear = new Date().getFullYear();
        const diff = nowYear - userAge;
    
        return diff >= 18
    }, 'Age must be greater than 18'),


    gender: zod.string().nonempty('Gender is required')


}).refine((data)=> data.rePassword === data.password ,{ path:['rePassword'] , message:'Repassword and password dont match'});