// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract InvoiceContract {
    address constant paymentChecker = 0xafd529f70915776a7ac066a546b2e664026ea9f2;

    struct Invoice {
        address sender;
        address receiver;
        uint amount;
        bool paid;
    }

    mapping(bytes32 => Invoice) public invoices;

    event InvoiceCreated(bytes32 indexed invoiceId, address indexed sender, address indexed receiver, uint amount);
    event InvoicePaid(bytes32 indexed invoiceId);
    event InvoiceStatusUpdated(bytes32 indexed invoiceId, bool paid);

    function createInvoice(bytes32 invoiceId, address receiver, uint amount) external {
        require(msg.sender != receiver, "Sender and receiver must be different");
        invoices[invoiceId] = Invoice(msg.sender, receiver, amount, false);
        emit InvoiceCreated(invoiceId, msg.sender, receiver, amount);
    }

    function payInvoice(bytes32 invoiceId) external payable {
        Invoice storage invoice = invoices[invoiceId];
        require(!invoice.paid, "Invoice already paid");
        require(msg.sender == invoice.receiver, "Only the receiver can pay the invoice");
        require(msg.value == invoice.amount, "Incorrect payment amount");

        payable(invoice.sender).transfer(msg.value);
        invoice.paid = true;
        emit InvoicePaid(invoiceId);
        emit InvoiceStatusUpdated(invoiceId, true);
    }

    function getInvoiceStatus(bytes32 invoiceId) external view returns (bool) {
        return invoices[invoiceId].paid;
    }

    function checkPaymentStatus(bytes32 invoiceId) external view returns (bool) {
        require(msg.sender == paymentChecker, "Unauthorized access");
        return invoices[invoiceId].paid;
    }
}
