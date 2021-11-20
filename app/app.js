let spaceship = document.querySelector('#spaceship')
let game = document.querySelector('#game')
let moveBy = 10

console.log(game.offsetWidth);
console.log(game.offsetHeight);

window.addEventListener('load', () => {
    spaceship.style.position = 'absolute'
    spaceship.style.left = 0
    spaceship.style.right = 0
    spaceship.style.top = 0
    spaceship.style.bottom = 0
})

window.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'ArrowLeft' : 
        spaceship.style.left = parseInt(spaceship.style.left) - moveBy + 'px'
        break
        case 'ArrowRight' : 
        spaceship.style.left = parseInt(spaceship.style.left) + moveBy + 'px'
        break
        case 'ArrowUp' : 
        spaceship.style.top = parseInt(spaceship.style.top) - moveBy + 'px'
        console.log(spaceship.offsetTop);
        break
        case 'ArrowDown' : 
        spaceship.style.top = parseInt(spaceship.style.top) + moveBy + 'px'
        console.log(spaceship.offsetTop);
        break
    }
    console.log(e.key)
})