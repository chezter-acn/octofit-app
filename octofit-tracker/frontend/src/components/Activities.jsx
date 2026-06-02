import { useEffect, useState } from 'react'
import { buildApiUrl, resolveApiResponse } from './api'

function Activities() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const apiUrl = buildApiUrl('activities')

  useEffect(() => {
    let active = true

    setLoading(true)
    fetch(buildApiUrl('activities'))
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Activity API returned ${response.status}`)
        }
        return response.json()
      })
      .then((payload) => {
        if (!active) return
        setActivities(resolveApiResponse(payload))
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
      <h2>Activities</h2>
      <p>
        This page loads activities from <code>{apiUrl}</code>
      </p>
      {loading && <p>Loading activities…</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && activities.length === 0 && <p>No activities found.</p>}
      {!loading && !error && activities.length > 0 && (
        <ul className="resource-list">
          {activities.map((activity, index) => {
            const label = activity?.name ?? activity?.title ?? activity?.type ?? `Activity ${index + 1}`
            const key = activity?.id ?? activity?._id ?? index
            return (
              <li key={key}>
                <strong>{label}</strong>
                <pre>{JSON.stringify(activity, null, 2)}</pre>
              </li>
            )
          })}
        </ul>
      )}
    </section>
  )
}

export default Activities
