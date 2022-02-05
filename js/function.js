import { primitiva, bonoloto, euromillon } from './url.js'
// Funcion para conseguir la semana
function getWeek () {

    var currentdate = new Date()
    var oneJan = new Date(currentdate.getFullYear(),0,1)
    var numberOfDays = Math.floor((currentdate - oneJan) / (24 * 60 * 60 * 1000))
    var result = Math.ceil(( currentdate.getDay() + 1 + numberOfDays) / 7)

    if (currentdate.getDay() > 0 && currentdate.getDay() < 3) {
        result++
    }

    document.getElementById('week').textContent = 'Semana ' + result
    
}

// Funcion para pintar el sorteo primitiva
async function getPrimitiva () {

  let value = fetchValue(primitiva)
  const v = await value
  document.getElementById('primitiva').textContent = v

}

// Funcion para pintar el sorteo bonoloto
async function getBonoloto () {

    let value = fetchValue(bonoloto)
    const v = await value
    document.getElementById('bonoloto').textContent = v
  
}

// Funcion para pintar el sorteo primitiva
async function getEuromillon () {

    let value = fetchValue(euromillon)
    const v = await value
    document.getElementById('euromillon').textContent = v
  
}

// Funcion para obtener el sorteo
function fetchValue (sorteo) {

    let value = fetch(sorteo)
        .then((response) => response.json())
        .then((data) => {
            return data.mensaje
        })

    return value

}




export {
    getWeek,
    getPrimitiva,
    getBonoloto,
    getEuromillon
}