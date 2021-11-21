let spaceship = document.querySelector('#spaceship')
let game = document.querySelector('#game')
let moveBy = 10

// Handle Spaceship Modes
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
    }
})


// First Spaceship position in screen  
window.addEventListener('load', () => {
    spaceship.style.position = 'absolute'
    spaceship.style.left = 0
    spaceship.style.right = 0
    spaceship.style.top = game.offsetHeight / 2 
})

// Handle Spaceship Moves
window.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowLeft' :
        if(spaceship.offsetLeft > 0){
            spaceship.style.left = parseInt(spaceship.style.left) - moveBy + 'px'
            break
        }
        case 'ArrowRight' : 
        if(spaceship.offsetLeft + spaceship.width < game.offsetWidth){
            spaceship.style.left = parseInt(spaceship.style.left) + moveBy + 'px'
            break
        } 
        case 'ArrowUp' : 
        if(spaceship.offsetTop > 0){
            spaceship.style.top = parseInt(spaceship.style.top) - moveBy + 'px'
            break
        }
        case 'ArrowDown' :
        if(spaceship.offsetTop + spaceship.height < game.offsetHeight){
            spaceship.style.top = parseInt(spaceship.style.top) + moveBy + 'px'
            break
        } 
    }
})