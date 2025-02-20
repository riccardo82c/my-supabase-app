// routes/users.tsx
import { useLoaderData, Form, useNavigation, useActionData } from "react-router"
import { supabase } from "~/src/lib/supabase"
import { useState, useEffect, useRef } from "react"

import { Edit, Trash2, UserPlus } from 'lucide-react'

interface User {
  id: number
  username: string
  role: string
  created_at: string
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('it-IT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export async function loader() {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) throw error
  return { users: data }
}

export async function action({ request }: { request: Request }) {
  const formData = await request.formData()
  const intent = formData.get('intent')

  switch (intent) {
    case 'create': {
      const username = formData.get('username')
      const role = formData.get('role')

      const { error } = await supabase
        .from('users')
        .insert([{ username, role }])

      if (error) throw error
      return { ok: true }
    }

    case 'update': {
      const id = formData.get('id')
      const username = formData.get('username')
      const role = formData.get('role')

      const { error } = await supabase
        .from('users')
        .update({ username, role })
        .eq('id', id)

      if (error) throw error
      return { ok: true }
    }

    case 'delete': {
      const id = formData.get('id')

      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', id)

      if (error) throw error
      return { ok: true }
    }

    default:
      throw new Error('Unknown action')
  }
}

export default function Users() {
  const { users } = useLoaderData() as { users: User[] }
  const navigation = useNavigation()
  const actionData = useActionData()
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const createFormRef = useRef<HTMLFormElement>(null)

  const isCreating = navigation.formData?.get('intent') === 'create'
  const isUpdating = navigation.formData?.get('intent') === 'update'

  useEffect(() => {
    if (navigation.state === "idle" && actionData?.ok) {
      setEditingUser(null)
      // Reset del form di creazione
      if (createFormRef.current) {
        createFormRef.current.reset()
      }
    }
  }, [navigation.state, actionData])

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-50 mb-6">Users</h1>

      {/* Create Form */}
      <div className="mb-8 bg-white text-gray-900 p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <UserPlus className="w-5 h-5" />
          Add New User
        </h2>
        <Form method="post" className="space-y-4" ref={createFormRef}>
          <input type="hidden" name="intent" value="create" />
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 px-3 py-2 text-gray-900
               shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select
              id="role"
              name="role"
              defaultValue="user"
              className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 px-3 py-2 text-gray-900
               shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isCreating}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600
             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
             disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isCreating ? 'Creating...' : 'Create User'}
          </button>
        </Form>
      </div>

      {/* Users Table */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                {editingUser?.id === user.id ? (
                  // Edit Mode
                  <td colSpan={5} className="px-6 py-4">
                    <Form method="post" className="flex gap-4 items-end">
                      <input type="hidden" name="intent" value="update" />
                      <input type="hidden" name="id" value={user.id} />

                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                          type="text"
                          name="username"
                          defaultValue={user.username}
                          className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 px-3 py-2 text-gray-900"
                          required
                        />
                      </div>

                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700">Role</label>
                        <select
                          name="role"
                          defaultValue={user.role}
                          className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 px-3 py-2 text-gray-900"
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      </div>

                      <div className="flex gap-2">
                        <button
                          type="submit"
                          disabled={isUpdating}
                          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50"
                        >
                          {isUpdating ? 'Saving...' : 'Save'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingUser(null)}
                          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                      </div>
                    </Form>
                  </td>
                ) : (
                  // View Mode
                  <>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.username}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'admin'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                        }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(user.created_at)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingUser(user)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded-full hover:bg-blue-50"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <Form method="post" className="inline">
                          <input type="hidden" name="intent" value="delete" />
                          <input type="hidden" name="id" value={user.id} />
                          <button
                            type="submit"
                            className="text-red-600 hover:text-red-900 p-1 rounded-full hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </Form>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
