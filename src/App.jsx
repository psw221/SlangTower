import { useState } from 'react'
import HomeScreen from './screens/HomeScreen'
import GameScreen from './screens/GameScreen'
import ClearScreen from './screens/ClearScreen'
import BadgeModal from './components/BadgeModal'
import { useProgress } from './hooks/useProgress'
import { checkBadge } from './utils/badges'
import wordsData from './data/words.json'

const words = wordsData.words

export default function App() {
  const { progress, completeLevel, earnBadge, resetProgress } = useProgress()
  const [screen, setScreen] = useState('home') // 'home' | 'game' | 'clear'
  const [pendingBadge, setPendingBadge] = useState(null)
  const [clearedWord, setClearedWord] = useState(null)
  const [activeWord, setActiveWord] = useState(null)

  const currentWord = words.find((w) => w.level === progress.currentLevel) ?? null
  const isLast = !currentWord

  function handleStart() {
    setActiveWord(currentWord)
    setScreen('game')
  }

  function handleSelectLevel(level) {
    const word = words.find((w) => w.level === level)
    if (word) {
      setActiveWord(word)
      setScreen('game')
    }
  }

  function handleCorrect() {
    const completedLevel = activeWord.level
    setClearedWord(activeWord)
    completeLevel(completedLevel)

    // 이번 레벨 클리어로 새 배지 조건 충족 여부 확인
    const badge = checkBadge(completedLevel)
    if (badge && !progress.badges.find((b) => b.id === badge.id)) {
      earnBadge(badge)
      setPendingBadge(badge)
    }

    setScreen('clear')
  }

  function handleBadgeConfirm() {
    setPendingBadge(null)
  }

  function handleNextLevel() {
    setActiveWord(currentWord)
    setScreen(currentWord ? 'game' : 'home')
  }

  function handleHome() {
    setScreen('home')
  }

  return (
    <div className="max-w-md mx-auto min-h-screen">
      {screen === 'home' && (
        <HomeScreen
          currentLevel={progress.currentLevel}
          badges={progress.badges}
          isAllClear={isLast}
          completedLevels={progress.completedLevels}
          onStart={handleStart}
          onSelectLevel={handleSelectLevel}
          onRestart={resetProgress}
        />
      )}
      {screen === 'game' && activeWord && (
        <GameScreen
          wordData={activeWord}
          earnedBadges={progress.badges}
          onCorrect={handleCorrect}
          onHome={handleHome}
        />
      )}
      {screen === 'clear' && (
        <ClearScreen
          level={clearedWord?.level}
          word={clearedWord?.word}
          isLast={isLast}
          onNext={handleNextLevel}
          onHome={handleHome}
        />
      )}

      {/* 배지 획득 팝업 — 어느 화면 위에서나 표시 */}
      <BadgeModal badge={pendingBadge} onConfirm={handleBadgeConfirm} />
    </div>
  )
}
