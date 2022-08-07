import { primitiva, bonoloto, euromillon, premios } from './url.js'
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
    
    return result
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

// Funcion para obtener el numero de premios
async function getPremios () {

    let value = fetchResults(premios + getWeek())
    const v = await value
    // Convertimos cada objeto del array a un string
    let stringPrimitiva = v.primitiva.map(function(obj) {
        delete obj._id
        delete obj.apuesta
        delete obj.id
        delete obj.week
        obj.date = new Date(obj.date).toLocaleDateString('es-ES')

        // Comprobamos que aciertos no incluya un texto false
        if (obj.premio.includes('false')) {
            // Contamos el numero de trues
            let count = obj.premio.split('true').length - 1
            obj.premio = count
        }

        // Si el valor de premio es 0 obviamos el objeto en el map
        if (obj.premio == 0) {
            return ''
        }

        let aux = JSON.stringify(obj)

        // Remplazamos en el string el { por un caracter vacio
        aux = aux.replace(/{/g, '')
        aux = aux.replace(/"/g, '')
        aux = aux.replace(/:/g, ' : ')
        aux = aux.replace(/,/g, ' , ')
        aux = aux.replace(/}/g, '')


        return aux
    })
    let stringBonoloto = v.bonoloto.map(function(obj) {
        delete obj._id
        delete obj.apuesta
        delete obj.id
        delete obj.week
        obj.date = new Date(obj.date).toLocaleDateString('es-ES')
        
        // Comprobamos que aciertos no incluya un texto false
        if (obj.premio.includes('false')) {
            // Contamos el numero de trues
            let count = obj.premio.split('true').length - 1
            obj.premio = count
        }

        // Si el valor de premio es 0 obviamos el objeto en el map
        if (obj.premio == 0) {
            return ''
        }

        let aux = JSON.stringify(obj)

        // Remplazamos en el string el { por un caracter vacio
        aux = aux.replace(/{/g, '')
        aux = aux.replace(/"/g, '')
        aux = aux.replace(/:/g, ' : ')
        aux = aux.replace(/,/g, ' , ')
        aux = aux.replace(/}/g, '')


        return aux
    })
    let stringEuromillones = v.euromillon.map(function(obj) {
        delete obj._id
        delete obj.apuesta
        delete obj.id
        delete obj.week
        obj.date = new Date(obj.date).toLocaleDateString('es-ES')
        
        // Comprobamos que aciertos no incluya un texto false
        if (obj.premio.includes('false')) {
            // Contamos el numero de trues
            let count = obj.premio.split('true').length - 1
            obj.premio = count
        }

        // Si el valor de premio es 0 obviamos el objeto en el map
        if (obj.premio == 0) {
            return ''
        }

        let aux = JSON.stringify(obj)

        // Remplazamos en el string el { por un caracter vacio
        aux = aux.replace(/{/g, '')
        aux = aux.replace(/"/g, '')
        aux = aux.replace(/:/g, ' : ')
        aux = aux.replace(/,/g, ' , ')
        aux = aux.replace(/}/g, '')


        return aux
    })

    // Creamos un h1 por cada elemento del array
    stringPrimitiva.forEach(function(element) {
        let h4 = document.createElement('h4')
        h4.textContent = element
        document.getElementById('rPrimitiva').appendChild(h4)
    })
    stringBonoloto.forEach(function(element) {
        let h4 = document.createElement('h4')
        h4.textContent = element
        document.getElementById('rBonoloto').appendChild(h4)
    })
    stringEuromillones.forEach(function(element) {
        let h4 = document.createElement('h4')
        h4.textContent = element
        document.getElementById('rEuromillon').appendChild(h4)
    })

    //document.getElementById('rPrimitiva').textContent = stringPrimitiva

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

// Funcion para obtener los resultados de los sorteos
function fetchResults (url) {

    let value = fetch(url)
        .then((response) => response.json())
        .then((data) => {
            return data
        })
    return value

}


export {
    getWeek,
    getPrimitiva,
    getBonoloto,
    getEuromillon,
    getPremios
}