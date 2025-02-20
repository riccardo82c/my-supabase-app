import { useLoaderData } from "react-router"
import { supabase } from "~/src/lib/supabase"

interface User {
  id: number
  username: string
  role: string
  created_at: string
}

export async function loader() {
  try {
    // Log all'inizio del loader
    console.log("Starting loader function")

    const { data, error } = await supabase
      .from('users')
      .select('*')

    // Log completo della risposta
    console.log("Supabase response:", {
      data,
      error,
      status: error?.status,
      message: error?.message
    })

    if (error) {
      console.error("Supabase error:", error)
      throw new Error(`Failed to fetch users: ${error.message}`)
    }

    // Verifica se data è null o undefined
    if (!data) {
      console.log("No data received from Supabase")
      return { users: [] }
    }

    // Log dei dati ricevuti
    console.log("Data received:", data)
    return { users: data }

  } catch (error) {
    console.error("Loader catch block:", error)
    throw error
  }
}

export default function Users() {
  const { users } = useLoaderData() as { users: User[] }
  console.log('ENV variables:', {
    url: import.meta.env.VITE_SUPABASE_URL,
    keyExists: !!import.meta.env.VITE_SUPABASE_KEY
  })

  // Log per debug
  console.log("Rendered users:", users)

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Users</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">USERNAME</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ROLE</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CREATED AT</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users?.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.username}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(user.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// Aggiunto ErrorBoundary per gestire eventuali errori
export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-red-600">Error</h1>
      <p className="mt-2 text-gray-600">{error.message}</p>
    </div>
  )
}
