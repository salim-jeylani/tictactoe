# Tic-Tac-Toe – ISGB15 JavaScript Webbutveckling

A browser-based Tic-Tac-Toe (Three in a Row) game built with HTML, CSS, and vanilla JavaScript as part of the course *Javascript för webbutveckling (ISGB15)* at Karlstad University.

---

## Features

- **Form validation** – Nicknames must be at least 5 characters, unique, and colors must differ and not be white or black.
- **Game initialization** – Randomized starting player, board reset, and player color assignment on each new game.
- **Game engine** – Click-based move handling, win/draw detection, and automatic game-over flow.
- **Turn timer (optional)** – A checkbox lets players enable a 5-second per-turn time limit; if a player doesn't move in time, the turn passes to the opponent.
- **Unobtrusive JavaScript** – All behavior is added via `addEventListener()`, with no inline HTML event handlers.

---

## Project Structure

```
/
├── index.html          # Game markup
├── style.css           # Styling
└── JSFunctions.js      # All game logic
```

---

## How to Run

1. Clone or download this repository.
2. Open `index.html` in any modern web browser.
3. No build tools or dependencies required.

---

## How to Play

1. Enter a nickname (minimum 5 characters) for both players.
2. Pick a color for each player — colors must be different and cannot be white or black.
3. Optionally check **"Vill du begränsa tiden till 5 sekunder per drag?"** to enable the turn timer.
4. Click **Starta spelet!** to start.
5. Players take turns clicking cells on the board. The first to get three in a row wins!
6. After the game ends, the form reappears so you can play again.

---

## Lab Steps Implemented

| Step | Description |
|------|-------------|
| **Lab 1** | HTML structure and CSS styling |
| **Lab 2** | Form validation and game initialization (`validateForm`, `initiateGame`) |
| **Lab 3** | Game engine – move execution, win/draw detection (`executeMove`) |
| **Lab 4** | Turn timer – optional 5-second move limit with checkbox |

---

## Technical Notes

- The `oGameData` object holds all global game state (players, colors, current player, board state, timer).
- `oGameData.initGlobalObject()` resets state at load and after each game.
- The timer feature uses `oGameData.timerEnabled` and `oGameData.timerId`.
- The checkbox and label for the timer are injected entirely via JavaScript — no changes to the HTML file.
- All JavaScript code is commented as required by the assignment.

---

## Course

**Javascript för webbutveckling – ISGB15**  
Karlstad University  
Graded using the automatic feedback system: [JSAutoFeedback](https://informatikwebbkurser.hotell.kau.se/JSAutoFeedback/)
