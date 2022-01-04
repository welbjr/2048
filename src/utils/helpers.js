/**
 * Funções de ajuda principalmente para o useBoard.js
 */

// Insere um número 2 ou 4 em uma posição aleatória
const insertRandom = (arr) => {
  const randNumPosition = () => Math.floor(Math.random() * newBoard[0].length);
  const haveZero = (arr) => arr.flat().includes(0);
  let newBoard = [...arr];
  let x = randNumPosition();
  let y = randNumPosition();

  // Retorna se o tabuleiro não possuir zero algum
  if (!haveZero(newBoard)) {
    return;
  }

  // Procura por uma posição com 0
  while (newBoard[x][y] !== 0) {
    x = randNumPosition();
    y = randNumPosition();
  }

  // O valor 2 ou 4 será guardado na variável twoOrFour e em seguida
  // inserido no tabuleiro
  const twoOrFour = () => (Math.round(Math.random() * 1) === 0 ? 4 : 2);
  newBoard[x][y] = twoOrFour();

  return newBoard;
};

const rotateBoard = (arr) => {
  // Transforma as colunas em linhas
  /* EX:
      [1,  2,  3,  4 ]   =>   [1, 5, 9,  13]
      [5,  6,  7,  8 ]        [2, 6, 10, 14]      
      [9,  10, 11, 12]        [3, 7, 11, 15]
      [13, 14, 15, 16]        [4, 8, 12, 16]
      */
  let newBoard = createBoard(arr.length);

  for (let [i, row] of Object.entries(arr)) {
    for (let [j, el] of Object.entries(row)) {
      newBoard[j][i] = el;
    }
  }
  return newBoard;
};

// Cria um tabuleiro inicial
export const createBoard = (size) => {
  let arr = [];
  for (let i = 1; i <= size; i++) {
    arr.push(new Array(size).fill(0));
  }
  arr = insertRandom(arr);
  return arr;
};

// Muta o tabuleiro baseado na direção
export const mutateBoard = (arr, direction) => {
  const isNotZero = (el) => el !== 0;
  const sumEquals = (el, i, arr) => {
    if (el === arr[i + 1]) {
      el *= 2;
      arr[i + 1] = 0;
    }
    return el;
  };
  let newBoard = [...arr];

  if (direction === "up" || direction === "down") {
    // Para trabalhar com as colunas, o tabuleiro é rotacionado
    newBoard = rotateBoard(newBoard);
  }

  // Aqui é feito o calculo do movimento para cada linha
  newBoard.forEach((row, i) => {
    // Retorna caso o array seja composto por zeros
    if (row.reduce((a, b) => a + b) === 0) return;

    let values;

    // Exemplo do que é feito abaixo:
    // [0,1,0,1] -> [1,1] -> [2] -> [0,0,0] + [2] -> [0,0,0,2] (ou [2,0,0,0] para "left")
    if (direction === "left") {
      values = row.filter(isNotZero).map(sumEquals).filter(isNotZero);
    } else {
      values = row
        .filter(isNotZero)
        .reverse()
        .map(sumEquals)
        .reverse()
        .filter(isNotZero);
    }

    // Cria uma lista complementar de zeros
    let zeroes = Array(row.length - values.length).fill(0);

    // Junta os números com os zeros em uma lista
    // e coloca esse array na linha i
    if (direction === "right" || direction === "down")
      newBoard[i] = [...zeroes, ...values];
    else newBoard[i] = [...values, ...zeroes];
  });

  // Transforma novamente em coluna, se ele era uma
  if (direction === "up" || direction === "down")
    newBoard = rotateBoard(newBoard);

  // Insere um número em uma posição aleatória se o tabuleiro tiver mudado
  if (JSON.stringify(newBoard) !== JSON.stringify(arr))
    return insertRandom(newBoard);

  return newBoard;
};

export const calculatePoints = (arr) => {
  // Retorna o valor da soma de todos os elementos
  return arr.flat().reduce((a, b) => a + b);
};

export const isLost = (arr) => {
  const haveZero = (arr) => arr.flat().includes(0);

  // Se existir algum zero, a posição não pode estar perdida
  if (haveZero(arr)) return false;

  const boardCopy = [...arr];
  const possibleBoards = [];

  // É colocado em possibleBoards os tabuleiros possiveis de cada movimento
  for (let direction of ["up", "down", "left", "right"]) {
    // Estão em forma de json string para facilitar a comparação abaixo
    possibleBoards.push(JSON.stringify(mutateBoard(boardCopy, direction)));
  }

  // Compara se os items são todos iguais e retorna um booleano
  return possibleBoards.every((el) => el === possibleBoards[0]);
};
