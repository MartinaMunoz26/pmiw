// COMISION 3 - ALUMNA: MARTINA MUÑOZ
// LINK AL VIDEO EXPLICATIVO: https://youtu.be/FBJF7LizYB8

let imgReferencia;
let cantCirculos = 49;
let columnas = 7;
let tam = 32;
let modoGrueso = false; // cambian grosores al hacer clic
let variaciones = []; // arreglo con variaciones de tamaño para cada círculo
let colorPrincipal;
let coloresPorCirculo = []; // arreglo con el color de cada círculo

function preload() {
  imgReferencia = loadImage("imagenes/referencia.jpg");
}

function setup() {
  createCanvas(800, 400);
  imgReferencia.resize(400, 400);
  noFill();

  colorPrincipal = color(103, 124, 98); // color inicial
  reiniciar();
}

function draw() {
  background(203, 25, 15); // fondo rojo
  image(imgReferencia, 0, 0);
  dibujarGrilla();
}

function mousePressed() {
  modoGrueso = !modoGrueso;
  for (let i = 0; i < cantCirculos; i++) {
    variaciones[i] = random(-5, 5);
  }
}

function keyPressed() {
  if (key === 'r' || key === 'R') { // el operador logico === compara valor y tipo
    reiniciar();
  }

  if (key === 'p' || key === 'P') {
    for (let i = 0; i < cantCirculos; i++) {
      let grosor = obtenerGrosor(i);
      if (grosor === 3 || grosor === 4) {
        coloresPorCirculo[i] = color(random(255), random(255), random(255));
      }
    }
  }

  if (key === 'c' || key === 'C') {
    for (let i = 0; i < cantCirculos; i++) {
      coloresPorCirculo[i] = colorPrincipal;
    }
  }
}

function reiniciar() {
  for (let i = 0; i < cantCirculos; i++) { // asigna un valor independiente a cada posición
    variaciones[i] = 0;
    coloresPorCirculo[i] = colorPrincipal;
  }
}

// Función con ciclos for anidados que dibuja la grilla de círculos
function dibujarGrilla() {
  for (let fila = 0; fila < cantCirculos / columnas; fila++) {
    for (let col = 0; col < columnas; col++) {
      let i = fila * columnas + col;
      let posX = 420 + col * 55 + 14;
      let posY = fila * 58 + 25;
      let grosor = obtenerGrosor(i);
      let tamActual = tam + variaciones[i];
      let colCirculo;

      if (dist(mouseX, mouseY, posX, posY) < 50) {
        grosor *= 2;
        colCirculo = color(203, 25, 15);  
      } else {
        colCirculo = coloresPorCirculo[i];
      }

      dibujarCirculo(posX, posY, tamActual, grosor, colCirculo);
    }
  }
}

// Función propia que dibuja un círculo
function dibujarCirculo(x, y, diametro, grosor, c) {
  stroke(c);
  strokeWeight(grosor);
  noFill();
  ellipse(x, y, diametro, diametro);
}

// Función que retorna grosor según modo y posición
function obtenerGrosor(i) {
  if (modoGrueso) {
    return (i % 2 === 0) ? 3 : 2;
  } else {
    return (i % 2 === 0) ? 1 : 4;
  }
}
