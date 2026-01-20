import ForgotPasswordForm from '../components/auth/ForgotPasswordForm'
import FormLayout from '../components/ui/FormLayout'

export default function ForgotPasswordPage() {
  return (
    <FormLayout title="Forgot Password" center compact>
      <ForgotPasswordForm />
    </FormLayout>
  )
}
