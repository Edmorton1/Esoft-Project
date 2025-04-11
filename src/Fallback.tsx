function Fallback({ error, resetErrorBoundary }: {error: Error, resetErrorBoundary: () => void}) {
  return (
    <>
      <div>{error.message}</div>
      <button onClick={resetErrorBoundary}>resetErrorBoundary</button>
    </>
  )
}

export default Fallback