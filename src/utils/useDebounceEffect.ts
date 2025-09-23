import { useEffect, DependencyList } from 'react'

export function useDebounceEffect(
  fn: () => void,
  waitTime: number,
  deps?: DependencyList,
) {
  useEffect(() => {
    const t = setTimeout(() => {
      fn()
    }, waitTime)

    return () => {
      clearTimeout(t)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps ? [fn, waitTime, ...deps] : [fn, waitTime])
}
