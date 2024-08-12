export const formatTime = (isoString: string) => {
  const date = new Date(isoString)

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  } as const

  return date.toLocaleString('en-US', options)
}
