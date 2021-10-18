import axios from 'axios'
import Chart from 'chart.js/auto';


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
  const loading = document.getElementById('lds-grid')
  const preguntas = await evaluation(API)
  const evaluaciondiv = document.getElementById('evaluacion')
  const buttonCalcularResultado = document.createElement('button')

  buttonCalcularResultado.id = 'calcular-resultado'
  buttonCalcularResultado.type = 'button'
  buttonCalcularResultado.classList.add('btn')
  buttonCalcularResultado.classList.add('btn-primary')
  buttonCalcularResultado.classList.add('btn-lg')
  buttonCalcularResultado.textContent = 'Calcular resultado'

  // Creación de opciones a la pregunta
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

  evaluaciondiv.appendChild(buttonCalcularResultado)
  loading.style.display = 'none'
  evaluaciondiv.style.textAlign = 'unset'
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
    const preguntasContestadas = inputsChecked.length
    const respuestasCorrectas = resultadosCorrectos.length
    const respuestasIncorrectas = 5 - respuestasCorrectas

    if(preguntasContestadas < 5){
      const modal = document.getElementById('modal-all-checked')
      modal.click()

      return
    }

    const evaluacion = document.getElementById('evaluacion')
    const resultadosGrafica = document.getElementById('resultados')

    evaluacion.classList.add('hide-element')
    resultadosGrafica.classList.remove('hide-element')

    //Gráfica de dona
    const resultados = document.getElementById('graficaResultados').getContext('2d');
    const chartResults = new Chart(resultados, {
      type: 'doughnut',
      data: {
        labels: [
          'Erroneas',
          'Correctas',
        ],
        datasets: [{
          label: 'Resultados',
          data: [respuestasCorrectas, respuestasIncorrectas],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)'
          ],
          hoverOffset: 4
        }]
      }
    })
  })
}

llenarEvaluacion()
