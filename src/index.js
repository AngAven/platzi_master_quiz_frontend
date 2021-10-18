import axios from 'axios'

import '../node_modules/bootstrap/dist/js/bootstrap'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import './styles/index.css'

const API = 'http://localhost:3000/api/questions'
let resultadosCorrectos = []

const evaluation = async (url_api) => {
  let evaluacioFinal = new Array(0)
  try {
    const response = await axios.get(url_api)
    const questions = response.data.questions
    const evaluacion = []

    for (let i = 0; i < 5; i++){
      const presguntaSeleccionada = Math.floor((Math.random() * 100) + 1)
      evaluacion.push(presguntaSeleccionada)
    }

    evaluacion.forEach(i => {
      evaluacioFinal.push(questions.filter(item => item.numero === i))
    })

    } catch (e) {
    console.log(e)
  }

  return evaluacioFinal
}

const llenarEvaluacion = async () => {
  const preguntas = await evaluation(API)

  preguntas.forEach(item => {
    const data = item[0]
    const evaluacion = document.getElementById('evaluacion')
    const contenedorPregunta = document.createElement('div')
    const pregunta = document.createElement('h3')

    contenedorPregunta.classList.add('contenedorPregunta')
    contenedorPregunta.id = ('pregunta-' + data.numero)

    // Se agrega pregunta
    pregunta.textContent = data.pregunta
    contenedorPregunta.appendChild(pregunta)

    //Se agregan opciones para cada pregunta
    for (let i = 1; i <= 4; i++){
      const formCheck = document.createElement('div')
      const inputCheck = document.createElement('input')
      const labelInputCheck = document.createElement('label')

      formCheck.classList.add('form-check')
      formCheck.classList.add('respuestas')
      inputCheck.classList.add('form-check-input')
      labelInputCheck.classList.add('form-check-label')
      inputCheck.type = 'radio'

      switch (i) {
        case 1:
          inputCheck.dataset.id = (`${data._id}`)
          inputCheck.dataset.r = (`${data.respuesta}`)
          inputCheck.dataset.opcion = (`${i}`)
          inputCheck.dataset.pregunta = (`${data.numero}`)
          inputCheck.name = `pregunta-${data.numero}`
          inputCheck.id = `opcion-${data.numero}-${i}`
          labelInputCheck.htmlFor = `opcion-${data.numero}-${i}`
          labelInputCheck.textContent = data.op1
          break
        case 2:
          inputCheck.dataset.id = (`${data._id}`)
          inputCheck.dataset.r = (`${data.respuesta}`)
          inputCheck.dataset.opcion = (`${i}`)
          inputCheck.dataset.pregunta = (`${data.numero}`)
          inputCheck.name = `pregunta-${data.numero}`
          inputCheck.id = `opcion-${data.numero}-${i}`
          labelInputCheck.htmlFor = `opcion-${data.numero}-${i}`
          labelInputCheck.textContent = data.op2
          break
        case 3:
          inputCheck.dataset.id = (`${data._id}`)
          inputCheck.dataset.r = (`${data.respuesta}`)
          inputCheck.dataset.opcion = (`${i}`)
          inputCheck.dataset.pregunta = (`${data.numero}`)
          inputCheck.name = `pregunta-${data.numero}`
          inputCheck.id = `opcion-${data.numero}-${i}`
          labelInputCheck.htmlFor = `opcion-${data.numero}-${i}`
          labelInputCheck.textContent = data.op3
          break
        case 4:
          inputCheck.dataset.id = (`${data._id}`)
          inputCheck.dataset.r = (`${data.respuesta}`)
          inputCheck.dataset.opcion = (`${i}`)
          inputCheck.dataset.pregunta = (`${data.numero}`)
          inputCheck.name = `pregunta-${data.numero}`
          inputCheck.id = `opcion-${data.numero}-${i}`
          labelInputCheck.htmlFor = `opcion-${data.numero}-${i}`
          labelInputCheck.textContent = data.op4
          break
        default: labelInputCheck.textContent = 'No se pudo cargar pregunta'
      }

      formCheck.appendChild(inputCheck)
      formCheck.appendChild(labelInputCheck)
      contenedorPregunta.appendChild(formCheck)
    }

    evaluacion.appendChild(contenedorPregunta)
  })

  agregarEventos()
}

const agregarEventos = () => {
  const inputsChanged = document.querySelectorAll('input')
  const calcularResultados = document.getElementById('calcular-resultado')

  inputsChanged.forEach(input => {
    input.addEventListener('change', () => {
      const inputsChecked = Array.from(document.querySelectorAll('input:checked'))
      resultadosCorrectos = inputsChecked.filter(item => item.dataset.r == item.dataset.opcion)
    })
  })

  calcularResultados.addEventListener('click', () => {
    const inputsChecked = Array.from(document.querySelectorAll('input:checked'))

    if(inputsChecked.length < 5){
      console.log('llenar todos los datos')
    }

    console.log('todo bien')
  })
}

llenarEvaluacion()
