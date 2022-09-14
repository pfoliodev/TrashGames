let seconds = 00
let tens = 00
let appendTens = document.getElementById("tens")
let appendSeconds = document.getElementById("seconds")
let buttonStart = document.getElementById('button-start')
let buttonStop = document.getElementById('button-stop')
let buttonReset = document.getElementById('button-reset')
let Interval

let endGamePopUp = document.getElementById('popUpEndGame')
let popUpSelectShip = document.getElementById('popUpSelectShip')

let stars = document.getElementById('stars')
let textEndGame = document.getElementById('textEndGame')
let timePopUpEndGame = document.getElementById('timeEndGame')
let scorePopUpEndGame = document.getElementById('scoreEndGame')

let validSpaceShipSelection = document.querySelectorAll(".validateSpaceShip")
for (let i = 0; i < validSpaceShipSelection.length; i++){
  validSpaceShipSelection[i].addEventListener('click', function(){
    let stats = validSpaceShipSelection[i].previousElementSibling
    let life = stats.children[0].innerHTML
    let img = stats.children[1].innerHTML
    let nbProjectile = stats.children[2].innerHTML
    let velocityProjectile = stats.children[3].innerHTML

    popUpSelectShip.style.display = "none"
    shipName = "xerxes"
    totalLife = life
    nbProjectile = nbProjectile
    velocityProjectile = velocityProjectile

    replayGame()
    player.image.src = `./img/${shipName}.png`
  })
}

let selectShipButton = document.getElementById('chooseShip')
selectShipButton.addEventListener("click", function(){
  endGamePopUp.style.display = "none"
  popUpSelectShip.style.display = "flex"
})

let replay = document.getElementById("replayGame")
replay.addEventListener("click", function(){
  endGamePopUp.style.display = "none"
  replayGame()
})

const scoreEl = document.querySelector('#scoreEl')
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1200
canvas.height = 800

let life = document.querySelector('#lifeSpaceShip')

let shipName = "xerxes"
let totalLife = 3
let imgSpaceShip = `./img/${shipName}.png`
let nbProjectile;
let velocityProjectile;

Interval = setInterval(startTimer, 10);

class Player {
  constructor() {
    this.velocity = {
      x: 0,
      y: 0
    }
    
    this.life = totalLife
    this.rotation = 0
    this.opacity = 1
    this.colorProjectile = "#82827D"

    const image = new Image()
    image.src = imgSpaceShip
    image.onload = () => {
      const scale = 0.50
      this.image = image
      this.width = image.width * scale
      this.height = image.height * scale
      this.position = {
        x: canvas.width / 2 - this.width / 2,
        y: canvas.height - this.height - 20
      }
    }
  }

  draw() {
    // c.fillStyle = 'red'
    // c.fillRect(this.position.x, this.position.y, this.width, this.height)

    c.save()
    c.globalAlpha = this.opacity
    c.translate(
      player.position.x + player.width / 2,
      player.position.y + player.height / 2
    )
    c.rotate(this.rotation)

    c.translate(
      -player.position.x - player.width / 2,
      -player.position.y - player.height / 2
    )

    c.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    )
    c.restore()
  }

  update() {
    if (this.image) {
      this.draw()
      this.position.x += this.velocity.x
    }
  }

  updateColorProjectile(currentColorProjectile) {
    if(currentColorProjectile == "#82827D") this.colorProjectile = "#3EF072"
    if(currentColorProjectile == "#3EF072") this.colorProjectile = "#F0DC58"
    if(currentColorProjectile == "#F0DC58") this.colorProjectile = "#82827D"
  }

  resetLife(){
    this.life = totalLife
  }
  removeLife(){
    this.life - 1
  }
}

class Projectile {
  constructor({ position, velocity, color}) {
    this.position = position
    this.velocity = velocity
    this.radius = 4
    this.color = color
  }

  draw() {
    c.save()
    c.beginPath()
    c.shadowBlur = 5
    c.shadowColor = '#DBDCFF'
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 3)
    c.fillStyle = this.color
    c.fill()
    c.shadowColor = undefined; 
    c.shadowBlur = undefined;  
    c.closePath()
    c.restore()
  }

  update() {
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }
}

class Particle {
  constructor({ position, velocity, radius, color, fades }) {
    this.position = position
    this.velocity = velocity

    this.radius = radius
    this.color = color
    this.opacity = 1
    this.fades = fades
  }

  draw() {
    c.save()
    c.globalAlpha = this.opacity
    c.beginPath()
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
    c.restore()
  }

