import LoginForm from '../components/auth/LoginForm'
import FormLayout from '../components/ui/FormLayout'

export default function LoginPage() {
  return (
    <FormLayout
      title="Sign in to your account"
      center
      compact
      accent
      className="max-w-md mx-4 mt-20 mb-20"
    >
      <div className="text-center mb-4">
        <p className="mt-2 text-sm text-black dark:text-muted">
          Welcome back to Nutriva
        </p>
      </div>
      <LoginForm />
    </FormLayout>
  )
}
