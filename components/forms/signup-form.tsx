'use client'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { SignUpUser } from '@/server-side/users'
import { useState } from 'react'
import { toast } from 'sonner'
import Link from 'next/link'

const formSchema = z.object({
    email: z.string().min(2).max(50),
    password: z.string().min(6).max(50),
    name: z.string().min(2).max(50),
})

export function SignUpForm({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    const [isLoading, setIsLoading] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
            name: '',
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        setIsLoading(true)
        try {
            const response = await SignUpUser(values)
            toast(response.message)
        } catch (error) {
            console.error('Error at loging', error)
            if (error instanceof Error) {
                toast.error(error.message)
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={cn('flex flex-col gap-6', className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Sign up form</CardTitle>
                    <CardDescription>
                        Enter your name,email and your password below to create
                        an account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="flex flex-col gap-6"
                        >
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="John doe"
                                                type="text"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="m@example.com"
                                                type="email"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <div className="flex items-center">
                                            <FormLabel>Password</FormLabel>
                                        </div>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="********"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex flex-col gap-3">
                                <Button
                                    disabled={isLoading}
                                    type="submit"
                                    className="w-full"
                                >
                                    Sign up
                                </Button>
                                <Button variant="outline" className="w-full">
                                    Continue with Google
                                </Button>
                            </div>
                            <div className="mt-4 flex gap-2 mx-auto space-x-2 text-center text-sm">
                                Already have an account?
                                <Link
                                    href="/login"
                                    className="underline underline-offset-4"
                                >
                                    Login
                                </Link>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
