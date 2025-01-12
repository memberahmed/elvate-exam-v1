
declare type User = {
    "_id": string,
    "username": string,
    "firstName": string,
    "lastName": string,
    "email": string,
    "phone": string,
    "role": string,
    "isVerified": boolean,
    "createdAt": string,
    "passwordResetCode": string,
    "passwordResetExpires": string,
    "resetCodeVerified": boolean,
    "passwordChangedAt": string
}

declare type LoginResponse = {
    user : User
}

declare type LoginForm = {
    email : string,
    password : string,
}
declare type RegisterForm = {
    "username":string,
    "firstName":string,
    "lastName":string,
    "email": string,
    "password":string,
    "rePassword":string,
    "phone":string,
}
declare type RegisterResponse = {
    user : User
}