function getTransactions() {
    const address = document.getElementById('addressInput').value;
    const apiUrl = `https://api.bttcscan.com/api?module=account&action=txlist&address=${address}&startblock=1&endblock=99999999&sort=asc&apikey=YourApiKeyToken`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.status === '1') {
                displayTransactions(data.result);
            } else {
                alert('Error fetching transactions');
            }
        })
        .catch(error => {
            console.error('Error fetching transactions:', error);
            alert('Error fetching transactions');
        });
}

function displayTransactions(transactions) {
    const transactionListDiv = document.getElementById('transactionList');
    transactionListDiv.innerHTML = '';

    if (transactions.length === 0) {
        transactionListDiv.textContent = 'No transactions found.';
        return;
    }

    const select = document.createElement('select');
    select.addEventListener('change', function() {
        const selectedTxHash = this.value;
        const selectedTransaction = transactions.find(transaction => transaction.hash === selectedTxHash);
        if (selectedTransaction) {
            displayTransactionDetails(selectedTransaction);
        }
    });

    transactions.forEach(transaction => {
        const option = document.createElement('option');
        option.value = transaction.hash;
        option.textContent = transaction.hash;
        select.appendChild(option);
    });

    transactionListDiv.appendChild(select);
}

function displayTransactionDetails(transaction) {
    const transactionListDiv = document.getElementById('transactionList');
    transactionListDiv.innerHTML = '';

    const detailsList = document.createElement('ul');

    for (const key in transaction) {
        if (transaction.hasOwnProperty(key)) {
            const listItem = document.createElement('li');
            listItem.textContent = `${key}: ${transaction[key]}`;
            detailsList.appendChild(listItem);
        }
    }

    transactionListDiv.appendChild(detailsList);
}


function displayTransactionDetails(transaction) {
    const transactionListDiv = document.getElementById('transactionList');
    transactionListDiv.innerHTML = '';

    const detailsList = document.createElement('ul');

    const keysToShow = ['blockNumber', 'timeStamp', 'hash', 'blockHash', 'from', 'to', 'value', 'gas', 'gasPrice', 'isError', 'txreceipt_status', 'confirmations'];

    keysToShow.forEach(key => {
        if (transaction.hasOwnProperty(key)) {
            if (key === 'from') {
                document.getElementById('user-address').value = transaction[key];
            } else if (key === 'to') {
                document.getElementById('receiver-address').value = transaction[key];
            } else if (key === 'timeStamp') {
                const transactionDate = new Date(parseInt(transaction[key]) * 1000);
                document.getElementById('transaction-date').textContent = transactionDate.toLocaleString();

            } else if (key === 'value') {
                const valueInBTT = parseFloat(transaction[key]) / 1e18;
                document.getElementById('transaction-value').textContent = valueInBTT.toLocaleString() + " BTT";
            } else {
                const listItem = document.createElement('li');
                listItem.textContent = `${key}: ${transaction[key]}`;
                detailsList.appendChild(listItem);
            }
        }
    });

    transactionListDiv.appendChild(detailsList);

    const invoiceFrom = document.getElementById('user-address').value;
    const invoiceTo = document.getElementById('receiver-address').value;
    const txnHash = transaction['hash'];
    const metamaskAddress = document.getElementById('name').value;

    const lastTwoDigits = {
        invoiceFrom: invoiceFrom.substring(invoiceFrom.length - 2),
        invoiceTo: invoiceTo.substring(invoiceTo.length - 2),
        txnHash: txnHash.substring(txnHash.length - 2),
        metamaskAddress: metamaskAddress.substring(metamaskAddress.length - 2)
    };

    const upgradedInvoiceNumber = `${lastTwoDigits.invoiceFrom}${lastTwoDigits.invoiceTo}${lastTwoDigits.txnHash}${lastTwoDigits.metamaskAddress}`;

    document.getElementById('invoice-number').textContent = upgradedInvoiceNumber;

}