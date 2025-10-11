// COMISION 3 / ALUMNOS: Leon Antonio Rabanal - Martina Muñoz 
//Link del video explicativo: https://youtu.be/ro-gvlPamQ4?si=F2EdgnCpRgBakd07

let debug = false;
let imgFondo = []; // arreglo para cargar las imagenes
let pantalla; // variable para saber en que pantalla estoy
let musicaFondo; // Carga el archivo de música principal
let sonidoClick; // Carga el archivo de sonido corto

function preload() {
    for (let i = 0; i < 13; i++) {
        imgFondo[i] = loadImage("./data/fondo_" + nf(i, 2) + ".jpg");
    }
    musicaFondo = loadSound("./data/musicafondo.mp3");
    sonidoClick = loadSound("./data/click.mp3");
}

function setup() {
    createCanvas(640, 480);
    pantalla = 0; // Inicializar la variable pantalla
}

function draw() {
    background(0);

    if ( pantalla === 0) {
        mostrarPantallaInicio ();

    } else if (pantalla == 1 ) {
        image (imgFondo[1] , 0,0,width,height);

        push ();
        fill (100,200);
        rect (0, height * 0.80, width, height * 0.2);

         // texto del relato//
        fill (218);
        textSize (20);
        textAlign (CENTER);
        let texto = "Desde niña, las decisiones de Diana se basan en sus seis deseos divinos: libertad, arco, compañeras, deberes sagrados y ser auténtica."
        text (texto, width * 0.1, (height * 0.73) + (height * 0.2 / 2), width * 0.8, height * 0.2);
        pop ();

        // mostramos los botones de opciones:
        mostrarBoton ("Siguiente", 540, 200, 150, 50);

    } else if (pantalla == 2 ) {
        image (imgFondo[2] , 0,0,width,height);
        push ();
        fill (100,140);
        rect (0, height * 0.80, width, height );

        fill (218);
        textSize (20);
        textAlign (CENTER, CENTER);
        let texto = "En su nueva escuela mágica, todos tienen una opinión sobre Diana: que si es la súper atleta, la chica rara o la amiga perfecta. Pero ni ella misma tiene idea de quién es."
        text (texto, width * 0.1, (height * 0.70) + (height * 0.2 / 2), width * 0.82, height * 0.2);
        pop ();

        mostrarBoton ("Siguiente", 540, 300, 150, 50);

    } else if (pantalla == 3 ) {
        image (imgFondo[3] , 0,0,width,height);
        push ();
        fill (100,140);
        rect (0, height*0.70,width,height*0.5);

        fill (218);
        textSize (20);
        textAlign (CENTER, CENTER);
        let texto = "Siempre corre, entrena y prefiere los bosques al ruido de los pasillos. Es fuerte, segura… pero dicen que es fría."
        text (texto, 0, height*0.60 + 10, width, height*0.3);
        pop ();

        // mostramos los botones de opciones:
        mostrarBoton("Quedarse con sus amigas", width / 4, 430, 250, 50);
        mostrarBoton("Explorar el bosque", width * 3 / 4, 430, 250, 50);

    } else if (pantalla == 4 ) {
        image (imgFondo[4] , 0,0,width,height);
        push ();
        fill (100,140);
        rect (0, height*0.70,width,height*0.5);

        fill (218);
        textSize (20);
        textAlign (CENTER, CENTER);
        let texto = "Cuando se queda con sus amigas, Diana se transforma en la Luna: la que escucha y guía, pero todos esperan demasiado de ella."
        text (texto, 0, height*0.60 + 10, width, height*0.3);
        pop ();

        mostrarBoton ("Seguir escuchando", width / 4, 430, 250, 50);
        mostrarBoton ("Escaparse sola", width * 3 / 4, 430, 250, 50);

    } else if (pantalla == 5 ) {
        image (imgFondo[5] , 0,0,width,height);
        push ();
        fill (100,140);
        rect (0, height*0.65,width,height*0.5);

        fill (218);
        textSize (20);
        textAlign (CENTER, CENTER);
        let texto = "Diana siente la presión de todos a su alrededor. La luz que emite como guía también pesa. Por un instante, se pregunta si puede seguir siendo ella misma mientras cumple con las expectativas de los demás."
        text (texto, 0, height*0.58 + 10, width, height*0.3);
        pop ();

        mostrarBoton ("Reflexionar", width / 4, 430, 250, 50);
        mostrarBoton ("Escaparse sola", width * 3 / 4, 430, 250, 50);

    } else if (pantalla == 6 ) {
        image (imgFondo[6] , 0,0,width,height);
        push ();
        fill (100,140);
        rect (0, height*0.70,width,height*0.5);
        
        fill (218);
        textSize (20);
        textAlign (CENTER, TOP);
        let texto = "Cuando nadie la ve, Diana baja a la biblioteca subterránea. Allí la llaman Hécate: estudia magia antigua y secretos olvidados."
        text (texto, 0, height*0.65 + 30, width, height*0.3);
        pop ();
        
        mostrarBoton ("seguir leyendo", 100,420, 150,40);
        mostrarBoton ("volver a entrenar", 540,420, 150,40);
        
    } else if (pantalla == 7 ) {
        image (imgFondo[7] , 0,0,width,height);
        push ();
        fill (100,140);
        rect (0, height*0.65,width,height*0.5);
        
        fill (218);
        textSize (20);
        textAlign (CENTER, TOP);
        let texto = "Entre los antiguos libros y velas parpadeantes, Diana descubre un símbolo que parece reflejar su esencia dividida: la cazadora, la luna y la guardiana de secretos. Comprende que cada faceta tiene poder, pero juntas deben decidir su camino."
        text (texto, 0, height*0.65 + 10, width, height*0.3);
        pop ();
        
        mostrarBoton ("Siguiente", width/2, 440, 150, 40);
        
    } else if (pantalla == 8 ) {
        image (imgFondo[8] , 0,0,width,height);
        push ();
        fill (100,140);
        rect (0, height*0.65,width,height*0.5);
        
        fill (218);
        textSize (20);
        textAlign (CENTER, TOP);
        let texto = "En un espejo encantado, Diana se ve dividida en tres: atleta libre, luna brillante y hechicera oscura. Cada versión la llama con su voz. La noche la lleva a una encrucijada: tres caminos brillan frente a ella. Debe elegir su destino."
        text (texto, 0, height*0.60 + 30, width, height*0.3);
        pop ();
        
        mostrarBoton ("camino rojo", 100,440, 150,40);
        mostrarBoton ("camino verde agua", width/2, 440, 170,40);
        mostrarBoton ("camino amarillo", 540,440, 150,40);
        
    } else if (pantalla == 9 ) {
        image (imgFondo[9] , 0,0,width,height);
        push ();
        fill (100,140);
        rect (0, height*0.75,width,height*0.5);
        
        fill (255);
        textSize (20);
        textAlign (CENTER, TOP);
        let texto = "Diana acepta ser la luz de las demás. Su poder es guiar y proteger sin perder su identidad."
        text (texto, 0, height*0.74 + 10, width, height*0.3);
        pop ();
        
        mostrarBoton ("Fin", width/2, 430, 150, 40);
        
    } else if (pantalla == 10 ) {
        image (imgFondo[10] , 0,0,width,height);
        push ();
        fill (100,140);
        rect (0, height*0.70,width,height*0.5);
        
        fill (255);
        textSize (20);
        textAlign (CENTER, TOP);
        let texto = "Diana decide seguir su propio camino. Libre y salvaje, corre con los ciervos mágicos: su poder es ser auténtica."
        text (texto, 0, height*0.70 + 10, width, height*0.3);
        pop ();
        
        mostrarBoton ("Fin", width/2, 430, 150, 40);
        
    } else if (pantalla == 11 ) {
        image (imgFondo[11] , 0,0,width,height);
        push ();
        fill (100,140);
        rect (0, height*0.68,width,height*0.5);
        
        fill (255);
        textSize (20);
        textAlign (CENTER, TOP);
        let texto = "Diana acepta su lado misterioso. Entre antorchas y sombras, aprende que el secreto también transforma."
        text (texto, 0, height*0.68 + 10, width, height*0.3);
        pop ();
        
        mostrarBoton ("Fin", width/2, 430, 150, 40);
        
    } else if (pantalla == 12 ) {
        image (imgFondo[12] , 0,0,width,height);
        push ();
        fill (0,0,0);
        textAlign (LEFT, TOP);
        textSize (19);
        let creditos = "Diseño Multimedial\nIntroducción a las tecnologías web\n\nProfesor: Programación para medios interactivos\norientada a las tecnologías web\n\nAlumnos: Martina Muñoz y León Antonio Rabanal";
        text (creditos, width/5.5, height * 0.28, width * 0.7, height * 0.5);
        pop ();
        
        mostrarBoton("Reiniciar", width/2, 400, 150, 50);
    }

    if ( debug ) {
        push ();
        fill (0,255,0);
        textAlign (LEFT)
        textSize (14);
        text ("PANTALLA " + pantalla, 20, 20);

        fill(255, 255, 0);
        text("Música cargada: " + musicaFondo.isLoaded(), 20, 40);
        text("Click cargado: " + sonidoClick.isLoaded(), 20, 60);

        pop();
    }
}

