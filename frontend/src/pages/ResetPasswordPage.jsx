import ResetPasswordForm from '../components/auth/ResetPasswordForm'

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 bg-gray-50">
      <div className="max-w-md w-full space-y-8 bg-white p-6 rounded shadow">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Reset Password</h2>
          <p className="mt-2 text-sm text-gray-600">
            Enter your new password
          </p>
        </div>
        <ResetPasswordForm />
      </div>
    </div>
  )
}
