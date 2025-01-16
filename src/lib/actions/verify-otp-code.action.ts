'use server';

import { JSON_HEADER } from "../constants/api.contstans";


const baseUrl = process.env.Api + '/auth/verifyResetCode'

export default async function verifyResetCode(userData : VerifyForm){

    const response = await fetch(baseUrl , {
        method : 'POST',
        body :JSON.stringify(userData),
        headers : {
            ...JSON_HEADER
        }
        
    })
    const payload:verifyResetCodeResponse = await response.json()
    return payload
}