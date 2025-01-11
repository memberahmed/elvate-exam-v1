'use server';

import { JSON_HEADER } from "../constants/api.contstans";

const baseUrl = process.env.API + '/auth/signup';

export default async function registerAction(userData: RegisterForm) {
    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            ...JSON_HEADER
        },
        body: JSON.stringify(userData),
    });
    const payload:ApiResponse<RegisterResponse> = await response.json();

    return payload
}