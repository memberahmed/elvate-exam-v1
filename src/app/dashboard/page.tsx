'use client';

import { useSession } from "next-auth/react";


export default function DashboardPage(){
    let session = useSession();
    console.log(session)
    return <>
    Dashboard Page
    </>
}