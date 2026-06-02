import { useEffect, useState } from 'react'
import { buildApiUrl, resolveApiResponse } from './api'

function Teams() {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const apiUrl = buildApiUrl('teams')

  useEffect(() => {
    let active = true

    setLoading(true)
    fetch(buildApiUrl('teams'))
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Teams API returned ${response.status}`)
        }
        return response.json()
      })
      .then((payload) => {
        if (!active) return
        setTeams(resolveApiResponse(payload))
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
      <h2>Teams</h2>
      <p>
        This page loads teams from <code>{apiUrl}</code>
      </p>
      {loading && <p>Loading teams…</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && teams.length === 0 && <p>No teams found.</p>}
      {!loading && !error && teams.length > 0 && (
        <ul className="resource-list">
          {teams.map((team, index) => {
            const label = team?.name ?? team?.teamName ?? `Team ${index + 1}`
            const key = team?.id ?? team?._id ?? index
            return (
              <li key={key}>
                <strong>{label}</strong>
                <pre>{JSON.stringify(team, null, 2)}</pre>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}

export default Teams
