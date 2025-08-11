'use client'
import { authClient } from '@/lib/auth-client'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

export const LogoutButton = () => {
    const router = useRouter()
    const handleLogout = async () => {
        await authClient.signOut()
        router.push('/')
    }
    return (
        <div>
            <Button onClick={handleLogout} variant="outline">
                Logout
            </Button>
        </div>
    )
}
