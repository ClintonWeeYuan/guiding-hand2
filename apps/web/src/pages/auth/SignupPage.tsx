import { ErrorMessage } from '@hookform/error-message'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { UserCreationParams } from 'types'
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
import { useSignupMutation } from '@/hooks/user/useSignupMutation'
import { useTokenCheck } from '@/hooks/user/useTokenCheck'
import { useNavigate } from 'react-router-dom'

const passwordValidation = new RegExp(
  /^(?=.*?[a-zA-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/,
)

const formSchema = z
  .object({
    firstName: z.string().min(3, { message: 'Name is too short' }),
    lastName: z.string().optional(),
    email: z.string().email('Invalid email'),
    password: z
      .string()
      .min(6, { message: 'Password is too short' })
      .regex(passwordValidation, {
        message:
          'Password must contain at least 1 letter, 1 number and 1 special character',
      }),
    confirm: z.string(),
  })
  .refine(
    (data: { password: string; confirm: string }) =>
      data.password == data.confirm,
    {
      message: 'Passwords do not match',
      path: ['confirm'],
    },
  )

const SignupPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onTouched',
  })

  const { toast } = useToast()
  const { formState, handleSubmit, control } = form
  const { errors } = formState

  const navigate = useNavigate()
  const { mutateAsync: signup } = useSignupMutation()

  useTokenCheck('/home')

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const body: UserCreationParams = {
      ...values,
      userRole: 'USER',
    }

    try {
      await signup(body)
      navigate('/login')
    } catch (e) {
      if (e instanceof Error) {
        toast({
          variant: 'destructive',
          title: 'Error creating user',
          description: e.message,
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
            onSubmit={handleSubmit(onSubmit)}
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
              control={control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="mb-4 w-3/4">
                  <FormLabel className="text-gray-500">First Name *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className={
                        errors.firstName ? 'focus-visible:ring-red-500' : ''
                      }
                    />
                  </FormControl>
                  <ErrorMessage
                    errors={errors}
                    name="firstName"
                    render={({ message }) => (
                      <p className="text-red-500 text-sm">{message}</p>
                    )}
                  />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="mb-4 w-3/4">
                  <FormLabel className="text-gray-500">Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem className="mb-4 w-3/4">
                  <FormLabel className="text-gray-500">Email *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className={
                        errors.email ? 'focus-visible:ring-red-500' : ''
                      }
                    />
                  </FormControl>
                  <ErrorMessage
                    errors={errors}
                    name="email"
                    render={({ message }) => (
                      <p className="text-red-500 text-sm">{message}</p>
                    )}
                  />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="password"
              render={({ field }) => (
                <FormItem className="mb-8 w-3/4">
                  <FormLabel className="text-gray-500">Password *</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      className={
                        errors.password ? 'focus-visible:ring-red-500' : ''
                      }
                    />
                  </FormControl>
                  <ErrorMessage
                    errors={errors}
                    name="password"
                    render={({ message }) => (
                      <p className="text-red-500 text-sm">{message}</p>
                    )}
                  />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="confirm"
              render={({ field }) => (
                <FormItem className="mb-8 w-3/4">
                  <FormLabel className="text-gray-500">
                    Confirm Password *
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      {...field}
                      className={
                        errors.confirm ? 'focus-visible:ring-red-500' : ''
                      }
                    />
                  </FormControl>
                  <ErrorMessage
                    errors={errors}
                    name="confirm"
                    render={({ message }) => (
                      <p className="text-red-500 text-sm">{message}</p>
                    )}
                  />
                </FormItem>
              )}
            />
            <div className="flex flex-col">
              <Button
                className="bg-brand-primary hover:bg-brand-primary-dark mb-2"
                type="submit"
              >
                Signup
              </Button>
              <a href="/login">
                <span className="underline">Or login now!</span>
              </a>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  )
}

export default SignupPage
