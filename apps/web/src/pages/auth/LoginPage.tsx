import { ErrorMessage } from '@hookform/error-message'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { useLoginMutation } from '@/hooks/user/useLoginMutation'
import { useTokenCheck } from '@/hooks/user/useTokenCheck'
import { storeToken } from '@/lib/security'
import { useNavigate } from 'react-router-dom'

const formSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string(),
})

const LoginPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onTouched',
  })

  const { toast } = useToast()
  const navigate = useNavigate()
  const { mutateAsync: login } = useLoginMutation()

  useTokenCheck('/home')

  const handleLogin = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await login(values)

      const { token } = response
      await storeToken(token)

      navigate('/home')
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: 'Error Logging In',
          description: error.message,
          variant: 'destructive',
          duration: 5000,
        })
      }
    }
  }

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <Card className="w-[400px] px-2 py-6 rounded-2xl shadow-2xl">
        <Form {...form}>
          <form
            className="flex flex-col items-center"
            onSubmit={form.handleSubmit(handleLogin)}
          >
            <div className="mb-4">
              <img
                src="\logo\Guiding hand logo-03.png"
                alt="logo"
                width="120px"
              />
            </div>
            <h1 className="text-4xl text-brand-primary mb-4" color="#BB6192">
              Guiding Hand
            </h1>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mb-4 w-3/4">
                  <FormLabel className="text-gray-500">Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className={
                        form.formState.errors.email
                          ? 'focus-visible:ring-red-500'
                          : ''
                      }
                    />
                  </FormControl>
                  <ErrorMessage
                    errors={form.formState.errors}
                    name="email"
                    as="p"
                    className="text-red-500"
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="mb-8 w-3/4">
                  <FormLabel className="text-gray-500">Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex flex-col">
              <Button
                className="bg-brand-primary hover:bg-brand-primary-dark mb-2"
                type="submit"
              >
                Log In
              </Button>
              <link href="/signup">
                <span className="underline">Or signup now!</span>
              </link>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  )
}

export default LoginPage
