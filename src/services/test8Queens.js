/**
 * 8皇后問題測試文件
 * 用來驗證解法的正確性並展示如何使用
 */

import { solveNQueens, validateSolution } from './queensSolver.js';

/**
 * 運行8皇后問題並顯示結果
 */
export function run8QueensTest() {
  console.log('🚀 開始解決8皇后問題...');
  
  // 記錄開始時間
  const startTime = performance.now();
  
  // 獲取所有解法
  const solutions = solveNQueens();
  
  // 記錄結束時間
  const endTime = performance.now();
  const executionTime = (endTime - startTime).toFixed(2);
  
  console.log(`⏱️  計算時間: ${executionTime} 毫秒`);
  console.log(`🎯 總共找到 ${solutions.length} 個解法`);
  
  // 驗證所有解法是否正確
  let validCount = 0;
  solutions.forEach((solution, index) => {
    if (validateSolution(solution)) {
      validCount++;
    } else {
      console.error(`❌ 解法 ${index + 1} 驗證失敗！`);
    }
  });
  
  console.log(`✅ 驗證通過: ${validCount}/${solutions.length} 個解法`);
  
  // 顯示前3個解法作為示例
  console.log('\n📋 前3個解法示例:');
  solutions.slice(0, 3).forEach((solution, index) => {
    console.log(`\n解法 ${index + 1}:`);
    solution.forEach(row => {
      console.log(row);
    });
  });
  
  return {
    solutions,
    totalSolutions: solutions.length,
    executionTime,
    validSolutions: validCount
  };
}

/**
 * 檢查特定解法
 */
export function checkSpecificSolution() {
  // 這是8皇后問題的一個已知解法
  const knownSolution = [
    'Q.......',
    '....Q...',
    '.......Q',
    '.....Q..',
    '..Q.....',
    '......Q.',
    '.Q......',
    '...Q....'
  ];
  
  console.log('\n🔍 檢查已知解法:');
  knownSolution.forEach(row => {
    console.log(row);
  });
  
  const isValid = validateSolution(knownSolution);
  console.log(`驗證結果: ${isValid ? '✅ 正確' : '❌ 錯誤'}`);
  
  return isValid;
}

/**
 * 比較不同的解法
 */
export function compareSolutions() {
  const solutions = solveNQueens();
  
  console.log('\n📊 解法統計:');
  console.log(`總解法數: ${solutions.length}`);
  
  // 統計第一個皇后在不同列的分佈
  const firstQueenPositions = {};
  solutions.forEach(solution => {
    const firstRow = solution[0];
    const queenCol = firstRow.indexOf('Q');
    firstQueenPositions[queenCol] = (firstQueenPositions[queenCol] || 0) + 1;
  });
  
  console.log('\n第一個皇后位置分佈:');
  Object.entries(firstQueenPositions).forEach(([col, count]) => {
    console.log(`列 ${col}: ${count} 個解法`);
  });
  
  return firstQueenPositions;
}

// 如果直接運行此文件，執行測試
if (typeof window === 'undefined') {
  // Node.js 環境
  run8QueensTest();
  checkSpecificSolution();
  compareSolutions();
} 