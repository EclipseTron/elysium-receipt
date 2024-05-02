const nameInput = document.getElementById('name');
if (typeof window.ethereum !== 'undefined') {
    ethereum
        .request({
            method: 'eth_requestAccounts'
        })
        .then((acc) => {
            accounts = acc;
            if (accounts.length > 0) {
                nameInput.value = accounts[0];
                nameInput.disabled = true;
            } else {
                nameInput.placeholder = 'Connect Metamask to see your address';
            }
        })
        .catch((error) => {
            console.error(error);
        });
} else {
    nameInput.placeholder = 'Metamask not detected';
}


const sentForm = document.getElementById('sent-form');
const sentCheckbox = document.getElementById('invoice-payment');

let accounts = [];

if (typeof window.ethereum !== 'undefined') {
    ethereum
        .request({
            method: 'eth_requestAccounts'
        })
        .then((acc) => {
            accounts = acc;
        })
        .catch((error) => {
            console.error(error);
        });
}

sentCheckbox.addEventListener('change', () => {
    if (sentCheckbox.checked) {
        const sentAmount = 100;
        if (typeof window.ethereum !== 'undefined') {
            ethereum
                .request({
                    method: 'eth_sendTransaction',
                    params: [{
                        from: accounts[0],
                        to: '0xafd529f70915776a7ac066a546b2e664026ea9f2',
                        value: `0x${(sentAmount * 10000000000000000).toString(16)}`,
                        chainId: '0xc7'
                    }]
                })
                .then((txHash) => {
                    console.log(txHash);
                    sentCheckbox.checked = true;
                })
                .catch((error) => {
                    console.error(error);
                    sentCheckbox.checked = false;
                });
        }
    } else {
        sentCheckbox.checked = false;
    }
});

const userAddressElement = document.getElementById('user-address');

if (typeof window.ethereum !== 'undefined') {
    ethereum
        .request({
            method: 'eth_requestAccounts'
        })
        .then((acc) => {
            accounts = acc;
            if (accounts.length > 0) {
                userAddressElement.textContent = `Your Metamask Address: ${accounts[0]}`;
            } else {
                userAddressElement.textContent = 'Connect Metamask to see your address';
            }
        })
        .catch((error) => {
            console.error(error);
        });
} else {
    userAddressElement.textContent = 'Metamask not detected';
}