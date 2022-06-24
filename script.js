const $body = document.querySelector('body')
const $container = document.querySelector('.container')
const $boxs = document.getElementsByClassName('box')
const $apple = document.getElementsByClassName('apple')
const $score = document.querySelector('#score')
const $time = document.querySelector('#time')
const $headerText = document.querySelectorAll('h1')
const $size = document.querySelector('#size')
const $speed = document.querySelector('#speed')
const $liSize = document.querySelectorAll('.for-size')
const $liSpeed = document.querySelectorAll('.for-speed')
const $btn = document.querySelector('#btn')
const $leftBlock = document.querySelector('.left-block')
const $rightBlock = document.querySelector('.right-block')
const $borderCheck = document.querySelector('#border-check')
const $checkbox = document.querySelector('.checkbox')
const $wasted = document.querySelector('#wasted')
const getRandom = (min, max) => Math.ceil(Math.random() * (max - min) + min)

let boxSize
let dimension
let x
let y
let appleX
let appleY
let xCheck = []
let yCheck = []
let score
let timeCounter
const borders = [-15, -20, -24, -30, -40, -60, 600]
let time = 0.1
let up = false
let right = false
let down = false
let left = false
let scale = true
let stop = false
let border = false
let step = false
let transfer = false
let deg

const move = (event) => {
  if (
    (event.key.toLowerCase() === 'w' || event.key === 'ц') &&
    !down &&
    !step
  ) {
    up = true
    right = false
    down = false
    left = false
    stop = false
    blockStep(1)
    deg = 180
  } else if (
    (event.key.toLowerCase() === 'd' || event.key === 'в') &&
    !left &&
    !step
  ) {
    up = false
    right = true
    down = false
    left = false
    stop = false
    blockStep(1)
    deg = 270
  } else if (
    (event.key.toLowerCase() === 's' || event.key === 'ы') &&
    !up &&
    !step
  ) {
    up = false
    right = false
    down = true
    left = false
    stop = false
    blockStep(1)
    deg = 0
  } else if (
    (event.key.toLowerCase() === 'a' || event.key === 'ф') &&
    !right &&
    !step
  ) {
    up = false
    right = false
    down = false
    left = true
    stop = false
    blockStep(1)
    deg = 90
  } else if (event.key === ' ') {
    stop = true
  }
}

const blockStep = (delay) => {
  step = true
  setTimeout(() => {
    step = false
  }, time * 1000 * delay)
}

const endGame = () => {
  $headerText[1].innerHTML = `Произошло ДТП, змея погибла :( Твой счёт: ${score}` // Надо поправить заголовок и вписать в нужный
  $headerText[0].classList.add('hide')
  $headerText[1].classList.remove('hide')
  $btn.style.filter = 'opacity(1)'
  $btn.removeAttribute('disabled', 'disabled')
  $borderCheck.removeAttribute('disabled', 'disabled')
  $checkbox.classList.remove('hide')
  $liSize[0].classList.remove('hide-li')
  $liSpeed[0].classList.remove('hide-li')
  $leftBlock.classList.remove('hide')
  $rightBlock.classList.remove('hide')
  $wasted.classList.add('show-wasted')
  $wasted.classList.remove('hide-wasted')
  $container.removeChild($boxs[$boxs.length - 1])
}

const createApple = () => {
  do {
  appleX = getRandom(0, dimension) * boxSize
  appleY = getRandom(0, dimension) * boxSize
  } while (xCheck.includes(appleX) && yCheck.includes(appleY))
  let apple = document.createElement('div')
  apple.classList.add('apple')
  apple.style.top = `${appleY}px`
  apple.style.left = `${appleX}px`
  apple.style.width = `${boxSize}px`
  apple.style.height = `${boxSize}px`
  apple.innerHTML = '<img src="apple.png" alt="apple" >'
  $container.insertAdjacentElement('beforeend', apple)
}

let sizeOpen = false
let speedOpen = false
let sizeSelected = false
let speedSelected = false

const changeSize = (event) => {
  let newSize
  if (!sizeOpen && event.target.id === 'li-title') {
    sizeOpen = true
    for (let i = 1; i < $liSize.length; i++) {
      $liSize[i].classList.remove('hide-li')
      $liSize[i].classList.add('show-li')
    }
  } else if (sizeOpen && event.target.id != 'li-title') {
    for (let i = 1; i < $liSize.length; i++) {
      $liSize[i].classList.add('hide-li')
      $liSize[i].classList.remove('show-li')
    }
    sizeOpen = false
    $liSize[0].textContent = `Поле: ${event.target.textContent}`
    newSize = event.target.textContent
  }
  if (newSize === '40x40') {
    boxSize = 15
    sizeSelected = true
  } else if (newSize === '30x30') {
    boxSize = 20
    sizeSelected = true
  } else if (newSize === '25x25') {
    boxSize = 24
    sizeSelected = true
  } else if (newSize === '20x20') {
    boxSize = 30
    sizeSelected = true
  } else if (newSize === '15x15') {
    boxSize = 40
    sizeSelected = true
  } else if (newSize === '10x10') {
    boxSize = 60
    sizeSelected = true
  }
  if (sizeSelected && speedSelected && !score) {
    $btn.removeAttribute('disabled', 'disabled')
  }
  $container.style.backgroundSize = `${boxSize}px ${boxSize}px`
}

