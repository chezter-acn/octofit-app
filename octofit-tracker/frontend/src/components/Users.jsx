import { useEffect, useState } from 'react'
import { buildApiUrl, resolveApiResponse } from './api'

function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const apiUrl = buildApiUrl('users')

  useEffect(() => {
    let active = true

    setLoading(true)
    fetch(buildApiUrl('users'))
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Users API returned ${response.status}`)
        }
        return response.json()
      })
      .then((payload) => {
        if (!active) return
        setUsers(resolveApiResponse(payload))
      })
      .catch((fetchError) => {
        if (!active) return
        setError(fetchError.message)
      })
      .finally(() => {
        if (!active) return
        setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  return (
    <section>
      <h2>Users</h2>
      <p>
        This page loads users from <code>{apiUrl}</code>
      </p>
      <p>
        Example endpoint: <code>{`https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`}</code>
      </p>
      {loading && <p>Loading users…</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && users.length === 0 && <p>No users found.</p>}
      {!loading && !error && users.length > 0 && (
        <ul className="resource-list">
          {users.map((user, index) => {
            const label = user?.name ?? user?.username ?? user?.email ?? `User ${index + 1}`
            const key = user?.id ?? user?._id ?? index
            return (
              <li key={key}>
                <strong>{label}</strong>
                <pre>{JSON.stringify(user, null, 2)}</pre>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}

export default Users
