'use client';

import { forgotPasswordContext } from "@/components/providers/components/forgot-password-provider";
import { useContext } from "react";
import EnterEmailForm from "./enter-email-form";
import VerifyResetCodeFrom from "./verify-reset-code";
import ResetPasswordForm from "./reset-password";


export default function MainForgetPasswordForm(){

    const context = useContext(forgotPasswordContext);

    if (!context) {
        return null; // or handle the null case appropriately
    }

    const {
        currentStep,
        
    } = context;

    return (<>
    {/* frist step of verifing the email */}
    {currentStep === 1 && <EnterEmailForm/>}
    {/* second step of verifing the email */}
    {currentStep === 2 && <VerifyResetCodeFrom/>}
    {/* third  step of verifing the email */}
    {currentStep === 3 && <ResetPasswordForm/>}

    
    
    </>)
}
