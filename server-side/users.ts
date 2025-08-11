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
        const response = await auth.api.signInEmail({
            body: {
                email,
                password,
            },
            asResponse: true,
        })

        if (response.ok) {
            return { success: true, message: 'Signed in successfully ' }
        } else {
            return { success: false, message: 'Failed to sign in' }
        }
    } catch (error) {
        const e = error as Error
        return { success: false, message: e.message || 'Failed to sign in' }
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
        const response = await auth.api.signUpEmail({
            body: {
                email,
                password,
                name,
            },
            asResponse: true,
        })
        if (response.ok) {
            return { success: true, message: 'Signed up successfully ' }
        }

        return { success: false, message: 'Failed to sign up' }
    } catch (error) {
        const e = error as Error
        return { success: false, message: e.message || 'Failed to sign up' }
    }
}
