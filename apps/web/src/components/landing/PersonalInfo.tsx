import { ChangeEvent, FC } from 'react'
import { useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { EXTERNAL_URLS } from '@/lib/constants'

interface PersonalInfoProps {
  handleChange: (
    event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>,
  ) => void
  handleBack: () => void
  handleNext: () => void
}
const PersonalInfo: FC<PersonalInfoProps> = ({
  handleChange,
  handleBack,
  handleNext,
}) => {
  const { register } = useFormContext()

  const occupationOptions = [
    { label: 'Pregnant teens', value: 'Pregnant teens' },
    { label: 'Pregnant adults', value: 'Pregnant adults' },
    { label: 'Partners', value: 'Partners' },
    { label: 'Friends', value: 'Friends' },
    { label: 'New Parents', value: 'New Parents' },
  ]

  return (
    <>
      <CardHeader className="mb-4">
        <CardTitle className="text-3xl text-brand-primary mb-4">
          Tell us more about yourself!
        </CardTitle>
        <CardDescription>
          We value your trust and want to assure you that all personal data
          provided is held in the strictest confidence. Please see our{' '}
          <link href={EXTERNAL_URLS.PRIVACY_POLCY}>Privacy Policy</link> for
          details.
        </CardDescription>
      </CardHeader>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        <div className="grid gap-2">
          <Label className="text-left" htmlFor="firstName">
            First Name
          </Label>
          <Input placeholder="Jeremy" {...register('moreInfo.firstName', {})} />
        </div>
        <div className="grid gap-2">
          <Label className="text-left" htmlFor="firstName">
            Last Name
          </Label>
          <Input
            className=""
            {...register('moreInfo.lastName')}
            placeholder="Lin"
          />
        </div>

        <div className="grid gap-2">
          <Label className="text-left" htmlFor="firstName">
            Age
          </Label>
          <Input
            {...register('moreInfo.age')}
            placeholder="Age"
            type="number"
          />
        </div>

        <div className="grid gap-2">
          <Label className="text-left" htmlFor="occupation">
            Occupation
          </Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select an occupation" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {occupationOptions.map(({ label, value }, index) => (
                  <SelectItem key={index} value={value} disabled={value === ''}>
                    {label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label className="text-left" htmlFor="">
            Phone Number
          </Label>
          <Input
            type="tel"
            id="pnum"
            name="phoneNumber"
            placeholder="+6587651234"
            onChange={handleChange}
          />
        </div>

        <div className="grid gap-2">
          <Label className="text-left" htmlFor="firstName">
            Gender
          </Label>
          <Input
            type="text"
            id="gender"
            name="gender"
            placeholder="Gender"
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex justify-between p-5px m-auto w-80%">
        <Button
          variant="ghost"
          className="text-brand-neutral text-sm underline"
          type="button"
          onClick={handleBack}
        >
          Back
        </Button>

        <Button
          className="bg-brand-primary hover:bg-brand-primary-light"
          type="button"
          onClick={handleNext}
        >
          Submit
        </Button>

        <Button
          variant="ghost"
          className="text-brand-neutral text-sm underline"
          type="button"
          onClick={handleNext}
        >
          Skip
        </Button>
      </div>
    </>
  )
}

export default PersonalInfo
