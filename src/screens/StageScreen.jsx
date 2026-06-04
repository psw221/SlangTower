import { useState, useRef, useLayoutEffect } from 'react'
import { getStars } from '../utils/difficulty'

const ERA_META = {
  '2000s': {
    label: '2000년대',
    icon: '📼',
    nodeFill: '#f43f5e',
    nodeRing: '#fecdd3',
    pathColor: '#fb7185',
    tieColor: '#fda4af',
    btnClass: 'bg-gradient-to-r from-rose-500 to-pink-500 shadow-rose-200',
    headerFrom: 'from-rose-700',
    headerTo: 'to-rose-500',
  },
  '2010s': {
    label: '2010년대',
    icon: '📱',
    nodeFill: '#7c3aed',
    nodeRing: '#ede9fe',
    pathColor: '#8b5cf6',
    tieColor: '#c4b5fd',
    btnClass: 'bg-gradient-to-r from-violet-600 to-purple-600 shadow-violet-200',
    headerFrom: 'from-violet-700',
    headerTo: 'to-violet-500',
  },
  '2020s': {
    label: '2020년대',
    icon: '🤳',
    nodeFill: '#4f46e5',
    nodeRing: '#e0e7ff',
    pathColor: '#6366f1',
    tieColor: '#a5b4fc',
    btnClass: 'bg-gradient-to-r from-indigo-600 to-violet-600 shadow-indigo-200',
    headerFrom: 'from-indigo-700',
    headerTo: 'to-indigo-500',
  },
}

// 스크롤 영역 배경색(slate-50)과 동일 — 레일 가운데를 덮어 두 줄로 보이게 함
const TRACK_BG = '#f8fafc'

// 기찻길 한 구간 렌더링: 침목(가로 바) → 레일 받침 → 가운데 덮기(두 줄 레일)
function TrackLayer({ d, railColor, tieColor }) {
  if (!d) return null
  return (
    <g fill="none">
      {/* 침목(ties): 넓은 stroke를 짧은 dash로 끊어 가로 바처럼 */}
      <path d={d} stroke={tieColor} strokeWidth={26} strokeDasharray="5 16" strokeLinecap="butt" />
      {/* 레일 받침 */}
      <path d={d} stroke={railColor} strokeWidth={14} strokeLinecap="round" />
      {/* 가운데를 배경색으로 덮어 좌우 두 줄 레일만 남김 */}
      <path d={d} stroke={TRACK_BG} strokeWidth={7} strokeLinecap="round" />
    </g>
  )
}

// 7주기 지그재그 x 위치 (컨테이너 너비 비율)
const ZIGZAG_X = [0.55, 0.70, 0.65, 0.50, 0.35, 0.28, 0.40]
const NODE_SLOT_H = 100
const NODE_R = 30
const CURRENT_R = 34
const POPUP_H = 160 // 팝업 높이 추정치 (위치 계산용)
const POPUP_W = 208

