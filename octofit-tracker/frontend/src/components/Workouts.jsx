import { useEffect, useState } from 'react'
import { buildApiUrl, resolveApiResponse } from './api'

function Workouts() {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const apiUrl = buildApiUrl('workouts')

  useEffect(() => {
    let active = true

    fetch(buildApiUrl('workouts'))
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Workouts API returned ${response.status}`)
        }
        return response.json()
      })
      .then((payload) => {
        if (!active) return
        setWorkouts(resolveApiResponse(payload))
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
      <h2>Workouts</h2>
      <p>
        This page loads workouts from <code>{apiUrl}</code>.
      </p>
      <p>
        Example endpoint: <code>{`https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`}</code>
      </p>
      {loading && <p>Loading workouts…</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && workouts.length === 0 && <p>No workouts found.</p>}
      {!loading && !error && workouts.length > 0 && (
        <ul className="resource-list">
          {workouts.map((workout, index) => {
            const label = workout?.name ?? workout?.title ?? workout?.type ?? `Workout ${index + 1}`
            const key = workout?.id ?? workout?._id ?? index
            return (
              <li key={key}>
                <strong>{label}</strong>
                <pre>{JSON.stringify(workout, null, 2)}</pre>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}

export default Workouts
