<template>
  <div class="queens-puzzle">
    <div class="header">
      <h1 class="title">♛ 8皇后問題解法 ♛</h1>
      <p class="subtitle">總共找到 {{ solutions.length }} 個解法</p>
    </div>

    <div class="controls">
      <button 
        @click="solvePuzzle" 
        :disabled="loading"
        class="solve-btn"
      >
        {{ loading ? '計算中...' : '重新計算' }}
      </button>
      
      <div v-if="solutions.length > 0" class="navigation">
        <button 
          @click="previousSolution" 
          :disabled="currentIndex === 0"
          class="nav-btn"
        >
          ← 上一個
        </button>
        
        <span class="solution-counter">
          解法 {{ currentIndex + 1 }} / {{ solutions.length }}
        </span>
        
        <button 
          @click="nextSolution" 
          :disabled="currentIndex === solutions.length - 1"
          class="nav-btn"
        >
          下一個 →
        </button>
      </div>
    </div>

    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>正在計算所有可能的解法...</p>
    </div>

    <div v-else-if="solutions.length > 0" class="puzzle-container">
      <div class="chessboard">
        <div 
          v-for="(row, rowIndex) in currentSolution" 
          :key="rowIndex"
          class="board-row"
        >
          <div 
            v-for="(cell, colIndex) in row" 
            :key="colIndex"
            :class="[
              'board-cell',
              (rowIndex + colIndex) % 2 === 0 ? 'light' : 'dark',
              { 'queen': cell === 'Q' }
            ]"
          >
            {{ cell === 'Q' ? '♛' : '' }}
          </div>
        </div>
      </div>

      <div class="solution-info">
        <h3>解法詳情</h3>
        <div class="queen-positions">
          <p v-for="(position, index) in queenPositions" :key="index">
            第 {{ index + 1 }} 行皇后在第 {{ position + 1 }} 列
          </p>
        </div>
        
        <div class="validation">
          <span :class="['status', isValidSolution ? 'valid' : 'invalid']">
            {{ isValidSolution ? '✅ 有效解法' : '❌ 無效解法' }}
          </span>
        </div>
      </div>
    </div>

    <div v-if="error" class="error">
      <p>{{ error }}</p>
    </div>

    <div class="stats" v-if="executionTime">
      <p>⏱️ 計算時間: {{ executionTime }} 毫秒</p>
      <p>🧮 算法: 回溯法 (Backtracking)</p>
    </div>
  </div>
</template>

<script>
import { solveNQueens, validateSolution } from '@/services/queensSolver.js'

export default {
  name: 'QueensPuzzle',
  data() {
    return {
      solutions: [],
      currentIndex: 0,
      loading: false,
      error: null,
      executionTime: null
    }
  },
  computed: {
    currentSolution() {
      if (this.solutions.length === 0) return []
      return this.solutions[this.currentIndex].map(row => row.split(''))
    },
    queenPositions() {
      if (this.solutions.length === 0) return []
      return this.solutions[this.currentIndex].map(row => row.indexOf('Q'))
    },
    isValidSolution() {
      if (this.solutions.length === 0) return false
      return validateSolution(this.solutions[this.currentIndex])
    }
  },
  mounted() {
    this.solvePuzzle()
  },
  methods: {
    async solvePuzzle() {
      this.loading = true
      this.error = null
      
      try {
        const startTime = performance.now()
        
        // 使用 setTimeout 讓 UI 有時間更新 loading 狀態
        await new Promise(resolve => setTimeout(resolve, 100))
        
        this.solutions = solveNQueens()
        this.currentIndex = 0
        
        const endTime = performance.now()
        this.executionTime = (endTime - startTime).toFixed(2)
        
        if (this.solutions.length === 0) {
          this.error = '找不到任何解法'
        }
      } catch (err) {
        this.error = '計算過程中發生錯誤: ' + err.message
      } finally {
        this.loading = false
      }
    },
    nextSolution() {
      if (this.currentIndex < this.solutions.length - 1) {
        this.currentIndex++
      }
    },
    previousSolution() {
      if (this.currentIndex > 0) {
        this.currentIndex--
      }
    }
  }
}
</script>

<style scoped>
.queens-puzzle {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  font-family: 'Arial', sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.title {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
}

.subtitle {
  font-size: 1.2rem;
  color: #7f8c8d;
  margin: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 15px;
}

.solve-btn {
  background: linear-gradient(45deg, #3498db, #2980b9);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.solve-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0,0,0,0.15);
}

.solve-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.navigation {
  display: flex;
  align-items: center;
  gap: 15px;
}

.nav-btn {
  background: #34495e;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.nav-btn:hover:not(:disabled) {
  background: #2c3e50;
}

.nav-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.solution-counter {
  font-weight: bold;
  color: #2c3e50;
  min-width: 120px;
  text-align: center;
}

.loading {
  text-align: center;
  padding: 40px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #ecf0f1;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.puzzle-container {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 30px;
  align-items: start;
}

@media (max-width: 768px) {
  .puzzle-container {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}

.chessboard {
  display: inline-block;
  border: 3px solid #2c3e50;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
}

.board-row {
  display: flex;
}

.board-cell {
  width: 53px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  position: relative;
  transition: all 0.3s ease;
}

.board-cell.light {
  background-color: #f4f4f4;
}

.board-cell.dark {
  background-color: #8b4513;
}

.board-cell.queen {
  background: radial-gradient(circle, #ffd700, #ffed4a);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.solution-info {
  background: #ecf0f1;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.solution-info h3 {
  margin-top: 0;
  color: #2c3e50;
  border-bottom: 2px solid #3498db;
  padding-bottom: 10px;
}

.queen-positions {
  margin: 15px 0;
}

.queen-positions p {
  margin: 5px 0;
  color: #34495e;
  font-size: 0.9rem;
}

.validation {
  margin-top: 20px;
  text-align: center;
}

.status {
  padding: 8px 16px;
  border-radius: 20px;
  font-weight: bold;
  font-size: 0.9rem;
}

.status.valid {
  background: #2ecc71;
  color: white;
}

.status.invalid {
  background: #e74c3c;
  color: white;
}

.error {
  text-align: center;
  color: #e74c3c;
  background: #fdf2f2;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #f5c6cb;
}

.stats {
  margin-top: 30px;
  text-align: center;
  color: #7f8c8d;
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
}

.stats p {
  margin: 5px 0;
}
</style> 