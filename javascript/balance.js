const balanceDisplay = document.getElementById('balanceDisplay');

const apiUrl = "https://api.bttcscan.com/api?module=account&action=balance&address=0xafd529f70915776a7ac066a546b2e664026ea9f2&tag=latest&apikey=YourApiKeyToken";

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        if (data.status === '1') {
            const balance = parseFloat(data.result) / 1e18;
            balanceDisplay.textContent = `Balance: ${balance} BTT`;
        } else {
            balanceDisplay.textContent = 'Error fetching balance';
        }
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        balanceDisplay.textContent = 'Error fetching balance';
    });

const conditionCheckbox = document.getElementById('confirm-data');

let initialBalance = 0;

sentCheckbox.addEventListener('change', () => {
    if (sentCheckbox.checked) {
        initialBalance = parseFloat(balanceDisplay.textContent.split(' ')[1]);

        const intervalId = setInterval(() => {
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    if (data.status === '1') {
                        const currentBalance = parseFloat(data.result) / 1e18;
                        if (currentBalance >= initialBalance + 1) {
                            clearInterval(intervalId);
                            conditionCheckbox.disabled = false;
                        }
                    }
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }, 15000);
    } else {
        clearInterval(intervalId);
        conditionCheckbox.disabled = true;
    }
});