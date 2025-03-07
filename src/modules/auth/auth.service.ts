import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();


export const register = async(data: any) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
        data: {
            email: data.email,
            password: hashedPassword,
            name: data.name
        }
    })

    return user;
}

export const login = async(data: any) => {

    const user = await prisma.user.findUnique({
        where: { email: data.email }
    });

    if(!user){
        throw new Error('User not found'); 
    }
        
    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if(!isPasswordValid){
        throw new Error('Incorrect password'); 
    }

    const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: '1h' }
    )

    return {token, user}
}