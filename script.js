function updateLengthDisplay(value) {
    document.getElementById('lengthDisplay').textContent = value;
}

function showTooltip(event, message) {
    const tooltip = document.createElement('div');
    tooltip.textContent = message;
    tooltip.style.position = 'absolute';
    tooltip.style.backgroundColor = '#f3cd00';
    tooltip.style.color = 'black';
    tooltip.style.padding = '5px';
    tooltip.style.borderRadius = '5px';
    tooltip.style.fontSize = '12px';
    tooltip.style.zIndex = '1000';
    tooltip.style.transform = 'translate(-50%, -100%)';
    tooltip.style.left = `${event.clientX}px`;
    tooltip.style.top = `${event.clientY}px`;
    document.body.appendChild(tooltip);

    setTimeout(function() {
        document.body.removeChild(tooltip);
    }, 3000);
}

function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = 0;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

function generatePasswords() {
    const length = parseInt(document.getElementById('lengthOption').value);
    const specialChars = document.getElementById('specialCharsOption').checked;
    const numbers = document.getElementById('numbersOption').checked;
    const uppercase = document.getElementById('uppercaseOption').checked;
    const lowercase = document.getElementById('lowercaseOption').checked;
    const excludeChars = document.getElementById('excludeCharsOption').value;
    let quantity = parseInt(document.getElementById('quantityOption').value);

    quantity = Math.min(quantity, 10);

    if (!specialChars && !numbers && !uppercase && !lowercase) {
        alert('Please select at least one option to generate passwords.');
        return;
    }

    let charset = '';
    if (uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (numbers) charset += '0123456789';
    if (specialChars) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    excludeChars.split('').forEach(char => {
        charset = charset.replace(char, '');
    });

    const passwordsContainer = document.getElementById('passwordsContainer');
    passwordsContainer.innerHTML = '';

    for (let i = 0; i < quantity; i++) {
        let password = '';
        for (let j = 0; j < length; j++) {
            password += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        const passwordInput = document.createElement('input');
        passwordInput.type = 'text';
        passwordInput.value = password;
        passwordInput.readOnly = true;
        passwordInput.style.display = 'block';
        passwordInput.style.margin = '0 auto';
        passwordInput.style.textAlign = 'center';
        passwordInput.addEventListener('click', function(event) {
            copyToClipboard(this.value);
            showTooltip(event, 'Senha copiada!');
        });
        passwordsContainer.appendChild(passwordInput);
    }
}

document.getElementById('generatePasswordButton').addEventListener('click', generatePasswords);


//Matrix Effect - The MIT License (MIT)
//Copyright (c) 2024 Ganesh Prasad (https://codepen.io/gnsp/pen/vYBQZJm)
const canvas = document.getElementById('canv');
const ctx = canvas.getContext('2d');

const w = canvas.width = document.body.offsetWidth;
const h = canvas.height = document.body.offsetHeight;
const cols = Math.floor(w / 20) + 1;
const ypos = Array(cols).fill(0);

ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
ctx.fillRect(0, 0, w, h);

function matrix() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = '#3e4e64'; // Cor dourada
  ctx.font = '15pt monospace';

  ypos.forEach((y, ind) => {
    const text = String.fromCharCode(Math.random() * 128);
    const x = ind * 20;
    ctx.fillText(text, x, y);
    if (y > 100 + Math.random() * 10000) ypos[ind] = 0;
    else ypos[ind] = y + 20;
  });
}

setInterval(matrix, 50);

document.addEventListener('DOMContentLoaded', function() {
    var generatePasswordButton = document.getElementById('generatePasswordButton');
    var logo = document.getElementById('siteLogo');

    generatePasswordButton.addEventListener('click', function() {
        logo.classList.add('logo-shine');

        setTimeout(function() {
            logo.classList.remove('logo-shine');
        }, 1000);
    });
});
