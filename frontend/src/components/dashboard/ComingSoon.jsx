export default function ComingSoon({ icon: Icon, title }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-12 text-center border border-gray-100">
      <Icon className="text-gray-300 mx-auto mb-4" size={64} />
      <h2 className="text-2xl font-bold text-textDark mb-2">{title}</h2>
      <p className="text-textLight">Coming Soon</p>
    </div>
  )
}
