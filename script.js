const character = $('#character')
const block = $('#block')
const game = $('#game')
const menu = $('#menu')

let gameOver = false
let score = 0
let highScore = (localStorage.getItem('highscore')) ? localStorage.getItem('highscore') : 0

$('html').on('mousedown', jump)

function jump () {
    if (character.hasClass('jump') == false && gameOver == 0) {
        character.addClass('jump')
        setTimeout(()=> {
            character.removeClass('jump')
        }, 800)
    }
}

const scoreInterval = setInterval(() => {
    if (gameOver == false && document.hasFocus()) {
        score++
        character.text(score)
    }
}, 2000);

$('.restart-btn').on('click', ()=> {
    window.location.reload()
})

let checkCollide = setInterval(() => {
    let blockPosX = parseInt(block.css('left'))
    let blockHeight = parseInt(block.css('height'))
    let characterPosX = parseInt(character.css('left'))
    let characterPosY = parseInt(character.css('bottom'))
    
    if (blockPosX <= characterPosX && blockPosX > characterPosX - 100 && characterPosY <= blockHeight) {
        block.css('animation-play-state', 'paused')
        gameOver = true
        $('.score').text('Score: ' + score)
        if (score > highScore) {
            highScore = score;
            localStorage.setItem('highscore', highScore)
        }
        $('.highscore').text('Highscore: ' + highScore)
        menu.css('display', 'block') 
    }
}, 10);
