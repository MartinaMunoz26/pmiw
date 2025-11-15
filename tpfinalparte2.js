// COMISION 3- ALUMNOS: MARTINA MUÑOZ Y LEON ANTONIO RABANAL
// https://youtu.be/Eci_0ZWq5oI?si=3IS1f3jlDvVt6w8e
// VARIABLES GLOBALES 
let juego; // Objeto principal
let imgCreditos, imgMonstruo, imgFondoJuego, imgArco; // Variables para las imágenes
let musicaFondo, sonidoflecha, perdiste, ganaste, monstruo; // Variables para los sonidos

// Carga de todos los recursos (imágenes y sonidos)
function preload() {
  imgCreditos = loadImage('libraries/data/creditos.jpg');
  imgMonstruo = loadImage('libraries/data/monstruo1.png');
  imgFondoJuego = loadImage('libraries/data/fondo_juego.png');
  imgArco = loadImage('libraries/data/arco.png');
  
  // Carga de sonidos
  musicaFondo = loadSound("libraries/data/musicaFondo.mp3");
  sonidoflecha = loadSound("libraries/data/sonidoflecha.mp3");
  perdiste = loadSound("libraries/data/perdiste.mp3");
  ganaste = loadSound("libraries/data/ganaste.mp3");
  monstruo = loadSound("libraries/data/monstruo.mp3"); 
}

function setup() {
  createCanvas(640, 480);
  juego = new Juego(); // Crea la instancia principal del juego
  imageMode(CENTER);     
  rectMode(CENTER);       
}

function draw() {
  // Dibuja el fondo en cada fotograma
  image(imgFondoJuego, width / 2, height / 2, width, height);
  juego.mostrar();   // Muestra el estado actual (menú, juego, etc.)
  juego.actualizar(); // Actualiza la lógica (movimiento, colisiones)
}


function mousePressed() {
  userStartAudio(); // Habilita el audio en el navegador
  if (juego) {
    juego.click(); // Avisa al objeto 'juego' que se hizo clic
  }
}

function keyPressed() {
  if (juego) {
    juego.presionarTecla(); // Avisa al objeto 'juego' que se presionó tecla
  }
}

class Juego {
  constructor() {
    this.estado = "inicio";  // Pantalla de inicio)
    this.personaje = new Personaje(); // Crea al jugador =clase personaje
    this.elementos = [];     // Arreglo para guardar los enemigos
    this.proyectiles = [];   // Arreglo para guardar las flechas
    this.puntos = 50;        // Puntos iniciales del jugador
  }

  // Se encarga de dibujar todo según el estado
  mostrar() {
    textAlign(CENTER, CENTER);
    textSize(20);
    fill(255); 

    // Dibuja una pantalla diferente según el estado)
    if (this.estado === "inicio") {
      text("Haz click para ayudar a Diana", width / 2, height / 2 - 30);
      textSize(16);
      text("Mueve con A y D, dispara con ESPACIO", width / 2, height / 2);
      textSize(12);
      text("Presiona click para comenzar", width / 2, height / 2 + 30);
    } 
    else if (this.estado === "jugando") {
      textAlign(LEFT);
      text("Puntos: " + this.puntos, 10, 20);

      // Dibuja todos los componentes del juego
      this.personaje.mostrar();
      this.elementos.forEach(e => e.mostrar()); // Usamos forEach para recorrer la lista de enemigos y le decimos a cada uno que se dibuje a sí mismo.
      this.proyectiles.forEach(p => p.mostrar()); // lo mismo pero con las flechas
    } 
    else if (this.estado === "ganar") {
      text("¡Ganaste!", width / 2, height / 2);
      text("Click para créditos", width / 2, height / 2 + 40);
    } 
    else if (this.estado === "perder") {
      text("Perdiste", width / 2, height / 2);
      text("Click para créditos", width / 2, height / 2 + 40);
    } 
    else if (this.estado === "creditos") {
      image(imgCreditos, width / 2, height / 2, width, height); // Fondo de créditos
      fill(255);
      textSize(20);
      text("por León Rabanal y Martina Muñoz", width / 2, height / 2 - 20);
      textSize(16);
      text("Click para reiniciar", width / 2, height / 2 + 5);
    }
  }

