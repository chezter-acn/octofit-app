import { useEffect, useState } from 'react'
import { buildApiUrl, resolveApiResponse } from './api'

function Leaderboard() {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const apiUrl = buildApiUrl('leaderboard')

  useEffect(() => {
    let active = true

    setLoading(true)
    fetch(buildApiUrl('leaderboard'))
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Leaderboard API returned ${response.status}`)
        }
        return response.json()
      })
      .then((payload) => {
        if (!active) return
        setEntries(resolveApiResponse(payload))
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
      <h2>Leaderboard</h2>
      <p>
        This page loads leaderboard data from <code>{apiUrl}</code>
      </p>
      <p>
        Example endpoint: <code>{`https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`}</code>
      </p>
      {loading && <p>Loading leaderboard…</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && entries.length === 0 && <p>No leaderboard entries found.</p>}
      {!loading && !error && entries.length > 0 && (
        <ul className="resource-list">
          {entries.map((entry, index) => {
            const label = entry?.name ?? entry?.username ?? entry?.team ?? `Entry ${index + 1}`
            const key = entry?.id ?? entry?._id ?? index
            return (
              <li key={key}>
                <strong>{label}</strong>
                <pre>{JSON.stringify(entry, null, 2)}</pre>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}

export default Leaderboard
