import { Form } from "react-router"
import { Button } from "~/components/ui/button"
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
    <Form method="post" className="space-y-4">
      <input type="hidden" name="id" value={user.id} />

      <div className="form-group">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          defaultValue={user.username}
          className="form-input w-full"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="role" className="form-label">
          Role
        </label>
        <select
          id="role"
          name="role"
          defaultValue={user.role}
          className="form-select w-full"
          required
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div className="flex gap-2">
        <Button
          type="submit"
          name="intent"
          value="update"
          className="btn btn-primary"
          disabled={isUpdating}
        >
          {isUpdating ? 'Saving...' : 'Save'}
        </Button>
        <Button
          type="button"
          onClick={() => setEditingUser(null)}
          className="btn btn-secondary"
        >
          Cancel
        </Button>
      </div>
    </Form>
  )
}
