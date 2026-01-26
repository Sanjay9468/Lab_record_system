import LabForm from '../components/labform'

export default function LabEntry() {
  return (
    <div className="max-w-4xl mx-auto bg-white p-6 mt-6 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Lab Record Entry</h1>
      <LabForm />
    </div>
  )
}