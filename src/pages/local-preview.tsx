import { env } from '@/config/env'

export default function LocalPreview() {
  return (
    <main className="flex h-screen flex-col items-center justify-center bg-gray-100 text-gray-800">
      <h1 className="mb-4 text-3xl font-bold">👋 Welcome Developer</h1>

      <p className="text-lg text-gray-600">
        This is a <strong>local-only</strong> preview page for internal
        development.
      </p>

      <p className="mt-2 text-lg text-gray-600">
        The <strong>navigation bar</strong> is also visible only in the local
        environment.
      </p>

      <p className="mt-6 text-2xl text-gray-500">
        Environment: <span className="font-mono">{env.ENV}</span>
      </p>
    </main>
  )
}
