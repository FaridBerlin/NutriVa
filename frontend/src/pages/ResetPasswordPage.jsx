import ResetPasswordForm from '../components/auth/ResetPasswordForm'
import FormLayout from '../components/ui/FormLayout'

export default function ResetPasswordPage() {
  return (
    <FormLayout title="Reset Password" center compact>
      <ResetPasswordForm />
    </FormLayout>
  )
}
