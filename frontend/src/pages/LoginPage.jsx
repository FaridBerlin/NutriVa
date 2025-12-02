import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-md w-full space-y-8 bg-white p-6 rounded shadow">
        <div className="text-center">
          <h2 className="text-2xl font-bold">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Welcome back to Nutriva
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
