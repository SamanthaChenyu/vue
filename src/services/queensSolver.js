/**
 * 8皇后問題解法
 * 使用回溯算法找出所有可能的解法
 * 每個解法用'Q'表示皇后，'.'表示空位
 */

/**
 * 檢查在(row, col)位置放置皇后是否安全
 * @param {number[][]} board - 當前棋盤狀態 (1表示皇后，0表示空位)
 * @param {number} row - 要檢查的行
 * @param {number} col - 要檢查的列
 * @returns {boolean} - 是否安全
 */
function isSafe(board, row, col) {
  const n = board.length;
  
  // 檢查同一列是否有皇后
  for (let i = 0; i < row; i++) {
    if (board[i][col] === 1) {
      return false;
    }
  }
  
  // 檢查左上對角線
  for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
    if (board[i][j] === 1) {
      return false;
    }
  }
  
  // 檢查右上對角線
  for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
    if (board[i][j] === 1) {
      return false;
    }
  }
  
  return true;
}

/**
 * 將數字棋盤轉換為字符串格式
 * @param {number[][]} board - 數字格式的棋盤
 * @returns {string[]} - 字符串格式的棋盤
 */
function boardToString(board) {
  return board.map(row => 
    row.map(cell => cell === 1 ? 'Q' : '.').join('')
  );
}

/**
 * 回溯算法解決N皇后問題
 * @param {number[][]} board - 當前棋盤狀態
 * @param {number} row - 當前處理的行
 * @param {string[][]} solutions - 存儲所有解法的數組
 */
function solve(board, row, solutions) {
  const n = board.length;
  
  // 如果所有皇后都已放置，找到一個解
  if (row === n) {
    solutions.push(boardToString(board));
    return;
  }
  
  // 嘗試在當前行的每一列放置皇后
  for (let col = 0; col < n; col++) {
    if (isSafe(board, row, col)) {
      // 放置皇后
      board[row][col] = 1;
      
      // 遞歸處理下一行
      solve(board, row + 1, solutions);
      
      // 回溯：移除皇后
      board[row][col] = 0;
    }
  }
}

/**
 * 返回8皇后問題的所有不同解法
 * @returns {string[][]} - 所有解法的數組，每個解法是8x8的字符串數組
 */
export function solveNQueens() {
  const n = 8;
  const board = Array(n).fill(null).map(() => Array(n).fill(0));
  const solutions = [];
  
  solve(board, 0, solutions);
  
  return solutions;
}

/**
 * 格式化輸出解法（用於調試和展示）
 * @param {string[][]} solutions - 所有解法
 * @returns {string} - 格式化的字符串
 */
export function formatSolutions(solutions) {
  let result = `找到 ${solutions.length} 個解法：\n\n`;
  
  solutions.forEach((solution, index) => {
    result += `解法 ${index + 1}:\n`;
    solution.forEach(row => {
      result += row + '\n';
    });
    result += '\n';
  });
  
  return result;
}

/**
 * 驗證解法是否正確
 * @param {string[]} solution - 單個解法
 * @returns {boolean} - 是否為有效解法
 */
export function validateSolution(solution) {
  const n = solution.length;
  
  // 檢查每行是否只有一個皇后
  for (let row = 0; row < n; row++) {
    const queensInRow = solution[row].split('').filter(cell => cell === 'Q').length;
    if (queensInRow !== 1) {
      return false;
    }
  }
  
  // 檢查每列是否只有一個皇后
  for (let col = 0; col < n; col++) {
    let queensInCol = 0;
    for (let row = 0; row < n; row++) {
      if (solution[row][col] === 'Q') {
        queensInCol++;
      }
    }
    if (queensInCol !== 1) {
      return false;
    }
  }
  
  // 檢查對角線
  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      if (solution[row][col] === 'Q') {
        // 檢查右下對角線
        for (let i = row + 1, j = col + 1; i < n && j < n; i++, j++) {
          if (solution[i][j] === 'Q') {
            return false;
          }
        }
        // 檢查左下對角線
        for (let i = row + 1, j = col - 1; i < n && j >= 0; i++, j--) {
          if (solution[i][j] === 'Q') {
            return false;
          }
        }
      }
    }
  }
  
  return true;
}

// 默認導出主要函數
export default {
  solveNQueens,
  formatSolutions,
  validateSolution
}; 