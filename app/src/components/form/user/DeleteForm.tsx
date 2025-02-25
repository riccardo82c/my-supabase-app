import { Trash } from "lucide-react"
import { useState } from "react"
import { Form } from "react-router"
import { motion } from 'framer-motion'

export default function DeleteForm({ user }: DeleteFormProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="btn btn-danger p-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Trash className="w-4 h-4" />
      </motion.button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="card max-w-md w-full mx-4">
            <h2 className="text-xl font-semibold mb-4">Delete User</h2>
            <p className="mb-4">
              Are you sure you want to delete user "{user.username}"?
            </p>
            <div className="form-actions">
              <Form method="post">
                <input type="hidden" name="intent" value="delete" />
                <input type="hidden" name="id" value={user.id} />
                <button type="submit" className="btn btn-danger">
                  Delete
                </button>
              </Form>
              <button
                onClick={() => setIsOpen(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
