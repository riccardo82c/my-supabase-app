import { Trash, Trash2 } from "lucide-react"
import { useState } from "react"
import { Form } from "react-router"
import { Button } from "~/components/ui/button"
import { motion } from 'framer-motion'

export default function DeleteForm({ user }: DeleteFormProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Form method="post" className="inline">
      <input type="hidden" name="intent" value="delete" />
      <input type="hidden" name="id" value={user.id} />
      <Button
        type="submit"
        className="text-red-600 hover:text-red-900 p-2 rounded-md hover:bg-red-50 bg-transparent"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </Form>
  )
}
