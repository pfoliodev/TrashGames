const spaceship = document.querySelector('#spaceship')
const spaceshipContainer = document.querySelector('#spaceShipContainer')
const game = document.querySelector('#game')
const moveBy = 10
const nbProj = 2

const gameWidth = game.width = innerWidth
const gameHeight = game.height = innerHeight

const spaceshipPosition = getComputedStyle(spaceship)

var rect = spaceship.getBoundingClientRect();
console.log(rect.top, rect.right, rect.bottom, rect.left);

// Handle Spaceship behavior
window.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'a' :
            spaceship.src = "../assets/SpaceShipBlue.png"
            spaceship.className = "spaceShipBlue"
            break
        case 'z' : 
            spaceship.src = "../assets/SpaceShipGrey.png"
            spaceship.className = "spaceShipGrey"
            break
        case 'e' : 
            spaceship.src = "../assets/SpaceShipGreen.png"
            spaceship.className = "spaceShipGreen"
            break
        case 'r' :
            spaceship.src = "../assets/SpaceShipRed.png"
            spaceship.className = "spaceShipRed"
            break
        case 't' :
            spaceship.src = "../assets/SpaceShipYellow.png"
            spaceship.className = "spaceShipYellow"
            break
        case 'd' :
                createProjectile()
        
    }
})


// First Spaceship position in screen  
window.addEventListener('load', () => {
    spaceship.style.position = 'absolute'
    spaceship.style.left = 0
    spaceship.style.right = 0
    spaceship.style.top =  (gameHeight / 2) - 120
    spaceship.style.top = parseInt(spaceship.style.top) - 1 + 'px'
})


// Handle Spaceship Behavior
window.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowLeft' :
        if(spaceship.offsetLeft > 0){
            spaceship.style.left = parseInt(spaceship.style.left) - moveBy + 'px'
            updateSpaceshipPos = [spaceshipPosition.left, spaceshipPosition.top]
            console.log(updateSpaceshipPos)
        }
        break
        case 'ArrowRight' : 
        if(spaceship.offsetLeft + spaceship.width < game.offsetWidth){
            spaceship.style.left = parseInt(spaceship.style.left) + moveBy + 'px'
            let updateSpaceshipPos = [spaceshipPosition.left, spaceshipPosition.top]
            console.log(updateSpaceshipPos)
        }
        break 
        case 'ArrowUp' : 
        if(spaceship.offsetTop > 0){
            spaceship.style.top = parseInt(spaceship.style.top) - moveBy + 'px'
            let updateSpaceshipPos = [spaceshipPosition.left, spaceshipPosition.top]
            console.log(updateSpaceshipPos)
        }
        break
        case 'ArrowDown' :
        if(spaceship.offsetTop + spaceship.height < game.offsetHeight){
            spaceship.style.top = parseInt(spaceship.style.top) + moveBy + 'px'
            let updateSpaceshipPos = [spaceshipPosition.left, spaceshipPosition.top]
            console.log(updateSpaceshipPos)
        }
        break
    }
})


/**
 * @returns Top position of the screenGame
 */
 function getIntPositionTopScreen(){
    let positionOfTop = parseInt(game.offsetHeight)
    return positionOfTop
}

function createProjectile(){
    let img = document.createElement("img")
    img.src = "../assets/darkProjectile.png"
    img.classList.add("projectile")
    if(nbProj > 0){
        img.style.left = innerWidth + getSpaceshipLeftPos(left)
        img.style.top = spaceshipPosition.top
    }
    spaceship.after(img)

    img.animate([
        {transform: 'translateY(0px)'},
        {transform: 'translateY(-300px)'},
    ], {
        duration: 1000,
        fill: "forwards",
        easing: "ease-out"
    })
}

function getSpaceshipLeftPos(left){
    let spaceshipLeftPos = parseInt(left.slice(0, left.length - 2))
    return spaceshipLeftPos
}


