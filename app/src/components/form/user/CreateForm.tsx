import { Form } from "react-router"
import { Button } from "~/components/ui/button"
// interface CreateFormProps {
//   createFormRef: React.RefObject<HTMLFormElement | null>;
//   isCreating: boolean;
// }

export default function CreateForm({ createFormRef, isCreating }: CreateFormProps) {
  return (
    <Form method="post" ref={createFormRef}>
      <div className="form-group">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
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
          className="form-select w-full"
          required
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <Button
        type="submit"
        name="intent"
        value="create"
         className="btn btn-primary"
        disabled={isCreating}
      >
        {isCreating ? 'Creating...' : 'Create User'}
      </Button>
    </Form>
  )
}
