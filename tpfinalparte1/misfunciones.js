// Verifica la colisión rectangular del mouse
function colisionRectangular (x_ , y_ , ancho_ , alto_){
    if (mouseX > x_ - ancho_/2 && mouseX < x_ + ancho_/2 &&
    mouseY > y_ - alto_/2 && mouseY < y_ + alto_/2){
        return true;
    } else {
        return false;
    }
}
 
// Dibuja un botón
function mostrarBoton (texto_ , x_ , y_ , ancho_ , alto_) {
    push ();
    translate (x_ , y_);
    rectMode(CENTER);
    
    if (colisionRectangular(x_, y_, ancho_, alto_)) {
        fill(126, 17, 206); 
    } else {
        fill(104,14,170);
    }
    
    rect (0, 0, ancho_ , alto_);
    fill (255);
    textSize (18); // Se usa 18 para el botón
    textAlign (CENTER, CENTER);
    text (texto_ , 0,0);  
    pop (); 
}

// Dibuja la pantalla de inicio (Pantalla 0)
function mostrarPantallaInicio (){
    push ();
    
    image ( imgFondo[0] , 0,0,width,height);
    
    fill (100,200);
    rect (0, height*0.80,width,height*0.2); 
    fill (218);
    textAlign (CENTER, CENTER);
    textSize (20); // Se usa 20 para el texto del título
    let titulo = "En la Academia Lumen, Diana debe encontrar su lugar. ¡Ayudemos a Diana!";
    text (titulo, width/4, height/2 + 70, width/2, height/2); 
    
    mostrarBoton("Empezar", 540, 200, 150, 50); 
    
    pop ();
}

// Función que reproduce el sonido de click
function reproducirClick() {
    if (sonidoClick && !sonidoClick.isPlaying() && sonidoClick.isLoaded()) {
        sonidoClick.play();
    }
}
