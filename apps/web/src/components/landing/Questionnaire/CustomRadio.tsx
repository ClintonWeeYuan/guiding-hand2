import { Label } from '@/components/ui/label'
import { RadioGroupItem } from '@/components/ui/radio-group'
import { cn } from '@/lib/utils'

interface CustomRadioProps {
  option: string
  isSelected: boolean
}

const CustomRadio = ({ option, isSelected }: CustomRadioProps): JSX.Element => {
  return (
    <div className="flex items-center space-x-2 cursor-pointer">
      <RadioGroupItem className="peer sr-only" value={option} id={option} />
      <Label
        className={cn(
          'w-full border rounded-xl py-4 px-4 cursor-pointer min-w-[120px]',
          isSelected && 'bg-brand-primary text-white'
        )}
        htmlFor={option}
      >
        {option}
      </Label>
    </div>
  )
}

export default CustomRadio
