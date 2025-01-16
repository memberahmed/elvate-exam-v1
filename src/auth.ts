import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { JSON_HEADER } from "./lib/constants/api.contstans";



export const authOption: NextAuthOptions = {
    pages : {
        signIn : '/login',
        error : '/login'
    },
    session :{
        strategy : 'jwt'
       },
    providers : [
        Credentials({
            name : 'Credentials',
            credentials: {
                email: { label: "Email", type: "text", placeholder: "email@example.com" },
                password: { label: "Password", type: "password", placeholder: "Your password" },
            },
        
            authorize : async (credentials)=>{
                const { email, password } = credentials || {};

                console.log("Filtered Credentials:", { email, password });
                const baseUrl = process.env.API + '/auth/signin'
                const response = await fetch( baseUrl, {
                    body:JSON.stringify({
                        email:credentials?.email,
                        password : credentials?.password
                    }),
                    method:'POST',
                    cache:'no-store',
                    headers:{
                        ...JSON_HEADER
                    }
                }
            )
             
                const payload:ApiResponse<LoginResponse> = await response.json();

                if(payload?.message === 'success'){
                    console.log('payload is here from if', payload)
                    return {
                        
                        id : payload?.data?.user?._id,
                        token : payload?.token,
                        ...payload?.data?.user

                    }
                }
                throw new Error (payload.message || 'Incrroect email or password!!')

             
        }
    })
    ],
    
    callbacks : {
        
        jwt : ({token , user})=>{
            
          if(user) {
            token.token = user.token;
            token._id = user._id;
            token.username= user.username;
            token.firstName= user.firstName;
            token.lastName= user.lastName;
            token.email= user.email;
            token.phone= user.phone;
            token.role= user.role;
            token.isVerified= user.isVerified;
            token.createdAt= user.createdAt;
            token.passwordResetCode= user.passwordChangedAt;
            token.passwordResetExpires= user.passwordResetExpires;
            token.resetCodeVerified= user.resetCodeVerified;
            token.passwordChangedAt= user.passwordChangedAt;
            
          } 
          return token;
          
             
        },
        session : ({session , token})=>{
            session._id = token._id;
            session.username= token.username;
            session.firstName= token.firstName;
            session.lastName= token.lastName;
            session.email= token.email;
            session.phone= token.phone;
            session.role= token.role;
            session.isVerified= token.isVerified;
            session.createdAt= token.createdAt;
            session.passwordResetCode= token.passwordChangedAt;
            session.passwordResetExpires= token.passwordResetExpires;
            session.resetCodeVerified= token.resetCodeVerified;
            session.passwordChangedAt= token.passwordChangedAt;
            return session
        }
        
    }
}