const changeSpeed = (event) => {
  let newSpeed = event.target.textContent
  if (!speedOpen && event.target.id === 'li-speed') {
    speedOpen = true
    for (let i = 1; i < $liSpeed.length; i++) {
      $liSpeed[i].classList.remove('hide-li')
      $liSpeed[i].classList.add('show-li')
    }
  } else if (speedOpen && event.target.id != 'li-speed') {
    for (let i = 1; i < $liSize.length; i++) {
      $liSpeed[i].classList.add('hide-li')
      $liSpeed[i].classList.remove('show-li')
    }
    speedOpen = false
    $liSpeed[0].textContent = `Скорость: ${event.target.textContent}`
  }
  if (newSpeed === 'x0.5') {
    time = 0.8
    speedSelected = true
  } else if (newSpeed === 'x1') {
    time = 0.6
    speedSelected = true
  } else if (newSpeed === 'x2') {
    time = 0.4
    speedSelected = true
  } else if (newSpeed === 'x3') {
    time = 0.2
    speedSelected = true
  } else if (newSpeed === 'x4') {
    time = 0.1
    speedSelected = true
  } else if (newSpeed === 'x5') {
    time = 0.05
    speedSelected = true
  }
  if (sizeSelected && speedSelected && !score) {
    $btn.removeAttribute('disabled', 'disabled')
  }
}

const startGame = (event) => {
  $container.innerHTML = ''
  score = 0
  timeCounter = 0
  up = false
  right = false
  down = false
  left = false
  xCheck = []
  yCheck = []
  x = 240
  y = 240
  $liSize[0].classList.add('hide-li')
  $liSpeed[0].classList.add('hide-li')
  $leftBlock.classList.add('hide')
  $rightBlock.classList.add('hide')
  $checkbox.classList.add('hide')
  dimension = $container.clientHeight / boxSize - 1
  $container.innerHTML = ''
  $btn.style.filter = 'opacity(0)'
  $btn.setAttribute('disabled', 'disabled')
  $borderCheck.setAttribute('disabled', 'disabled')
  $wasted.classList.add('hide-wasted')
  $wasted.classList.remove('show-wasted')

  const trail = setInterval(() => {
    // if ($boxs.length > 2) {
    // $boxs[$boxs.length -1].innerHTML = '<img src="head2.webp" alt="head">'
    // $boxs[$boxs.length -1].style.background = ''
    // $boxs[$boxs.length -2].innerHTML = ''
    // }
    // console.log($boxs[length -1])
    if ((up || right || down || left) && scale && !stop && $boxs[0]) {
      $container.removeChild($boxs[0])
      xCheck.pop()
      yCheck.pop()
    }
    if (x - appleX === 0 && y - appleY === 0) {
      $container.removeChild($apple[0])
      createApple()
      score++
      scale = false
    } else {
      scale = true
    }
  }, time * 1000)

  const moveUp = setInterval(() => {
    if (up && !stop) {
      createBox()
      y -= boxSize
    }
  }, time * 1000)

  const moveRight = setInterval(() => {
    if (right && !stop) {
      createBox()
      x += boxSize
    }
  }, time * 1000)

  const moveDown = setInterval(() => {
    if (down && !stop) {
      createBox()
      y += boxSize
    }
  }, time * 1000)

  const moveLeft = setInterval(() => {
    if (left && !stop) {
      createBox()
      x -= boxSize
    }
  }, time * 1000)

  const createBox = () => {
    if (!x && !y) {
      x = getRandom(0, dimension) * boxSize
      y = getRandom(0, dimension) * boxSize
    }
    let box = document.createElement('div')
    box.style = `--d: ${deg}deg;`
    box.classList.add('box')
    box.style.top = `${y}px`
    box.style.left = `${x}px`
    box.style.width = `${boxSize}px`
    box.style.height = `${boxSize}px`
    $container.insertAdjacentElement('beforeend', box)
    xCheck.unshift(x)
    yCheck.unshift(y)
    $score.textContent = score
    if ((borders.includes(x) || borders.includes(y)) && border) {
      endGame()
      clearInterval(moveUp)
      clearInterval(moveRight)
      clearInterval(moveDown)
      clearInterval(moveLeft)
      clearInterval(trail)
      clearInterval(timeCheck)
    }
    if (x <= 0 && left && !border) {
      x += 600
    } else if (y <= 0 && up && !border) {
      y += 600
    } else if (x >= 600 - boxSize && right && !border) {
      x -= 600
    } else if (y >= 600 - boxSize && down && !border) {
      y -= 600
    }

    for (let i = 1; i < xCheck.length; i++) {
      if (xCheck[i] === x && yCheck[i] === y && xCheck.length > 1) {
        endGame()
        clearInterval(moveUp)
        clearInterval(moveRight)
        clearInterval(moveDown)
        clearInterval(moveLeft)
        clearInterval(trail)
        clearInterval(timeCheck)
      }
    }
  }

  const timeCheck = setInterval(() => {
    timeCounter += 0.1
    $time.textContent = timeCounter.toFixed(1)
  }, 100)
  $headerText[0].classList.remove('hide')
  $headerText[1].classList.add('hide')
  createBox()
  createApple()
}

const setBorder = (event) => {
  border ? (border = false) : (border = true)
}

document.addEventListener('keypress', move)
$speed.addEventListener('click', changeSpeed)
$size.addEventListener('click', changeSize)
$btn.addEventListener('click', startGame)
$borderCheck.addEventListener('change', setBorder)