  update() {
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    if (this.fades) this.opacity -= 0.01
  }
}

class InvaderProjectile {
  constructor({ position, velocity }) {
    this.position = position
    this.velocity = velocity

    this.width = 3
    this.height = 10
  }

  draw() {
    c.fillStyle = 'red'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)
  }

  update() {
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }
}

class Invader {
  constructor({ position, color }) {
    this.velocity = {
      x: 0,
      y: 0
    }

    this.color = color

    const image = new Image()

    switch(color) {
      case 1 : image.src = './img/invaders-green.png';
      this.color = "#3EF072"
      break;
      case 2 : image.src = './img/invaders-grey.png'; 
      this.color = "#82827D"
      break;
      case 3 : image.src = './img/invaders-yellow.png';
      this.color = "#F0DC58"
      break;
    }
    
    image.onload = () => {
      const scale = 0.5
      this.image = image
      this.width = image.width * scale
      this.height = image.height * scale
      this.position = {
        x: position.x,
        y: position.y
      }
    }
  }

  draw() {
    // c.fillStyle = 'red'
    // c.fillRect(this.position.x, this.position.y, this.width, this.height)

    c.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    )
  }

  update({ velocity }) {
    if (this.image) {
      this.draw()
      this.position.x += velocity.x
      this.position.y += velocity.y
    }
  }

  shoot(invaderProjectiles) {
    invaderProjectiles.push(
      new InvaderProjectile({
        position: {
          x: this.position.x + this.width / 2,
          y: this.position.y + this.height
        },
        velocity: {
          x: 0,
          y: 2
        }
      })
    )
  }
}

class Grid {
  constructor() {
    this.position = {
      x: 0,
      y: 0
    }

    this.velocity = {
      x: 2,
      y: 0
    }

    this.invaders = []

    const columns = Math.floor(Math.random() * 5 + 5)
    const rows = Math.floor(Math.random() * 3 + 2)

    this.width = columns * 30

    let color = Math.floor(Math.random() * 3) + 1

    for (let x = 0; x < columns; x++) {
      for (let y = 0; y < rows; y++) {
        this.invaders.push(
          new Invader({
            position: {
              x: x * 30,
              y: y * 30
            },
            color: color
          })
        )
      }
    }
  }

  update() {
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    this.velocity.y = 0

    if (this.position.x + this.width >= canvas.width || this.position.x <= 0) {
      this.velocity.x = -this.velocity.x * 0.5
      this.velocity.y = 30
    }
  }
}

function randomBetween(min, max) {
  return Math.random() * (max - min) + min
}

var player = new Player()
const projectiles = []
const grids = []
const invaderProjectiles = []
const particles = []
let score = 0
let frames = 0
let randomInterval = Math.floor(Math.random() * 500 + 500)

const keys = {
  a: {
    pressed: false
  },
  d: {
    pressed: false
  },
  space: {
    pressed: false
  }
}

let game = {
  over: false,
  active: true
}


for (let i = 0; i < 100; i++) {
  particles.push(
    new Particle({
      position: {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height
      },
      velocity: {
        x: 0,
        y: 0.9
      },
      radius: Math.random() * 2,
      color: 'white'
    })
  )
}

function createParticles({ object, color, fades }) {
  for (let i = 0; i < 15; i++) {
    particles.push(
      new Particle({
        position: {
          x: object.position.x + object.width / 2,
          y: object.position.y + object.height / 2
        },
        velocity: {
          x: (Math.random() - 0.5) * 2,
          y: (Math.random() - 0.5) * 2
        },
        radius: Math.random() * 5,
        color: color || '#F06435',
        fades
      })
    )
  }
}

function createScoreLabel({ score = 100, object }) {
  const scoreLabel = document.createElement('label')
  scoreLabel.innerHTML = score
  scoreLabel.style.position = 'absolute'
  scoreLabel.style.color = 'white'
  scoreLabel.style.top = object.position.y + 'px'
  scoreLabel.style.left = object.position.x + 'px'
  scoreLabel.style.fontSize = 20 + 'px'
  scoreLabel.style.userSelect = 'none'
  document.querySelector('#parentDiv').appendChild(scoreLabel)

  gsap.to(scoreLabel, {
    opacity: 0,
    y: -30,
    duration: 0.75,
    onComplete: () => {
      document.querySelector('#parentDiv').removeChild(scoreLabel)
    }
  })
}

function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y &&
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width
  )
}