function mousePressed() {
    let clicked = false;

    if ( pantalla === 0) { // flujo de estado de pantalla 0 a pantalla 1
        if (colisionRectangular(540, 200, 150, 50)) {
            pantalla = 1;
            clicked = true;
            userStartAudio();
            if (!musicaFondo.isPlaying() && musicaFondo.isLoaded()) {
                musicaFondo.loop();
            }
        }
    } else if (pantalla == 1 ) { // flujo de estado de pantalla 1 a pantalla 2
        if (colisionRectangular(540, 200, 150, 50) ) {
            pantalla = 2;
            clicked = true;
        }
    } else if (pantalla == 2 ) { // flujo de estado de pantalla 2 a pantalla 3
        if (colisionRectangular(540, 300, 150, 50)) {
            pantalla = 3;
            clicked = true;
        }
    } else if (pantalla == 3 ) { // flujo de estado de pantalla 3 a pantalla 4
        if (colisionRectangular(width / 4, 430, 250, 50)) {
            pantalla = 4;
            clicked = true;
        }
        if (colisionRectangular( width * 3 / 4, 430, 250, 50) ) { // flujo de estado de pantalla 3 a pantalla 6
            pantalla = 6;
            clicked = true;
        }
    } else if (pantalla == 4 ) { // flujo de estado de pantalla 4 a pantalla 5
        if (colisionRectangular(width / 4, 430, 250, 50) ) {
            pantalla = 5;
            clicked = true;
        }
        if (colisionRectangular(width * 3 / 4, 430, 250, 50) ) { // flujo de estado de pantalla 4 a pantalla 6
            pantalla = 6;
            clicked = true;
        }
    } else if (pantalla == 5 ) { // flujo de estado de pantalla 5 a pantalla 6
        if (colisionRectangular(width / 4, 430, 250, 50) ) {
            pantalla = 6;
            clicked = true;
        }
        if (colisionRectangular(width * 3 / 4, 430, 250, 50) ) { // flujo de estado de pantalla 5 a pantalla 8
            pantalla = 8;
            clicked = true;
        }
    } else if (pantalla == 6 ) { // flujo de estado de pantalla 6 a pantalla 7
        if (colisionRectangular(100, 420, 150, 40) ) {
            pantalla = 7;
            clicked = true;
        }
        if (colisionRectangular( 540,420, 150,40) ) { // flujo de estado de pantalla 6 a pantalla 3
            pantalla = 3;
            clicked = true;
        }
    } else if (pantalla == 7 ) { // flujo de estado de pantalla 7 a pantalla 8
        if (colisionRectangular(width/2, 440, 150, 40) ) {
            pantalla = 8;
            clicked = true;
        }
    } else if (pantalla == 8 ) { // flujo de estado de pantalla 8 a pantalla 9
        if (colisionRectangular(100, 440, 150, 40) ) {
            pantalla = 9;
            clicked = true;
        }
        if (colisionRectangular(width/2, 440, 170, 40) ) { // flujo de estado de pantalla 8 a pantalla 10
            pantalla = 10;
            clicked = true;
        }
        if (colisionRectangular(540, 440, 150, 40) ) { // flujo de estado de pantalla 8 a pantalla 11
            pantalla = 11;
            clicked = true;
        }
    } else if (pantalla == 9 ) {
        if (colisionRectangular(width/2, 430, 150, 40) ) { // flujo de estado de pantalla 9 a pantalla 12
            pantalla = 12;
            clicked = true;
        }
    } else if (pantalla == 10 ) {
        if (colisionRectangular(width/2, 430, 150, 40) ) { // flujo de estado de pantalla 10 a pantalla 12
            pantalla = 12;
            clicked = true;
        }
    } else if (pantalla == 11 ) {
        if (colisionRectangular(width/2, 430, 150, 40) ) { // flujo de estado de pantalla 11 a pantalla 12
            pantalla = 12;
            clicked = true;
        }
    } else if (pantalla == 12 ) {
        if (colisionRectangular(width/2, 400, 150, 50)) {
            if (musicaFondo.isPlaying()) {
                musicaFondo.stop();
            }
            pantalla = 0;
            clicked = true;
        }
    }

    if (clicked) {
        reproducirClick();
    }
}
