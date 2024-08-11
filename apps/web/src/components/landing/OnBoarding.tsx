import { Button } from '@/components/ui/button'
import { EXTERNAL_URLS } from '@/lib/constants'

interface onBoardingProps {
  handleStart: () => void
  handleLogin: () => void
}

const OnBoarding: React.FC<onBoardingProps> = ({
  handleStart,
  handleLogin,
}) => {
  return (
    <div className="flex flex-col justify-center min-h-screen">
      <div>
        <img
          src="/logo/Guiding hand logo-03.jpg"
          alt="Guiding Hand's Logo"
          width={150}
          height={150}
          className="block mx-auto"
        />
        <h1 className="text-5xl text-brand-primary mb-2">Guiding Hand</h1>
        <h2 className="text-md text-gray-500 font-light mb-32">
          Clarity with Care and Compassion
        </h2>
      </div>

      <div className="mt-15vh">
        <div className="flex justify-center align-center">
          <Button
            type="button"
            className="bg-brand-primary hover:bg-brand-primary-dark text-white border-0 rounded-2xl py-6 mb-4 w-4/6 md:w-3/5 lg:w-3/6 transition-colors duration-300"
            onClick={handleStart}
          >
            Self Assessment
          </Button>
        </div>
        <div className="flex justify-center align-center">
          <Button
            type="button"
            className="bg-brand-primary hover:bg-brand-primary-dark text-white border-0 rounded-2xl py-6 mb-4 w-4/6 md:w-3/5 lg:w-3/6 transition-colors duration-300"
            onClick={handleLogin}
          >
            Sign in (anonymously)
          </Button>
        </div>

        <a
          href={EXTERNAL_URLS.PRIVACY_POLCY}
          target="_blank"
          rel="noreferrer"
          className="text-blue-300 hover:text-pink-200 border-0 py-2 px-4 cursor-pointer underline"
        >
          Terms & Privacy Policy
        </a>
      </div>
    </div>
  )
}

export default OnBoarding
