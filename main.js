"use strict";

const assert = require("assert");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
let board = [];
let solution = "";
let letters = ["a", "b", "c", "d", "e", "f", "g", "h"];

const printBoard = () => {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
};

const generateSolution = () => {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
};

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};
//ASK EVERYTHING!
const generateHint = (guess) => {
  //constante que esta a dica de qts foram acertados
  let guessArray = guess.split("");
  //a mesma coisa do de baixo, esta pegando as 4 letras do palpite separando em uma array
  let solutionArray = solution.split("");
  //pega a solution e com o slipt esta separando as letras em um novo array
  let correctLetterLocations = 0;
  //vai determinar qts letras estao no local correto
  let correctLetters = 0;
  //quants letras ele acertou, nao no local, mas no palpite dele

  //Aqui esta calculando  quantos palpites estao corretos
  //ASK TEACHER
  for (let i = 0; i < 4; i++) {
    //loop para verificar as 4 letras do resultado. o "i" seria o numero
    if (guessArray[i] === solutionArray[i]) {
      correctLetterLocations = correctLetterLocations + 1;
      // guessArray[i] = 1;
      solutionArray[i] = null;
    }
  }

  //Aqui preciso que calcule quantos palpites estao certos. pode usar o o .lenght para informar que sao 4 numeros.



  for (let i = 0; i < 4; i++) { //
let targetIndex = solutionArray.indexOf (guessArray[i]) //criamos a variavel targetIndex
if (targetIndex > -1){ //-1 para informar que ela consta 
correctLetters = correctLetters +1; //adiciona 1 na correct letter
solutionArray[targetIndex] = null; //solution array eh null pois ele nao acertou nenhuma, eh apenas o teste.

    }
  }
//ate aqui
  let hint =
    correctLetterLocations.toString() + "-" + correctLetters.toString();
  return hint;

  // your code here
};
//se o seu palpite for igual a solucao, codigo de baixo
const mastermind = (guess, solution) => {
  solution = "abcd"; // Comment this out to generate a random solution
  if (guess == solution) {
    board = [];
    console.log("Valeu Aspira!");
    return "You guessed it!";
  } else {
    board.push(guess);
  }

  if (board.length > 10) {
    return "No donut for you... the answer was" + solution;
    board = [];
    solution = "";
    generateSolution();
  } // your code here
};

const getPrompt = () => {
  rl.question("guess: ", (guess) => {
    mastermind(guess);
    printBoard();
    getPrompt();
  });
};

// Tests

if (typeof describe === "function") {
  solution = "abcd";
  describe("#mastermind()", () => {
    it("should register a guess and generate hints", () => {
      mastermind("aabb");
      assert.equal(board.length, 1);
    });
    it("should be able to detect a win", () => {
      assert.equal(mastermind(solution), "You guessed it!");
    });
  });

  describe("#generateHint()", () => {
    it("should generate hints", () => {
      assert.equal(generateHint("abdc"), "2-2");
    });
    it("should generate hints if solution has duplicates", () => {
      assert.equal(generateHint("aabb"), "1-1");
    });
  });
} else {
  generateSolution();
  getPrompt();
}
