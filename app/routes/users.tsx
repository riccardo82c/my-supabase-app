// routes/users.tsx
import { useLoaderData, Form, useNavigation, useActionData } from "react-router"
import { supabase } from "~/src/lib/supabase"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from 'framer-motion'
import formatDate from "~/src/utils/formatDateIt"
import { Edit, Pencil, UserPlus } from 'lucide-react'
import CreateForm from "~/src/components/form/user/CreateForm"
import EditForm from "~/src/components/form/user/EditForm"
import DeleteForm from "~/src/components/form/user/DeleteForm"
import ThemeToggle from "~/src/components/theme_toggle/ThemeToggle"

interface User {
  id: number
  username: string
  role: string
  created_at: string
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
      if (createFormRef.current) {
        createFormRef.current.reset()
      }
    }
  }, [navigation.state, actionData])

  return (
    <div className="max-w-7xl mx-auto p-4">

      <div className="flex w-full justify-between">
        <h1 className="text-3xl font-bold mb-6">Users</h1>
        <div className="fixed right-4 top-4 z-10">
          <ThemeToggle />
        </div>
      </div>


      {/* Create Form */}
      <div className="card mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <UserPlus className="w-5 h-5" />
          Add New User
        </h2>
        <CreateForm createFormRef={createFormRef} isCreating={isCreating} />
      </div>

      {/* Users Table */}
      <div className="card">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Username</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Created At</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <AnimatePresence mode="wait">
                  {editingUser?.id === user.id ? (
                    <motion.td
                      colSpan={5}
                      className="px-6 py-4"
                      initial={{ opacity: 0, y: -20 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.3, ease: "easeOut" }
                      }}
                      exit={{
                        opacity: 0,
                        y: 20,
                        transition: { duration: 0.2, ease: "easeIn" }
                      }}
                    >
                      <motion.div
                        initial={{ scale: 0.95 }}
                        animate={{
                          scale: 1,
                          transition: { duration: 0.2, ease: "easeOut" }
                        }}
                      >
                        <EditForm user={user} isUpdating={isUpdating} setEditingUser={setEditingUser} />
                      </motion.div>
                    </motion.td>
                  ) : (
                    <>
                      <motion.td
                        className="px-6 py-4 whitespace-nowrap text-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {user.id}
                      </motion.td>
                      <motion.td
                        className="px-6 py-4 whitespace-nowrap text-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        {user.username}
                      </motion.td>
                      <motion.td
                        className="px-6 py-4 whitespace-nowrap"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        <span
                          className={`
                              px-2 py-1
                              inline-flex
                              text-xs
                              leading-5
                              font-semibold
                              rounded-full
                              ${user.role === 'admin'
                              ? 'bg-[var(--badge-admin-bg)] !text-[var(--badge-admin-text)]'
                              : 'bg-[var(--badge-user-bg)] !text-[var(--badge-user-text)]'
                            }
  `}
                        >
                          {user.role}
                        </span>
                      </motion.td>
                      <motion.td
                        className="px-6 py-4 whitespace-nowrap text-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                      >
                        {formatDate(user.created_at)}
                      </motion.td>
                      <motion.td
                        className="px-6 py-4 whitespace-nowrap text-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.4 }}
                      >
                        <div className="flex gap-2">
                          <motion.button
                            onClick={() => setEditingUser(user)}
                            className="btn btn-primary p-2"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Pencil className="w-4 h-4" />
                          </motion.button>
                          <DeleteForm user={user} />
                        </div>
                      </motion.td>
                    </>
                  )}
                </AnimatePresence>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
