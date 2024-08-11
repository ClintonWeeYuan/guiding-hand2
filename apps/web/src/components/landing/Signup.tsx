import { ChangeEvent, FC } from 'react'

import { Button } from '@/components/ui/button'
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface SignupProps {
  handleChange: (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => void
  handlePrevious: () => void
}

const Signup: FC<SignupProps> = ({ handleChange, handlePrevious }) => {
  return (
    <>
      <CardHeader>
        <CardTitle className="text-xl text-brand-primary mb-4">
          To chat anonymously with a Resource Facilitator or to read articles
          addressing your issues from the questionnaire, please sign up below.
        </CardTitle>
        <CardDescription>
          You may use general information to remain anonymous as long as the
          email is valid.
        </CardDescription>
      </CardHeader>
      <div className="text-left w-full flex justify-center">
        <div className="w-full lg:w-3/5">
          <Label>Email</Label>
          <Input
            className=" my-2"
            type="email"
            id="email"
            name="email"
            placeholder="123@gmail.com"
            onChange={handleChange}
          />

          <Label>Username</Label>
          <Input
            className=" my-2"
            type="text"
            id="uname"
            name="username"
            placeholder="Username"
            onChange={handleChange}
          />

          <Label>Password</Label>
          <Input
            className=" my-2"
            type="password"
            id="pwd"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />

          <div className="flex justify-between mt-12">
            <Button
              variant="ghost"
              className="text-brand-neutral text-sm underline"
              type="button"
              onClick={handlePrevious}
            >
              Back
            </Button>
            <div className="flex flex-col">
              <Button className="bg-brand-primary hover:bg-'">Submit</Button>
            </div>
            <Button
              variant="ghost"
              className="text-brand-neutral text-sm underline"
              type="button"
            >
              Skip
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup
