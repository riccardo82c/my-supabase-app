import { Form } from "react-router"
import type { Dispatch, SetStateAction } from "react"

// interface User {
//   id: number;
//   username: string;
//   role: string;
//   created_at: string;
// }

// interface EditFormProps {
//   user: User;
//   isUpdating: boolean;
//   setEditingUser: Dispatch<SetStateAction<User | null>>
// }

export default function EditForm({user, isUpdating, setEditingUser} : EditFormProps) {
  return (
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
  )
}