export default function StageScreen({ era, words, completedWordIds, onSelectWord, onBack }) {
  const meta = ERA_META[era] ?? ERA_META['2020s']
  const containerRef = useRef(null)
  const [width, setWidth] = useState(340)
  const [selectedId, setSelectedId] = useState(null)

  useLayoutEffect(() => {
    const el = containerRef.current
    if (!el) return
    setWidth(el.offsetWidth)
    const ro = new ResizeObserver(entries => setWidth(entries[0].contentRect.width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const completedSet = new Set(completedWordIds)
  const currentIndex = words.findIndex(w => !completedSet.has(w.id))
  const allDone = currentIndex === -1
  const doneCount = allDone ? words.length : currentIndex

  const topPad = 20
  const totalH = words.length * NODE_SLOT_H + topPad + 160

  const nodePositions = words.map((_, i) => ({
    x: ZIGZAG_X[i % ZIGZAG_X.length] * width,
    y: topPad + i * NODE_SLOT_H + NODE_SLOT_H / 2,
  }))

  function buildPath(pts) {
    if (pts.length < 2) return ''
    let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`
    for (let i = 1; i < pts.length; i++) {
      const p0 = pts[i - 1]
      const p1 = pts[i]
      const midY = ((p0.y + p1.y) / 2).toFixed(1)
      d += ` C ${p0.x.toFixed(1)},${midY} ${p1.x.toFixed(1)},${midY} ${p1.x.toFixed(1)},${p1.y.toFixed(1)}`
    }
    return d
  }

  const splitAt = allDone ? words.length - 1 : currentIndex
  const donePath = buildPath(nodePositions.slice(0, splitAt + 1))
  const upcomingPath = buildPath(nodePositions.slice(splitAt))

  return (
    <div
      className="flex flex-col min-h-screen bg-slate-50"
      onClick={() => setSelectedId(null)}
    >
      {/* 헤더 */}
      <div className={`bg-gradient-to-b ${meta.headerFrom} ${meta.headerTo} px-5 pt-12 pb-10 text-white`}>
        <button
          onClick={e => { e.stopPropagation(); onBack() }}
          className="text-white/80 hover:text-white text-sm mb-4 flex items-center gap-1"
        >
          ← 뒤로
        </button>
        <div className="flex items-end justify-between">
          <div>
            <div className="text-4xl mb-1">{meta.icon}</div>
            <h2 className="text-2xl font-extrabold">{meta.label}</h2>
            <p className="text-white/70 text-sm mt-0.5">
              {allDone ? '🏆 전부 정복!' : `⚔️ ${doneCount} / ${words.length} 정복`}
            </p>
          </div>
          <span className="text-4xl font-extrabold opacity-90">
            {Math.round((doneCount / words.length) * 100)}%
          </span>
        </div>
        <div className="mt-4 h-1.5 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-white/70 rounded-full transition-all duration-700"
            style={{ width: `${Math.round((doneCount / words.length) * 100)}%` }}
          />
        </div>
      </div>

      {/* 경로 스크롤 영역 */}
      <div className="flex-1 overflow-y-auto -mt-5 pb-8">
        <div
          ref={containerRef}
          className="relative"
          style={{ height: `${totalH}px` }}
        >
          {/* SVG 트랙 */}
          <svg
            className="absolute inset-0 pointer-events-none"
            style={{ width: '100%', height: totalH }}
            viewBox={`0 0 ${width} ${totalH}`}
            preserveAspectRatio="none"
          >
            {/* 아직 못 간 구간 — 회색 기찻길 */}
            <TrackLayer d={upcomingPath} railColor="#94a3b8" tieColor="#cbd5e1" />
            {/* 지나온 구간 — 시대 색 기찻길 */}
            <TrackLayer d={donePath} railColor={meta.pathColor} tieColor={meta.tieColor} />
          </svg>

          {/* 노드 */}
          {words.map((word, i) => {
            const { x, y } = nodePositions[i]
            const isCompleted = completedSet.has(word.id)
            const isCurrent = i === currentIndex
            const isLocked = !isCompleted && !isCurrent
            // 열차 선두(기관차): 진행 중이면 현재 노드, 전부 완료면 맨 끝 노드
            const isEngine = allDone ? i === words.length - 1 : isCurrent
            const isSelected = word.id === selectedId
            const r = isEngine ? CURRENT_R : NODE_R
            const diameter = r * 2
            const stars = getStars(word.syllables.length)

            const popupLeft = Math.min(Math.max(x - POPUP_W / 2, 8), width - POPUP_W - 8)
            const isNearBottom = y + r + 12 + POPUP_H > totalH - 60
            const popupTop = isNearBottom ? y - r - 12 - POPUP_H : y + r + 12

            return (
              <div key={word.id}>
                {/* 기관차(선두) glow ring */}
                {isEngine && (
                  <div
                    className="absolute rounded-full animate-pulse pointer-events-none"
                    style={{
                      left: x,
                      top: y,
                      width: diameter + 16,
                      height: diameter + 16,
                      transform: 'translate(-50%, -50%)',
                      backgroundColor: meta.nodeRing,
                    }}
                  />
                )}

                {/* 노드 버튼 */}
                <button
                  onClick={e => {
                    e.stopPropagation()
                    setSelectedId(prev => prev === word.id ? null : word.id)
                  }}
                  className="absolute flex items-center justify-center rounded-full transition-all active:scale-90 shadow-md"
                  style={{
                    left: x,
                    top: y,
                    width: diameter,
                    height: diameter,
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: isEngine ? meta.nodeFill : isCompleted ? '#ffffff' : '#d1d5db',
                    border: isCompleted && !isEngine ? `3px solid ${meta.nodeFill}` : 'none',
                    zIndex: isSelected ? 20 : 10,
                  }}
                >
                  {isEngine ? (
                    <span className="text-2xl leading-none">🚂</span>
                  ) : isCompleted ? (
                    <span className="text-xl leading-none">🚃</span>
                  ) : (
                    <span className="text-gray-400 text-base leading-none">🔒</span>
                  )}
                </button>

                {/* 팝업 */}
                {isSelected && (
                  <div
                    className="absolute bg-white rounded-2xl shadow-2xl p-4 z-30 animate-scale-in"
                    style={{ left: popupLeft, top: popupTop, width: POPUP_W }}
                    onClick={e => e.stopPropagation()}
                  >
                    {isLocked ? (
                      <div className="text-center py-1">
                        <p className="text-2xl mb-2">🔒</p>
                        <p className="text-sm font-bold text-gray-700 mb-1">잠긴 단어</p>
                        <p className="text-xs text-gray-400">이전 문제를 먼저 정복하세요</p>
                      </div>
                    ) : (
                      <>
                        {/* 별 난이도 */}
                        <div className="flex gap-0.5 mb-2">
                          {Array.from({ length: 4 }).map((_, j) => (
                            <span key={j} className={`text-base leading-none ${j < stars ? 'text-amber-400' : 'text-gray-200'}`}>★</span>
                          ))}
                        </div>
                        <p className="text-xl font-extrabold text-gray-800 mb-1">
                          {isCompleted ? word.word : '???'}
                        </p>
                        {isCompleted && word.hint1 ? (
                          <p className="text-xs text-gray-500 mb-3 leading-relaxed line-clamp-2">{word.hint1}</p>
                        ) : (
                          <p className="text-xs text-gray-400 mb-3">정복에 도전해보세요!</p>
                        )}
                        <button
                          onClick={() => onSelectWord(word.id)}
                          className={`w-full py-2.5 rounded-xl ${meta.btnClass} text-white font-bold text-sm shadow-lg active:scale-95 transition-all`}
                        >
                          {isCompleted ? '다시 도전' : '도전하기 →'}
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            )
          })}

          {/* 전체 완료 배너 */}
          {allDone && nodePositions.length > 0 && (
            <div
              className="absolute"
              style={{
                left: '50%',
                top: nodePositions[words.length - 1].y + NODE_R + 28,
                transform: 'translateX(-50%)',
                zIndex: 5,
              }}
            >
              <div className="bg-gradient-to-r from-amber-400 to-orange-400 rounded-2xl px-6 py-3 text-center text-white shadow-lg shadow-amber-200 whitespace-nowrap">
                <p className="text-xl mb-0.5">👑</p>
                <p className="font-extrabold text-sm">{meta.label} 완전 정복!</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
