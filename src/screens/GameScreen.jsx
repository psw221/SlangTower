import { useState } from 'react'
import HeaderBar from '../components/HeaderBar'
import TileBoard from '../components/TileBoard'
import AnswerSlots from '../components/AnswerSlots'
import HintPanel from '../components/HintPanel'
import ResultModal from '../components/ResultModal'
import AdModal from '../components/AdModal'
import { useGameLogic } from '../hooks/useGameLogic'

const ERA_LABEL = { '2000s': '2000년대', '2010s': '2010년대', '2020s': '2020년대' }

export default function GameScreen({ wordData, posInEra, totalInEra, earnedBadges, onCorrect, onHome }) {
  const {
    cells,
    cols,
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
        era={wordData.era}
        eraLabel={ERA_LABEL[wordData.era] ?? wordData.era}
        posInEra={posInEra}
        totalInEra={totalInEra}
        syllableCount={wordData.syllables.length}
        earnedBadges={earnedBadges}
      />

      <div className="flex flex-col flex-1 px-4 py-4 gap-3">
        <div className="bg-white rounded-3xl shadow-sm p-5 flex flex-col gap-5">
          <AnswerSlots wordData={wordData} selected={selected} onDeselect={deselectLast} />
          <div className="h-px bg-gray-100" />
          <TileBoard
            cells={cells}
            cols={cols}
            selected={selected}
            onSelect={selectTile}
            firstSylRevealed={firstSylRevealed}
          />
        </div>

        <HintPanel
          wordData={wordData}
          hint1Visible={hint1Visible}
          firstSylRevealed={firstSylRevealed}
          onHint1={showHint1}
          onHint2={() => setAdModalOpen(true)}
        />
      </div>

      <button onClick={onHome} className="py-4 text-xs text-gray-400 text-center hover:text-gray-600 transition-colors">
        ← 홈으로
      </button>

      <ResultModal result={result} wordData={wordData} onNext={handleNext} onRetry={reset} />

      {adModalOpen && (
        <AdModal onComplete={handleAdComplete} onClose={() => setAdModalOpen(false)} />
      )}
    </div>
  )
}
