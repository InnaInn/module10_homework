const button = document.querySelector('.mainButton');

button.addEventListener('click', () => {
    alert(`Your size screen: ${window.screen.width} x ${window.screen.height}`)
})