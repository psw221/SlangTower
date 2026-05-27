import { SYLLABLE_POOL } from './syllablePool'
import { shuffle } from './shuffle'

const DIRS = [[-1, 0], [1, 0], [0, -1], [0, 1]]

function generatePath(syllableCount, size) {
  for (let attempt = 0; attempt < 50; attempt++) {
    const startRow = Math.floor(Math.random() * size)
    const startCol = Math.floor(Math.random() * size)
    const path = [[startRow, startCol]]
    const visited = new Set([`${startRow},${startCol}`])

    let success = true
    for (let i = 1; i < syllableCount; i++) {
      const [r, c] = path[path.length - 1]
      const neighbors = DIRS
        .map(([dr, dc]) => [r + dr, c + dc])
        .filter(([nr, nc]) =>
          nr >= 0 && nr < size && nc >= 0 && nc < size && !visited.has(`${nr},${nc}`)
        )

      if (neighbors.length === 0) {
        success = false
        break
      }

      const [nr, nc] = neighbors[Math.floor(Math.random() * neighbors.length)]
      path.push([nr, nc])
      visited.add(`${nr},${nc}`)
    }

    if (success) return path
  }

  // fallback: 첫 번째 행에 수평 배치
  return Array.from({ length: syllableCount }, (_, i) => [0, i % size])
}

export function buildGrid(wordData) {
  const { syllables, decoys = [] } = wordData
  const size = syllables.length <= 3 ? 3 : 4
  const totalCells = size * size

  const path = generatePath(syllables.length, size)

  // 그리드 배열 초기화
  const grid = Array(totalCells).fill(null)

  // 정답 음절을 경로에 배치
  path.forEach(([row, col], i) => {
    grid[row * size + col] = { id: i, syl: syllables[i], isDecoy: false }
  })

  // 채움용 풀: decoys 우선, 부족하면 SYLLABLE_POOL에서 보충
  const answerSet = new Set(syllables)
  const fillerPool = shuffle([
    ...decoys,
    ...SYLLABLE_POOL.filter((s) => !answerSet.has(s)),
  ])

  // 나머지 셀 채우기
  let fillerIdx = 0
  for (let i = 0; i < totalCells; i++) {
    if (!grid[i]) {
      grid[i] = {
        id: syllables.length + fillerIdx,
        syl: fillerPool[fillerIdx % fillerPool.length],
        isDecoy: true,
      }
      fillerIdx++
    }
  }

  const cells = grid.map((cell, i) => ({
    ...cell,
    row: Math.floor(i / size),
    col: i % size,
  }))

  return { cells, cols: size, rows: size }
}
