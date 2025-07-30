'use server'

import { auth } from '@/lib/auth'

export const SignInUser = async ({
    email,
    password,
}: {
    email: string
    password: string
}) => {
    try {
        await auth.api.signInEmail({
            body: {
                email,
                password,
            },
            asResponse: true,
        })

        return { success: true, message: 'Signed in successfully ' }
    } catch (error) {
        const e = error as Error
        return { success: false, message: e.message || 'Failed to signin' }
    }
}
export const SignUpUser = async ({
    email,
    password,
    name,
}: {
    email: string
    password: string
    name: string
}) => {
    try {
        await auth.api.signUpEmail({
            body: {
                email,
                password,
                name,
            },
            asResponse: true,
        })

        return { success: true, message: 'Signed up successfully ' }
    } catch (error) {
        const e = error as Error
        return { success: false, message: e.message || 'Failed to signin' }
    }
}
