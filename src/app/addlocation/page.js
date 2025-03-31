import React from 'react'
import RegisterLocation from '@/components/inputforms/RegisterLocation'
import { PrismaClient } from '@prisma/client';


export default function page() {
  
  return (
    <div>
      <RegisterLocation />  
    </div>
  )
}
