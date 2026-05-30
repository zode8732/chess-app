const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.tab-panel');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
    });
});


const p_game = new Chess();
p_game.reset();

const board = Chessboard('board-preview', {
    position: 'start',
    pieceTheme: 'img/chesspieces/wikipedia/{piece}.png',
    width: 240
});

document.getElementById('load').addEventListener('click', () => {
    const pgn = document.getElementById('pgn-input').value;
    const valid = p_game.load_pgn(pgn);

    if (!valid) {
        alert('Invalid PGN — double check your input.');
        return;
    }
    
    board.position(p_game.fen());
});