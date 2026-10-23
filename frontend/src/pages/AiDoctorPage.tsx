import Sidebar from '../components/Sidebar/Sidebar'
import AiDoctor from '../components/AiDoctor'

export default function AiDoctorPage() {
  return (
    <div className="min-h-screen bg-transparent landing-page">
      <Sidebar />
      <main className="lg:ml-64 p-2 sm:p-4 pt-16 lg:pt-4">
        <AiDoctor />
      </main>
    </div>
  )
}
