import React from 'react'
import RegisterPayment from '@/components/inputforms/RegisterPayment'
import { PrismaClient } from '@prisma/client';


export default function page() {
  
  return (
    <div>
      <RegisterPayment />  
    </div>
  )
}