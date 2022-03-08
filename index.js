const btn = document.getElementById('burn');
const btn2 = document.getElementById('burn2');

var bgMusic;

window.addEventListener("pageshow", function (event) {
    var historyTraversal = event.persisted ||
        (typeof window.performance != "undefined" &&
            window.performance.navigation.type === 2);
    if (historyTraversal) {
        // Handle page restore.
        window.location.reload();
    }
});

const bgFunction = () => {
    alert('This game requires sound');
    window.onload = function () {
        bgMusic = new Audio('./sounds/bgMusic.mp3');
        bgMusic.play();
        bgMusic.loop = true;
        bgMusic.volume = 0.1;
    }
}

bgFunction()

const menuSelect = () => {
    var selectMusic = new Audio('./sounds/select.mp3')
    selectMusic.play();
    selectMusic.volume = 0.8;
}

var clickSound = new Audio('./sounds/decide.mp3')

const userClick = () => {
    clickSound.play();
    clickSound.volume = 1.0;
   setTimeout(() => {
    return window.location.assign("game.html");
   }, 1000)
}

btn.addEventListener('mouseover', menuSelect);
btn2.addEventListener('mouseover', menuSelect);
btn.addEventListener('click', userClick);
btn2.addEventListener('click', userClick);

function btnClickFn(e){
    e.classList.add('btnClick');
}


// const bgSound = () => {
//     bgMusic = new Audio('bgMusic.mp3');
//     bgMusic.play();
//     bgMusic.loop = true;
//     bgMusic.volume = 0.2;
// }


// bgSound()