function resetTimer(){
  tens = "00";
  seconds = "00";
  appendTens.innerHTML = tens;
  appendSeconds.innerHTML = seconds;
}

function resetGame(){
  resetTimer()
  player.opacity = 1
}

function endGame() {
  grids.splice(0, grids.length)
  invaderProjectiles.splice(0, invaderProjectiles.length)
  popUpEndGame()
  resetTimer()
  clearInterval(Interval);
  setTimeout(() => {
    player.opacity = 0
    game.over = true
  }, 0)

  setTimeout(() => {
    game.active = false
  }, 1000)

  createParticles({
    object: player,
    color: 'white',
    fades: true
  })
}

let spawnBuffer = 500

function animate() {
  if (!game.active) return
  requestAnimationFrame(animate)
  c.fillStyle = 'black'
  c.fillRect(0, 0, canvas.width, canvas.height)

  player.update()
  particles.forEach((particle, i) => {
    if (particle.position.y - particle.radius >= canvas.height) {
      particle.position.x = Math.random() * canvas.width
      particle.position.y = -particle.radius
    }

    if (particle.opacity <= 0) {
      setTimeout(() => {
        particles.splice(i, 1)
      }, 0)
    } else {
      particle.update()
    }
  })

  invaderProjectiles.forEach((invaderProjectile, index) => {
    if (
      invaderProjectile.position.y + invaderProjectile.height >=
      canvas.height
    ) {
      setTimeout(() => {
        invaderProjectiles.splice(index, 1)
      }, 0)
    } else invaderProjectile.update()

    // projectile hits player
    if (rectangularCollision({rectangle1: invaderProjectile, rectangle2: player})) {
      invaderProjectiles.splice(index, 1)
      player.life = player.life - 1
      player.removeLife()
      life.removeChild(life.lastChild)
      createParticles({
        object: player,
        color: '#F56124',
        fades: true
      })
      if(player.life == 0){
        endGame()
      } 
    }
  })

  for (let i = projectiles.length - 1; i >= 0; i--) {
    const projectile = projectiles[i]

    if (projectile.position.y + projectile.radius <= 0) {
      projectiles.splice(i, 1)
    } else {
      projectile.update()
    }
  }

  grids.forEach((grid, gridIndex) => {
    grid.update()
    // spawn projectiles
    if (frames % 100 === 0 && grid.invaders.length > 0) {
      grid.invaders[Math.floor(Math.random() * grid.invaders.length)].shoot(
        invaderProjectiles
      )
    }

    for (let i = grid.invaders.length - 1; i >= 0; i--) {
      const invader = grid.invaders[i]
      invader.update({ velocity: grid.velocity })

      // projectiles hit enemy
      projectiles.forEach((projectile, j) => {
        // console.log(player.colorProjectile + " - " + invader.color)
        if (
          projectile.position.y - projectile.radius <=
            invader.position.y + invader.height &&
          projectile.position.x + projectile.radius >= invader.position.x &&
          projectile.position.x - projectile.radius <=
            invader.position.x + invader.width &&
          projectile.position.y + projectile.radius >= invader.position.y &&
          player.colorProjectile == invader.color
        ) {
          console.log(invader.color)
          setTimeout(() => {
            const invaderFound = grid.invaders.find(
              (invader2) => invader2 === invader
            )
            const projectileFound = projectiles.find(
              (projectile2) => projectile2 === projectile
            )

            // remove invader and projectile
            if (invaderFound && projectileFound) {
              score += 100
              scoreEl.innerHTML = score

              // dynamic score labels
              createScoreLabel({
                object: invader
              })

              createParticles({
                object: invader,
                fades: true
              })

              grid.invaders.splice(i, 1)
              projectiles.splice(j, 1)

              if (grid.invaders.length > 0) {
                const firstInvader = grid.invaders[0]
                const lastInvader = grid.invaders[grid.invaders.length - 1]

                grid.width =
                  lastInvader.position.x -
                  firstInvader.position.x +
                  lastInvader.width
                grid.position.x = firstInvader.position.x
              } else {
                grids.splice(gridIndex, 1)
              }
            }
          }, 0)
        }
      })

      // remove player if invaders touch it
      if (rectangularCollision({rectangle1: invader, rectangle2: player}) && !game.over){
        clearInterval(Interval);
        endGame()
      } 
    } // end looping over grid.invaders
  })

  if (keys.a.pressed && player.position.x >= 0) {
    player.velocity.x = -7
    player.rotation = -0.15
  } else if (
    keys.d.pressed &&
    player.position.x + player.width <= canvas.width
  ) {
    player.velocity.x = 7
    player.rotation = 0.15
  } else {
    player.velocity.x = 0
    player.rotation = 0
  }

  // spawning enemies
  if (frames % randomInterval === 0) {
    spawnBuffer = spawnBuffer < 0 ? 100 : spawnBuffer
    grids.push(new Grid())
    randomInterval = Math.floor(Math.random() * 500 + spawnBuffer)
    frames = 0
    spawnBuffer -= 100
  }
  frames++
}

