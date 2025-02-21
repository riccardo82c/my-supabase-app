import { Trash2 } from "lucide-react"
import { Form } from "react-router"

// interface User {
//   id: number;
//   username: string;
//   role: string;
//   created_at: string;
// }

// interface DeleteFormProps {
//   user: User;
// }

export default function DeleteForm({user}: DeleteFormProps) {
  return (
    <Form method="post" className="inline">
      <input type="hidden" name="intent" value="delete" />
      <input type="hidden" name="id" value={user.id} />
      <button
        type="submit"
        className="text-red-600 hover:text-red-900 p-2 rounded-md hover:bg-red-50"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </Form>
  )
}
