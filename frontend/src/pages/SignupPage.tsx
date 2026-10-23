import SignupForm from '../components/auth/SignupForm'
import FormLayout from '../components/ui/FormLayout'

export default function SignupPage() {
  return (
    <FormLayout
      title="Create your account"
      center
      compact
      accent
      className="max-w-md mx-4 mt-20 mb-20"
    >
      <div className="text-center mb-4">
        <p className="mt-2 text-sm text-black dark:text-muted">
          Start your nutrition journey with Nutriva
        </p>
      </div>
      <SignupForm />
    </FormLayout>
  )
}
