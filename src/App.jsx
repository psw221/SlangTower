import { useState } from 'react'
import HomeScreen from './screens/HomeScreen'
import StageScreen from './screens/StageScreen'
import GameScreen from './screens/GameScreen'
import ClearScreen from './screens/ClearScreen'
import BadgeModal from './components/BadgeModal'
import { useProgress } from './hooks/useProgress'
import { checkBadge } from './utils/badges'
import wordsData from './data/words.json'

const words = wordsData.words
const ERAS = ['2000s', '2010s', '2020s']
const ERA_LABEL = { '2000s': '2000년대', '2010s': '2010년대', '2020s': '2020년대' }

function getEraWords(era) {
  return words
    .filter((w) => w.era === era)
    .sort((a, b) => a.syllables.length - b.syllables.length)
}

function getNextWord(era, completedIds) {
  return getEraWords(era).find((w) => !completedIds.includes(w.id)) ?? null
}

export default function App() {
  const { progress, completeWord, earnBadge, resetProgress } = useProgress()
  const [screen, setScreen] = useState('home') // 'home' | 'stage' | 'game' | 'clear'
  const [pendingBadge, setPendingBadge] = useState(null)
  const [activeWord, setActiveWord] = useState(null)
  const [activeEra, setActiveEra] = useState(null)
  const [clearState, setClearState] = useState(null) // { word, isEraClear, eraLabel, isLast }

  const isAllClear = words.every((w) => progress.completedWordIds.includes(w.id))

  function handleOpenStage(era) {
    setActiveEra(era)
    setScreen('stage')
  }

  function handleSelectWord(wordId) {
    const word = words.find((w) => w.id === wordId)
    if (!word) return
    setActiveEra(word.era)
    setActiveWord(word)
    setScreen('game')
  }

  function handleCorrect() {
    const completedId = activeWord.id
    const era = activeWord.era

    // 완료 처리 (state 업데이트는 비동기이므로 로컬에서 계산)
    const newCompletedIds = progress.completedWordIds.includes(completedId)
      ? progress.completedWordIds
      : [...progress.completedWordIds, completedId]

    completeWord(completedId)

    const eraWords = getEraWords(era)
    const isEraClear = eraWords.every((w) => newCompletedIds.includes(w.id))
    const allDone = words.every((w) => newCompletedIds.includes(w.id))

    // 배지 확인
    const badge = checkBadge(newCompletedIds, words, progress.badges.map((b) => b.id))
    if (badge && !progress.badges.find((b) => b.id === badge.id)) {
      earnBadge(badge)
      setPendingBadge(badge)
    }

    setClearState({
      word: activeWord.word,
      hint1: activeWord.hint1,
      isEraClear,
      eraLabel: ERA_LABEL[era] ?? era,
      isLast: allDone,
    })
    setScreen('clear')
  }

  function handleNextInEra() {
    const nextWord = getNextWord(activeEra, [
      ...progress.completedWordIds,
      // activeWord.id가 아직 state에 반영 안 됐을 수 있으므로 포함
      activeWord.id,
    ])
    if (nextWord) {
      setActiveWord(nextWord)
      setScreen('game')
    } else {
      setScreen('home')
    }
  }

  function handleHome() {
    setScreen('home')
  }

  function handleBadgeConfirm() {
    setPendingBadge(null)
  }

  // GameScreen에서 현재 단어가 era 내 몇 번째인지 계산
  const eraWords = activeEra ? getEraWords(activeEra) : []
  const posInEra = activeWord ? eraWords.findIndex((w) => w.id === activeWord.id) + 1 : 1
  const totalInEra = eraWords.length

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-50 shadow-2xl shadow-slate-300/50">
      {screen === 'home' && (
        <HomeScreen
          completedWordIds={progress.completedWordIds}
          badges={progress.badges}
          isAllClear={isAllClear}
          onOpenStage={handleOpenStage}
          onRestart={resetProgress}
        />
      )}
      {screen === 'stage' && activeEra && (
        <StageScreen
          era={activeEra}
          words={getEraWords(activeEra)}
          completedWordIds={progress.completedWordIds}
          onSelectWord={handleSelectWord}
          onBack={() => setScreen('home')}
        />
      )}
      {screen === 'game' && activeWord && (
        <GameScreen
          wordData={activeWord}
          posInEra={posInEra}
          totalInEra={totalInEra}
          earnedBadges={progress.badges}
          onCorrect={handleCorrect}
          onHome={handleHome}
        />
      )}
      {screen === 'clear' && clearState && (
        <ClearScreen
          word={clearState.word}
          hint1={clearState.hint1}
          isEraClear={clearState.isEraClear}
          eraLabel={clearState.eraLabel}
          isLast={clearState.isLast}
          onNext={handleNextInEra}
          onHome={handleHome}
        />
      )}

      <BadgeModal badge={pendingBadge} onConfirm={handleBadgeConfirm} />
    </div>
  )
}
