import { useState } from 'react'
import HeaderBar from '../components/HeaderBar'
import TileBoard from '../components/TileBoard'
import AnswerSlots from '../components/AnswerSlots'
import HintPanel from '../components/HintPanel'
import ResultModal from '../components/ResultModal'
import AdModal from '../components/AdModal'
import { useGameLogic } from '../hooks/useGameLogic'

const ERA_LABEL = { '2000s': '2000년대', '2010s': '2010년대', '2020s': '2020년대' }

export default function GameScreen({ wordData, earnedBadges, onCorrect, onHome }) {
  const {
    tiles,
    selected,
    result,
    hint1Visible,
    firstSylRevealed,
    selectTile,
    deselectLast,
    reset,
    showHint1,
    revealFirstSyl,
  } = useGameLogic(wordData)

  const [adModalOpen, setAdModalOpen] = useState(false)

  function handleAdComplete() {
    setAdModalOpen(false)
    revealFirstSyl()
  }

  function handleNext() {
    reset()
    onCorrect()
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <HeaderBar
        level={wordData.level}
        syllableCount={wordData.syllables.length}
        earnedBadges={earnedBadges}
      />

      {/* 게임 영역 */}
      <div className="flex flex-col flex-1 px-4 py-6 gap-4">
        {/* 시대 뱃지 */}
        <div className="flex justify-center">
          <span className="bg-indigo-100 text-indigo-600 text-xs font-bold px-3 py-1 rounded-full">
            {ERA_LABEL[wordData.era] ?? wordData.era}
          </span>
        </div>

        {/* 정답 슬롯 + 타일 카드 */}
        <div className="bg-white rounded-3xl shadow-sm p-6 flex flex-col gap-6">
          <AnswerSlots wordData={wordData} selected={selected} onDeselect={deselectLast} />

          <div className="h-px bg-gray-100" />

          <TileBoard
            tiles={tiles}
            selected={selected}
            onSelect={selectTile}
            firstSylRevealed={firstSylRevealed}
          />
        </div>

        {/* 힌트 패널 */}
        <HintPanel
          wordData={wordData}
          hint1Visible={hint1Visible}
          firstSylRevealed={firstSylRevealed}
          onHint1={showHint1}
          onHint2={() => setAdModalOpen(true)}
        />
      </div>

      {/* 홈 버튼 */}
      <button
        onClick={onHome}
        className="py-4 text-xs text-gray-400 text-center"
      >
        ← 홈으로
      </button>

      <ResultModal result={result} wordData={wordData} onNext={handleNext} onRetry={reset} />

      {adModalOpen && (
        <AdModal onComplete={handleAdComplete} onClose={() => setAdModalOpen(false)} />
      )}
    </div>
  )
}
