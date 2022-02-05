import { primitiva } from './url.js'
// Funcion para conseguir la semana
function getWeek () {

    var currentdate = new Date();
    var oneJan = new Date(currentdate.getFullYear(),0,1);
    var numberOfDays = Math.floor((currentdate - oneJan) / (24 * 60 * 60 * 1000));
    var result = Math.ceil(( currentdate.getDay() + 1 + numberOfDays) / 7);

    document.getElementById('week').textContent = 'Semana ' + result
    
}

// Funcion para pintar el sorteo primitiva
async function getPrimitiva () {

  let value = fetchPrimitiva()
  const v = await value
  document.getElementById('primitiva').textContent = v

}

// Funcion para obtener el sorteo
function fetchPrimitiva () {

    let value = fetch(primitiva)
        .then((response) => response.json())
        .then((data) => {
            return data.mensaje
        })

    return value

}




export {
    getWeek,
    getPrimitiva
}