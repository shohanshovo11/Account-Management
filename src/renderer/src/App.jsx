import { useState, useEffect } from 'react'

function App() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [users, setUsers] = useState([])

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers()
  }, [])

  // Fetch all users from the database
  const fetchUsers = async () => {
    const data = await window.api.getUsers()
    setUsers(data)
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!name || !email) {
      setMessage('Name and Email are required!')
      return
    }

    const result = await window.api.addUser(name, email)

    if (result.success) {
      setMessage('User added successfully!')
      setName('')
      setEmail('')
      fetchUsers()
    } else {
      setMessage(`Error: ${result.error}`)
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">User Management</h1>

      {/* Form to add a new user */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-2">
          <label htmlFor="name" className="block text-sm font-medium">
            Name:
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="email" className="block text-sm font-medium">
            Email:
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded px-2 py-1 w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add User
        </button>
      </form>

      {/* Message display */}
      {message && <p className="mb-4 text-sm">{message}</p>}

      {/* User list */}
      <h2 className="text-lg font-medium mb-2">User List:</h2>
      <ul className="list-disc pl-5">
        {users.map((user) => (
          <li key={user.id} className="mb-1">
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
