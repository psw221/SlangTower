import { useState, useCallback } from 'react'

const STORAGE_KEY = 'slangtower_progress'

function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (!raw) return { completedWordIds: [], badges: [] }

    // 구 포맷 마이그레이션 (currentLevel 키가 있으면 구 포맷)
    if ('currentLevel' in raw) {
      const completedWordIds = raw.completedLevels ?? []
      return { completedWordIds, badges: raw.badges ?? [] }
    }

    return raw
  } catch {
    return { completedWordIds: [], badges: [] }
  }
}

function save(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function useProgress() {
  const [progress, setProgress] = useState(load)

  const completeWord = useCallback((wordId) => {
    setProgress((prev) => {
      if (prev.completedWordIds.includes(wordId)) return prev
      const next = { ...prev, completedWordIds: [...prev.completedWordIds, wordId] }
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
      const next = { completedWordIds: [], badges: prev.badges }
      save(next)
      return next
    })
  }, [])

  return { progress, completeWord, earnBadge, resetProgress }
}
