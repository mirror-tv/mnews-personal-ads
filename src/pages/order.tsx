import { useParams } from 'react-router-dom'

export default function Order() {
  const { id } = useParams()

  return (
    <div className="flex h-[70vh] flex-col items-center justify-center bg-gray-50">
      <h1 className="text-3xl font-bold text-red-600">Order Page</h1>
      {id ? (
        <p className="mt-4 text-gray-700">Viewing details for order ID: {id}</p>
      ) : (
        <p className="mt-4 text-gray-700">No specific order selected.</p>
      )}
    </div>
  )
}
