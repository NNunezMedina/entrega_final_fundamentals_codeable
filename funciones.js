function interactuarCadenas(cadena1, cadena2) {

  if (cadena1.length !== cadena2.length) {
    console.error("Las cadenas deben tener la misma longitud");
    return;
  } 
    let resultado = "";
  
    for (let i = 0; i < cadena1.length; i++) {
      const cadena1Posiciones = cadena1[i];
      const cadena2Posiciones = cadena2[i];
  
  
      if (cadena1Posiciones === '+' && cadena2Posiciones === '+') {
        resultado += '+';
      } else if (cadena1Posiciones === '-' && cadena2Posiciones === '-') {
        resultado += '-';
      } else if ((cadena1Posiciones === '+' && cadena2Posiciones === '-') || (cadena1Posiciones === '-' && cadena2Posiciones === '+')) {
        resultado += '0';
      } else {
        console.error("Las cadenas solo deben contener los símbolos '+' y '-'");
      return;
      }
  }
  return resultado;
}

//--------------------------------------------------------

function generarApodo(nombre) {
  if(nombre.length <=3) {
    throw new Error("Nombre muy corto")
  } 

  const terceraLetra = nombre[2];

  if("aeiou".includes(terceraLetra)) {
    let apodoVocales = nombre.slice(0,4);
    return apodoVocales;
  } else if("bcdfghjklmnpqrstvwxyz".includes(terceraLetra)) {
    let apodoConsonantes = nombre.slice(0,3);
    return apodoConsonantes;
  }
}
//----------------------------------------------------------

function obtenerMarcador(texto) {
  const numeros = {
    cero: 0,
    uno: 1,
    dos: 2,
    tres: 3,
    cuatro: 4,
    cinco: 5,
    seis: 6,
    siete: 7,
    ocho: 8,
    nueve: 9
  };

  const resultado = texto.split(" ")
   .map(palabra => numeros[palabra])
   .filter(numero => numero !== undefined);

  return resultado.length ? resultado : [0, 0];
}


//----------------------------------------------------------

class Barco  {
  constructor (calado, tripulacion) {
    this.calado = calado;
    this.tripulacion = tripulacion;
  }
  valeLaPena() {
    let pesoTripulacion = this.tripulacion * 1.5;
    let resultado = this.calado - pesoTripulacion
    if( resultado > 20) {
      return true;
    } else {
      return false;
    }
  }
}

const perlaNegra = new Barco(32, 5);
console.log(perlaNegra.valeLaPena());

const titanic = new Barco(15,10);
console.log(titanic.valeLaPena());