  // Se encarga de la lógica y el movimiento
  actualizar() {
    // Control de la música de fondo
    if (this.estado === "jugando") {
      if (!musicaFondo.isPlaying() && musicaFondo.isLoaded()) {
        musicaFondo.loop(); // Reproducir música en bucle si se está jugando
      }
    } else {
      if (musicaFondo.isPlaying()) {
        musicaFondo.stop(); // Detener música si no se está jugando
      }
    }

    if (this.estado === "jugando") {  // (solo se ejecuta si estamos jugando)
      this.personaje.actualizar(); // Actualiza al personaje si se esta moviendo con A y D

      if (frameCount % 60 === 0) {  // Crea enemigos periódicamente con un contador de fotogramas
        this.elementos.push(new Elemento(random(20, width - 20), 0)); //Cada seg creamos un nuevo monstruo en una posición aleatoria arriba y se empuja a la "lista" de enemigos
      }

      // Actualizar proyectiles recorremos el arreglo al revés 
      for (let i = this.proyectiles.length - 1; i >= 0; i--) {
        let p = this.proyectiles[i];
        p.actualizar();
        if (p.y < 0) { // Si el proyectil sale de pantalla
          this.proyectiles.splice(i, 1); // Eliminarlo del arreglo
        }
      }

      // Actualizar elementos (enemigos)
      for (let e of this.elementos) {
        e.actualizar(); // Mueve el enemigo

        //Detección de Colisiones (Proyectil vs Enemigo)
        for (let i = this.proyectiles.length - 1; i >= 0; i--) {
          let p = this.proyectiles[i];
          // Comprueba si la distancia es menor que la suma de sus radios
          if (!e.capturado && dist(e.x, e.y, p.x, p.y) < p.radio + e.ancho / 2) {
            this.puntos += 10;      // Gana puntos
            e.capturado = true;     // Marca el enemigo como "muerto"
            monstruo.play();        // Sonido de impacto
            this.proyectiles.splice(i, 1); // Elimina el proyectil
          }
        }
        
        // Si el enemigo llega al fondo sin ser capturado
        if (e.y > height && !e.capturado) {
          this.puntos -= 10;     // Pierde puntos
          e.capturado = true;    // Lo marca para eliminarlo
        }
      }

      // Elimina enemigos capturados que ya salieron de pantalla
      this.elementos = this.elementos.filter(e => !e.capturado || e.y < height);

      // condiciones de victoria/derrota 
      if (this.puntos >= 100 && this.estado !== "ganar") {
        this.estado = "ganar";
        ganaste.play();
      }
      if (this.puntos <= 0 && this.estado !== "perder") {
        this.estado = "perder";
        perdiste.play();
      }
    }
  }

  // Maneja los clics según el estado del juego
  click() {
    if (this.estado === "inicio") {
      this.estado = "jugando"; // Empieza el juego
      // Resetea valores para una nueva partida
      this.puntos = 50;
      this.elementos = [];
      this.proyectiles = [];
    } else if (this.estado === "ganar" || this.estado === "perder") {
      this.estado = "creditos"; // Muestra créditos
    } else if (this.estado === "creditos") {
      this.estado = "inicio"; // Vuelve al inicio
    }
  }

  // Maneja las teclas presionadas
  presionarTecla() {
    // Si estamos jugando Y la tecla es espacio
    if (this.estado === 'jugando' && key === ' ') {
      this.dispararProyectil(); // la función de disparo
    }
  }

  // Lógica de disparo
  dispararProyectil() {
    // Crea un proyectil justo encima del arco del personaje
    let nuevoProyectil = new Proyectil(this.personaje.x, this.personaje.y - this.personaje.altoArco / 2 - 5);
    this.proyectiles.push(nuevoProyectil); // Añade el proyectil al arrgelo
    sonidoflecha.play(); // Sonido de disparo
  }
}

// (Enemigo/Monstruo)
class Elemento {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vel = random(4, 7); // Velocidad de caída aleatoria
    this.capturado = false;  // Estado (vivo o muerto)
    this.ancho = 80;
    this.alto = 80;
  }

  // Dibuja el monstruo si no ha sido capturado
  mostrar() {
    if (!this.capturado) {
      image(imgMonstruo, this.x, this.y, this.ancho, this.alto);
    }
  }

  // Mueve el monstruo hacia abajo
  actualizar() {
    this.y += this.vel;
  }
}

class Personaje {
  constructor() {
    this.alto = 50;
    this.ancho = 30;
    this.x = width / 2; // Posición inicial en el centro
    this.vel = 6;       // Velocidad de movimiento
    this.anchoArco = 140;
    this.altoArco = 140;
    this.y = height - this.altoArco / 2; // Posición Y fija que se encuente abajo
  }

  // Llama a la función de movimiento
  actualizar() {
    this.mover();
  }

  // Dibuja la imagen del arco 
  mostrar() {
    push(); // Guarda la configuración de dibujo actual
    translate(this.x, this.y); // Mueve el origen a la posición del personaje
    image(imgArco, 0, 0, this.anchoArco, this.altoArco); // Dibuja el arco centrado
    pop();  // Restaura la configuración de dibujo
  }

  // Controla el movimiento con las teclas A y D
  mover() {
    if (keyIsDown('A'.charCodeAt(0))) this.x -= this.vel; // Mover izquierda
    if (keyIsDown('D'.charCodeAt(0))) this.x += this.vel; // Mover derecha
    this.x = constrain(this.x, this.ancho / 2, width - this.ancho / 2);
  }
}

class Proyectil {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radio = 5; // Tamaño base para dibujar la flecha
    this.vel = 7;   // Velocidad de la flecha
  }

  // Mueve la flecha hacia arriba
  mover() {
    this.y -= this.vel;
  }

  // Dibuja la flecha
  mostrar() {
    push();
    fill(0); 
    noStroke();
    translate(this.x, this.y); // Mueve el origen a la posición de la flecha
    
    //flecha
    rect(0, this.radio * 0.5, this.radio * 0.8, this.radio * 4);
    // Punta de la flecha
    triangle(
      0, -this.radio * 1.5,
      -this.radio * 1.5, this.radio * 0.5,
      this.radio * 1.5, this.radio * 0.5
    );
    pop();
  }

  // Llama a la función de movimiento
  actualizar() {
    this.mover();
  }
}
