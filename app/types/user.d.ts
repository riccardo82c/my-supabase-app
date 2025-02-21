interface User {
  id: number
  username: string
  role: string
  created_at: string
}

interface CreateFormProps {
  createFormRef: React.RefObject<HTMLFormElement | null>
  isCreating: boolean
}

interface EditFormProps {
  user: User
  isUpdating: boolean
  setEditingUser: Dispatch<SetStateAction<User | null>>
}

interface DeleteFormProps {
  user: User
}
