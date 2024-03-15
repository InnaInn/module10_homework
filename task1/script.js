const button = document.querySelector('.mainButton');
const iconButtonOne = document.querySelector('#icon1');
const iconButtonTwo = document.querySelector('#icon2');


button.addEventListener('click', () => {
    iconButtonOne.classList.toggle('selectedIcon');
    iconButtonTwo.classList.toggle('selectedIcon');
});