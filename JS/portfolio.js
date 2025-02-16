window.onload = function () {
    document.getElementById('main-content').style.display = 'none';
    setTimeout(function () {
        // document.getElementById('welcome').style.display = 'none';
        document.body.removeChild(document.getElementById('welcome'));
        document.getElementById('main-content').style.display = 'block';
        typeWriter();
    }, 3000); // Match the animation duration (3s)
};
const box = document.querySelector('.intro');
box.addEventListener('animationend', () => {
    setTimeout(() => {
        box.classList.remove('intro');
        box.classList.add('intro1');
    }, 500);
});

const texts = [
    "Muhammed Niyad",
    "Web-Developer",
    "Front-end Web Developer",
    "Autodidacts"
]
let textIndex = 0;
let charIndex = 0;

const typer = document.querySelector('.typer');
function typeWriter() {
    if (charIndex < texts[textIndex].length) {
        typer.innerText += texts[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 200);
    } else {
        setTimeout(typerEraser, 1000);
    }
}

function typerEraser() {
    if (typer.innerText.length > 0) {
        typer.innerText = typer.innerText.slice(0, -1);
        setTimeout(typerEraser, 100);
    } else {
        textIndex = (textIndex + 1) % texts.length;
        charIndex = 0;
        setTimeout(typeWriter, 500)
    }
}

let items = document.querySelectorAll(".slider .items");
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let active = 2;
function loadshow() {
    let stt = 0;
    items[active].style.transform = `none`;
    items[active].style.zIndex = '1';
    items[active].style.filter = 'none';
    items[active].style.opacity = 1;
    for (i = active + 1; i < items.length; i++) {
        stt++;
        items[i].style.transform = `translateX(${120 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(-1deg)`;
        items[i].style.zIndex = -stt;
        items[i].style.filter = 'blur(1px)';
        items[i].style.opacity = stt > 2 ? 0 : 0.9;
    }
    stt = 0;
    for (i = active - 1; i >= 0; i--) {
        stt++;
        items[i].style.transform = `translate(${-120 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(1deg)`;
        items[i].style.zIndex = -stt;
        items[i].style.filter = 'blur(1px)';
        items[i].style.opacity = stt > 2 ? 0 : 0.9;
    }
}

loadshow();

next.onclick = function () {
    active = active + 1 < items.length ? active + 1 : active;
    loadshow();
}
prev.onclick = function () {
    active = active - 1 >= 0 ? active - 1 : active;
    loadshow();
}


let act = 1;
function slide(ids) {
    act = ids;
    let slide = document.querySelector(".slide");
    let items = document.querySelectorAll(".itm");

    items.forEach(element => {
        element.style.scale = "1";
        element.classList.remove('blackitm');
        element.classList.add("blur");
    });
    let div = document.getElementById(`id${ids}`);
    switch (ids) {
        case 1:
            slide.style.left = "10%";
            div.style.scale = "1.2";
            div.classList.add('blackitm');
            div.classList.remove("blur");
            break;
        case 2:
            slide.style.left = "-210px";
            div.style.scale = "1.2";
            div.classList.add('blackitm');
            div.classList.remove("blur");
            break;
        case 3:
            slide.style.left = "-500px";
            div.style.scale = "1.2";
            div.classList.add('blackitm');
            div.classList.remove("blur");
            break;
        case 4:
            slide.style.left = "-790px";
            div.style.scale = "1.2";
            div.classList.add('blackitm');
            div.classList.remove("blur");
            break;
        case 5:
            slide.style.left = "-1100px";
            div.style.scale = "1.2";
            div.classList.add('blackitm');
            div.classList.remove("blur");
            break;
        default:
            break;
    }
}

document.querySelector(".slider2").addEventListener("click", (event) => {
    if (event.target == document.querySelector(".slider2")) {
        let items = document.querySelectorAll(".itm");
        items.forEach(element => {
            element.style.scale = "1";
            element.classList.remove('blackitm');
            element.classList.remove("blur");
        });
    }
})

function nextitm() {
    if (act < 5) {
        act++;
        slide(act);
    }
}
function previtm() {
    if (act > 1) {
        act--;
        slide(act);
    }
}

let switchinput = document.getElementById("switchinput");
const savedState = localStorage.getItem('checkboxState');
if (savedState === 'true') {
    switchinput.checked = true;
    theme();
} else {
    switchinput.checked = false;
    theme();
}
switchinput.addEventListener("change", function () {
    localStorage.setItem('checkboxState', switchinput.checked);
    theme();
})


function theme() {
    let body = document.body;
    let logoimg = document.querySelector(".logo");
    let slider = document.querySelector(".slider");
    let next = document.querySelector("#next");
    let prev = document.querySelector("#prev");
    let cvbtn = document.querySelector(".cv")
    let typer = document.querySelector('.typer')
    let githubbtn = document.querySelector('.githubbtn');

    if (switchinput.checked) {
        body.classList.add('blackbody');
        logoimg.classList.add('logoimg');
        slider.classList.add("blackslider");
        next.classList.add("text-whi");
        prev.classList.add("text-whi");
        cvbtn.classList.remove("btn-outline-dark");
        cvbtn.classList.add("btn-outline-info");
        typer.classList.remove("text-black");
        typer.classList.add("blacktyper");
        githubbtn.classList.remove("btn-dark");
        githubbtn.classList.add("btn-info");
    }
    else {
        body.classList.remove('blackbody');
        logoimg.classList.remove('logoimg');
        slider.classList.remove("blackslider");
        next.classList.remove("text-whi");
        prev.classList.remove("text-whi");
        cvbtn.classList.remove("btn-outline-info");
        cvbtn.classList.add("btn-outline-dark");
        typer.classList.remove("blacktyper");
        typer.classList.add("text-black");
        githubbtn.classList.remove("btn-info");
        githubbtn.classList.add("btn-dark");
    }
}

const totop = document.querySelector(".to-top");
window.addEventListener("scroll", () => {
    if (window.pageYOffset > 100) {
        totop.classList.add("active");
    } else {
        totop.classList.remove("active");
    }
})