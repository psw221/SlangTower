import { useState, useCallback } from 'react'

const STORAGE_KEY = 'slangtower_progress'

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? { currentLevel: 1, completedLevels: [], badges: [] }
  } catch {
    return { currentLevel: 1, completedLevels: [], badges: [] }
  }
}

function save(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function useProgress() {
  const [progress, setProgress] = useState(load)

  const completeLevel = useCallback((level) => {
    setProgress((prev) => {
      const completedLevels = prev.completedLevels.includes(level)
        ? prev.completedLevels
        : [...prev.completedLevels, level]
      const currentLevel = Math.max(prev.currentLevel, level + 1)
      const next = { ...prev, completedLevels, currentLevel }
      save(next)
      return next
    })
  }, [])

  const earnBadge = useCallback((badge) => {
    setProgress((prev) => {
      if (prev.badges.find((b) => b.id === badge.id)) return prev
      const badges = [...prev.badges, { ...badge, earnedDate: new Date().toISOString() }]
      const next = { ...prev, badges }
      save(next)
      return next
    })
  }, [])

  const resetProgress = useCallback(() => {
    setProgress((prev) => {
      const next = { ...prev, currentLevel: 1 }
      save(next)
      return next
    })
  }, [])

  return { progress, completeLevel, earnBadge, resetProgress }
}
