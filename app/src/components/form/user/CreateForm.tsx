import { Form } from "react-router"
import { Button } from "~/components/ui/button"
// interface CreateFormProps {
//   createFormRef: React.RefObject<HTMLFormElement | null>;
//   isCreating: boolean;
// }

export default function CreateForm({ createFormRef, isCreating } : CreateFormProps) {

  return (

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

      <Button
        type="submit"
        disabled={isCreating}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600
   focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
   disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isCreating ? 'Creating...' : 'Create User'}
      </Button>
    </Form>
  )
}
