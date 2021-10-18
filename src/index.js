import axios from 'axios'

import '../node_modules/bootstrap/dist/js/bootstrap'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import './styles/index.css'

const API = 'http://localhost:3000/api/questions'

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
          inputCheck.name = `pregunta-${data.numero}`
          inputCheck.id = `opccion-${data.numero}-${i}`
          labelInputCheck.htmlFor = `opccion-${data.numero}-${i}`
          labelInputCheck.textContent = data.op1
          break
        case 2:
          inputCheck.name = `pregunta-${data.numero}`
          inputCheck.id = `opccion-${data.numero}-${i}`
          labelInputCheck.htmlFor = `opccion-${data.numero}-${i}`
          labelInputCheck.textContent = data.op2
          break
        case 3:
          inputCheck.name = `pregunta-${data.numero}`
          inputCheck.id = `opccion-${data.numero}-${i}`
          labelInputCheck.htmlFor = `opccion-${data.numero}-${i}`
          labelInputCheck.textContent = data.op3
          break
        case 4:
          inputCheck.name = `pregunta-${data.numero}`
          inputCheck.id = `opccion-${data.numero}-${i}`
          labelInputCheck.htmlFor = `opccion-${data.numero}-${i}`
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
}

llenarEvaluacion()

