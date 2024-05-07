const terminal = document.getElementById('terminal');
let commandHistory = [];

function executeCommand(command) {
    const outputLine = document.createElement('div');
    outputLine.classList.add('input-line');

    const prompt = document.createElement('span');
    prompt.classList.add('prompt');
    prompt.textContent = 'Portfolio';

    const arrow = document.createElement('span');
    arrow.classList.add('arrow');
    arrow.textContent = '↪';

    const commandSpan = document.createElement('span');
    commandSpan.classList.add('input');
    commandSpan.textContent = command;

    outputLine.appendChild(prompt);
    outputLine.appendChild(arrow);
    outputLine.appendChild(commandSpan);
    terminal.insertBefore(outputLine, terminal.firstChild);
    commandHistory.unshift(command);

    // Envoi de la commande au serveur
    fetch('/execute-command', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ command: command })
    })
    .then(response => response.json())
    .then(data => {
        const outputLine = document.createElement('div');
        outputLine.textContent = data.result;
        terminal.insertBefore(outputLine, terminal.firstChild);
        terminal.scrollTop = 0;
    })
    .catch(error => {
        console.error('Erreur lors de l\'envoi de la commande au serveur:', error);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const inputLine = document.createElement('div');
    inputLine.classList.add('input-line');

    const prompt = document.createElement('span');
    prompt.classList.add('prompt');
    prompt.textContent = 'Portfolio';

    const arrow = document.createElement('span');
    arrow.classList.add('arrow');
    arrow.textContent = '↪';

    const input = document.createElement('input');
    input.classList.add('input');

    inputLine.appendChild(prompt);
    inputLine.appendChild(arrow);
    inputLine.appendChild(input);
    terminal.appendChild(inputLine);
    input.focus();

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            executeCommand(input.value);
            input.value = '';
            input.scrollIntoView(false);
        }
    });
});

window.addEventListener('load', function() {
    var PP = document.querySelector('.PP');
    var width = PP.offsetWidth;
    PP.style.height = width + 'px';
});
