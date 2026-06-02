export const getCodespaceName = () => import.meta.env.VITE_CODESPACE_NAME?.trim() || ''

export const getApiOrigin = () => {
  const codespaceName = getCodespaceName()
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`
  }

  // Fallback when VITE_CODESPACE_NAME is unset.
  // This avoids URLs like https://undefined-8000.app.github.dev.
  return 'http://localhost:8000'
}

export const buildApiUrl = (resource) => `${getApiOrigin()}/api/${resource}/`

export const resolveApiResponse = (payload) => {
  if (Array.isArray(payload)) {
    return payload
  }

  if (!payload || typeof payload !== 'object') {
    return []
  }

  const data = payload.data ?? payload.items ?? payload.results ?? payload.records
  if (Array.isArray(data)) {
    return data
  }

  return []
}
