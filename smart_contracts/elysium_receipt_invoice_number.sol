// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract InvoiceNumberStorage {
    mapping(bytes32 => bool) public invoiceNumbers;

    event InvoiceNumberStored(bytes32 indexed invoiceNumber);

    function storeInvoiceNumber(bytes32 invoiceNumber) external {
        require(!invoiceNumbers[invoiceNumber], "Invoice number already stored");
        invoiceNumbers[invoiceNumber] = true;
        emit InvoiceNumberStored(invoiceNumber);
    }
}
