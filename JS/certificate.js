let col = document.querySelectorAll('.col');
let index = 2;
col.forEach(element => {
    let span = document.createElement('span');
    span.textContent = index + '.';
    span.classList.add('index-c');
    element.prepend(span);
    index++;
});
