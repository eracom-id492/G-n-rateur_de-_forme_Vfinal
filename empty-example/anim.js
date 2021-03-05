let w;
let columns;
let rows;
let board;
let next;

function setup() {
  createCanvas(720, 400);
  w = 20;
// Calcule des colonnes et des lignes
  columns = floor(width / w);
  rows = floor(height / w);
// Création du tableau en JS
  board = new Array(columns);
  for (let i = 0; i < columns; i++) {
    board[i] = new Array(rows);
  }
// Utilisation de plusieurs tableaux et les échanger
  next = new Array(columns);
  for (i = 0; i < columns; i++) {
    next[i] = new Array(rows);
  }
  init();
}

function draw() {
  background(255);
  generate();
  for ( let i = 0; i < columns;i++) {
    for ( let j = 0; j < rows;j++) {
      if ((board[i][j] == 1)) fill(0);
      else fill(255);
      stroke(0);
      rect(i * w, j * w, w-1, w-1);
    }
  }

}

// Reset le tableau au clic de la souris
function mousePressed() {
  init();
}

// Remplir le tableau au hasard
function init() {
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
// Limite à zéoro des bords
      if (i == 0 || j == 0 || i == columns-1 || j == rows-1) board[i][j] = 0;
//  Remplir le reste au hasard
      else board[i][j] = floor(random(2));
      next[i][j] = 0;
    }
  }
}

// La génération du et des carrés
function generate() {

// Vérification du tableau et les points à proximité du carré
  for (let x = 1; x < columns - 1; x++) {
    for (let y = 1; y < rows - 1; y++) {
      // Addition des carrés dans une grille de 3 sur 3
      let neighbors = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          neighbors += board[x+i][y+j];
        }
      }

    
      neighbors -= board[x][y];
    //  Règles de fonctionnement
      if      ((board[x][y] == 1) && (neighbors <  2)) next[x][y] = 0;           // Loneliness
      else if ((board[x][y] == 1) && (neighbors >  3)) next[x][y] = 0;           // Overpopulation
      else if ((board[x][y] == 0) && (neighbors == 3)) next[x][y] = 1;           // Reproduction
      else                                             next[x][y] = board[x][y]; // Stasis
    }
  }

  // Changement
  let temp = board;
  board = next;
  next = temp;
}