// Set up before animate game
function setLifeUI(){
  for(i = 0; i < totalLife; i ++){
    const img = new Image(35, 35)
    img.src = "./img/life.png"
    life.appendChild(img)
  }
}

// Init the first time
setLifeUI()
animate()

addEventListener('keydown', ({ key }) => {
  if (game.over) return

  switch (key) {
    // Handle spaceship movement
    case 'a':
      keys.a.pressed = true
      break
    case 'd':
      keys.d.pressed = true
      break
      // Handle fired projectile
    case ' ':
      keys.space.pressed = true

      projectiles.push(
        new Projectile({
          position: {
            x: player.position.x + player.width / 2 - 10,
            y: player.position.y
          },
          velocity: {
            x: 0,
            y: -5
          },
          color : player.colorProjectile
        }),
        new Projectile({
          position: {
            x: player.position.x + player.width / 2 + 10,
            y: player.position.y
          },
          velocity: {
            x: 0,
            y: -5
          },
          color : player.colorProjectile
        })
      )
      break
      // Handle switch color for projectile
    case 'e':
      player.updateColorProjectile(player.colorProjectile)
    break
  }
})

addEventListener('keyup', ({ key }) => {
  switch (key) {
    case 'a':
      keys.a.pressed = false
      break
    case 'd':
      keys.d.pressed = false
      break
    case ' ':
      keys.space.pressed = false

      break
  }
})

  function switchProjectileColor(colorProjectile) {
    if(colorProjectileIndex.length - 1 === colorProjectileIndex) colorProjectileIndex = 0
    else colorProjectileIndex + 1
    console.log(colorProjectile)
  }

  function startTimer() {
    tens++; 
    
    if(tens <= 9){
      appendTens.innerHTML = "0" + tens;
    }
    
    if (tens > 9){
      appendTens.innerHTML = tens;
      
    } 
    
    if (tens > 99) {
      seconds++;
      appendSeconds.innerHTML = "0" + seconds;
      tens = 0;
      appendTens.innerHTML = "0" + 0;
    }
    
    if (seconds > 9){
      appendSeconds.innerHTML = seconds;
    }
  }

  function popUpEndGame(){
    const oneStar = new Image(50, 50);
    oneStar.src = "img/1Star.png";
  
    const twoStars = new Image(82, 39);
    twoStars.src = "img/2Stars.png";
  
    const threeStars = new Image(129, 40);
    threeStars.src = "img/3Stars.png";
    let textEndGameArray = ["Tu peux mieux faire !", "Tu t'en sors bien !", "Tu es impressionant !"]
    let scoreEndGame = parseInt(scoreEl.innerHTML)
    let timeEndGame = parseInt(document.getElementById('seconds').innerHTML)
  
    if(scoreEndGame < 50000){
      stars.appendChild(oneStar);
      textEndGame.innerHTML = textEndGameArray[0]
  
    }else if(scoreEndGame > 50000 && scoreEndGame < 100000){
      stars.appendChild(twoStars);
      textEndGame.innerHTML = textEndGameArray[1]
    }else{
      stars.appendChild(threeStars);
      textEndGame.innerHTML = textEndGameArray[2]
    }

    scorePopUpEndGame.innerHTML = scoreEndGame
    scorePopUpEndGame.style.fontFamily = "Impact"
    scorePopUpEndGame.style.fontSize = "20px"
  
    timePopUpEndGame.innerHTML = timeEndGame + " s"
    timePopUpEndGame.style.fontFamily = "Impact"
    timePopUpEndGame.style.fontSize = "20px"
  
    textEndGame.style.fontFamily = "Impact"
    textEndGame.style.fontSize = "20px"
    endGamePopUp.style.display = "flex"
  }

  function replayGame(){
    game.over = false
    game.active = true
    player.opacity = 1
    player.resetLife()
    stars.removeChild(stars.lastElementChild)
    score = 0
    scoreEl.innerHTML = 0
    setLifeUI()
    Interval = setInterval(startTimer, 10);
    animate()
  }