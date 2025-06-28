window.onload = function () {
    setTimeout(function () {
        // document.getElementById('welcome').style.display = 'none';
        document.body.removeChild(document.getElementById('welcome'));
        document.getElementById('main-content').style.display = 'block';
        typeWriter();
    }, 2000); // Match the animation duration (3s)
};

let audioAllowed = false;
window.addEventListener('click', () => {
    audioAllowed = true;
    setTimeout(function () {
        playMelody();
        document.getElementById("popup").style.display = "flex";
        setTimeout(function () {
            document.getElementById("popup").style.display = "none";
        }, 5000)
    }, 1000)
}, { once: true }); // only run once

function playMelody() {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [440, 660, 880]; // A4, E5, A5

    notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.frequency.value = freq;
        osc.type = 'sine';

        osc.connect(gain);
        gain.connect(ctx.destination);

        const time = ctx.currentTime + i * 0.2;
        gain.gain.setValueAtTime(0.2, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.15);

        osc.start(time);
        osc.stop(time + 0.2);
    });
}

function openProjectWithWarning(url) {
    const popup = document.getElementById('warningPopup');
    popup.style.display = 'flex';

    setTimeout(() => {
        window.location.href = url;
    }, 3000); // Wait 3 seconds before redirecting
}

const box = document.querySelector('.intro');
box.addEventListener('animationend', () => {
    setTimeout(() => {
        box.classList.remove('intro');
        box.classList.add('intro1');
    }, 500);
});
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    // Adjust rotation based on scroll position
    document.getElementById('background-sqr').style.transform = `rotate(${scrollY * 0.1 + 45}deg)`;

});
function showsidebar() {
    const sidebar = document.querySelector('.sideBar');
    sidebar.style.display = 'flex';
    document.getElementById('switch').style.zIndex = -1;

}
function closesidebar() {
    const sidebar = document.querySelector('.sideBar');
    sidebar.style.display = 'none';
    document.getElementById('switch').style.zIndex = 3;

}
const texts = [
    "Muhammed Niyad",
    "MERN Stack Developer",
    "Full Stack Developer",
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


const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
const switchinput = document.getElementById("switchinput");



mediaQuery.addEventListener('change', (e) => {
    if (e.matches) {
        console.log('🔄 Switched to dark mode');
        switchinput.checked = true;
        localStorage.setItem('checkboxState', switchinput.checked);
        theme();
    } else {
        console.log('🔄 Switched to light mode');
        switchinput.checked = false;
        localStorage.setItem('checkboxState', switchinput.checked);
        theme();
    }
});


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

if (mediaQuery.matches) {
    switchinput.checked = true;
    theme();
} else {
    switchinput.checked = false;
    theme();
}

function theme() {
    let body = document.body;
    let next = document.querySelector("#next");
    let prev = document.querySelector("#prev");
    let typer = document.querySelector('.typer')
    let sidebar = document.querySelector('.sideBar');
    if (switchinput.checked) {
        body.classList.add('blackbody');
        next.classList.add("text-whi");
        prev.classList.add("text-whi");
        typer.classList.remove("text-black");
        typer.classList.add("blacktyper");
        sidebar.classList.add('sideBar-blck');
    }
    else {
        body.classList.remove('blackbody');
        next.classList.remove("text-whi");
        prev.classList.remove("text-whi");
        typer.classList.remove("blacktyper");
        typer.classList.add("text-black");
        sidebar.classList.remove('sideBar-blck');
    }
}

document.querySelector('body').classList.remove('system-mode');


const totop = document.querySelector(".to-top");
window.addEventListener("scroll", () => {
    if (window.pageYOffset > 100) {
        totop.classList.add("active");
    } else {
        totop.classList.remove("active");
    }
})
function scrollToTop(event) {
    event.preventDefault(); // Prevent default link behavior
    window.scrollTo({ top: 0, behavior: "smooth" }); // Smooth scrolling
}

let cta = document.querySelector('#cta-checkbox');
let ctaLabel = document.querySelector('#cta-label');
let ctaTxt = document.querySelector('#cta-txt');
let gDown = document.querySelector('#graph-down');
let gUp = document.querySelector('#graph-up');
cta.addEventListener('change', () => {
    if (cta.checked) {
        ctaLabel.classList.add('flexdir-row')
        ctaTxt.innerText = 'With Me';
        gUp.classList.remove('d-none')
        gDown.classList.add('d-none')
        ctaTxt.classList.add('animetxt-left')
        ctaTxt.classList.remove('animetxt-right')
    } else {
        ctaTxt.innerText = 'With Out Me';
        gUp.classList.add('d-none')
        gDown.classList.remove('d-none')
        ctaLabel.classList.remove('flexdir-row')
        ctaTxt.classList.add('animetxt-right')
        ctaTxt.classList.remove('animetxt-left')

    }
})