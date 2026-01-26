import Sidebar from '../components/Sidebar/Sidebar'
import AiDoctor from '../components/AiDoctor'

export default function AiDoctorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <main className="ml-64 p-4">
        <AiDoctor />
      </main>
    </div>
  )
}
