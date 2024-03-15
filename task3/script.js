const wsURL = 'wss://echo-ws-service.herokuapp.com';

const response = document.querySelector('.response');
const input = document.querySelector('.inputForm');
const btnSend = document.querySelector('.buttonFormSend');
const btnGeo = document.querySelector('.buttonFormGeo');
const mainChat = document.querySelector('.mainChat');


let webSocket = new WebSocket(wsURL);
webSocket.onopen = function () {
    response.innerHTML = 'Соединение установлено';
}

webSocket.onmessage = function (event) {
    let comeMessage = JSON.parse(event.data);
    if (comeMessage.type === "message") {
        writeAnswer(comeMessage.message);
    }
}

webSocket.onerror = function () {
    response.innerHTML = "При передаче данных произошла ошибка"
};

function writeMessage(message) {
    mainChat.innerHTML += `<div class="containerBlock myMessage"><p>${message}</p></div>`
}

function writeAnswer(answer) {
    mainChat.innerHTML += `<div class="containerBlock serverAnswer"><p>${answer}</p></div>`
}

function sendMessage() {
    const message = input.value;
    writeMessage(message);
    let request = {'type': 'message', 'message': message};
    webSocket.send(JSON.stringify(request));
    input.value = '';
    btnSend.disabled = true;
}

btnSend.addEventListener('click', () => {
    sendMessage();
});

input.addEventListener('keyup', event => {
    if (input.value.length === 0) {
        btnSend.disabled = true;
    } else {
        if (event.key === 'Enter') {
            sendMessage();
        } else {
            btnSend.disabled = false;
        }
    }
});

function locationSuccess(location) {
    const latitude = location.coords.latitude;
    const longitude = location.coords.longitude;

    let request = {'type': 'location', 'latitude': latitude, 'longitude': longitude};
    webSocket.send(JSON.stringify(request));

    let link = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    writeOutput(`<a class="linkLocation" href="${link}" target="_blank">Гео - локация</a>`);
    response.innerHTML = '';
}

function locationError() {
    writeOutput('При получении местоположения произошла ошибка');
    response.innerText = '';
}

function writeOutput(location) {
    mainChat.innerHTML += `<div class="containerBlock myMessage"><p>${location}</p></div>`;
}

btnGeo.addEventListener('click', () => {
    if ('geolocation' in navigator) {
        response.innerText = 'Определение местоположения…';
        navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
    } else {
        writeOutput('Браузер не поддерживает функцию определения местоположения');
    }
});