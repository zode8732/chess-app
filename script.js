// The brain — chess.js tracks game state
const game = new Chess();

// A sample game in PGN format (The Immortal Game, 1851)
const pgn = `1. e4 e5 2. f4 exf4 3. Bc4 Qh4+ 4. Kf1 b5 5. Bxb5 Nf6 6. Nf3 Qh6
7. d3 Nh5 8. Nh4 Qg5 9. Nf5 c6 10. g4 Nf6 11. Rg1 cxb5 12. h4 Qg6
13. h5 Qg5 14. Qf3 Ng8 15. Bxf4 Qf6 16. Nc3 Bc5 17. Nd5 Qxb2
18. Bd6 Bxg1 19. e5 Qxa1+ 20. Ke2 Na6 21. Nxg7+ Kd8 22. Qf6+ Nxf6
23. Be7#`;

// Load the game into chess.js
game.load_pgn(pgn);

// Save all the moves, then reset to the start
const moves = game.history();
game.reset();

// Track which move we're on
let currentMove = 0;

// The eyes — chessboard.js renders the visual board
const board = Chessboard('boardy', {
  position: 'start',
  pieceTheme: 'img/chesspieces/wikipedia/{piece}.png',
  width: 240
});

document.getElementById('btn-first').addEventListener('click', function() {
  currentMove = 0;
  game.reset();
  board.position(game.fen());
});

document.getElementById('btn-last').addEventListener('click', function() {
  currentMove = moves.length;
  game.reset();
  for (let i = 0; i < currentMove; i++)
  {
    game.move(moves[i]);
  }
  board.position(game.fen());
});

// Next button — advance one move
document.getElementById('btn-next').addEventListener('click', function() {
  if (currentMove < moves.length) {
    game.move(moves[currentMove]);
    currentMove++;
    board.position(game.fen());
  }
});

// Prev button — go back one move
document.getElementById('btn-prev').addEventListener('click', function() {
  if (currentMove > 0) {
    currentMove--;
    game.reset();
    for (let i = 0; i < currentMove; i++) {
      game.move(moves[i]);
    }
    board.position(game.fen());
  }
});