import { useState, useCallback, useMemo } from 'react'
import { shuffle } from '../utils/shuffle'

export function useGameLogic(wordData) {
  const tiles = useMemo(() => {
    const correct = wordData.syllables.map((syl, i) => ({ id: i, syl, isDecoy: false }))
    const decoys = (wordData.decoys ?? []).map((syl, i) => ({
      id: wordData.syllables.length + i,
      syl,
      isDecoy: true,
    }))
    return shuffle([...correct, ...decoys])
  }, [wordData.id])

  const [selected, setSelected] = useState([])
  const [result, setResult] = useState(null) // 'correct' | 'wrong' | null
  const [hint1Visible, setHint1Visible] = useState(false)
  const [firstSylRevealed, setFirstSylRevealed] = useState(false)

  const selectTile = useCallback((tile) => {
    if (result) return
    setSelected((prev) => {
      if (prev.find((t) => t.id === tile.id)) return prev
      const next = [...prev, tile]
      if (next.length === wordData.syllables.length) {
        const answer = next.map((t) => t.syl).join('')
        setResult(answer === wordData.word ? 'correct' : 'wrong')
      }
      return next
    })
  }, [result, wordData])

  const deselectLast = useCallback(() => {
    if (result) return
    setSelected((prev) => prev.slice(0, -1))
  }, [result])

  const reset = useCallback(() => {
    setSelected([])
    setResult(null)
    setHint1Visible(false)
    setFirstSylRevealed(false)
  }, [])

  return {
    tiles,
    selected,
    result,
    hint1Visible,
    firstSylRevealed,
    selectTile,
    deselectLast,
    reset,
    showHint1: () => setHint1Visible(true),
    revealFirstSyl: () => setFirstSylRevealed(true),
  }
}
