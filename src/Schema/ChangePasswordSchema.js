import { path } from 'framer-motion/client'
import * as zod from 'zod'

export const schema = zod.object({

    password: zod.string().nonempty('Password is required')
              .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ , 'Password is invalid'),
    
    newPassword: zod.string().nonempty('Password is required')
              .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ , 'Password is invalid')


}).refine((data)=> data.password !== data.newPassword , {path:['newPassword'] , message : `Current Password and New Password Shouldn't be the same `} )