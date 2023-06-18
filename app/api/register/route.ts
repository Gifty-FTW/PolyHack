import { NextResponse } from "next/server";
import prisma from '@/app/libs/primsadb'
import bcrypt from 'bcrypt'

export async function POST(
    request:Request
){
    const body = await request.json()
    const {email, name, password} = body

    const hashedPassword = await bcrypt.hash(password,12)

    const user = await prisma.user.create({
        data:{
            name,
            email,
            hashedPassword
        }
    })

    return NextResponse.json(user)
}