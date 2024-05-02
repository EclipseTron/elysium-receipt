window.onload = function() {
    document.getElementById("download").disabled = true;
    document.getElementById("confirm-data").addEventListener("change", function() {
        document.getElementById("download").disabled = !this.checked;
    });

    document.getElementById("download").addEventListener("click", () => {
        const invoice = this.document.getElementById("invoice");
        console.log(invoice);
        console.log(window);
        var opt = {
            margin: 1,
            filename: 'BTTC_invoice.pdf',
            image: {
                type: 'jpeg',
                quality: 0.98
            },
            html2canvas: {
                scale: 2
            },
            jsPDF: {
                unit: 'in',
                format: 'letter',
                orientation: 'portrait'
            }
        };
        html2pdf().from(invoice).set(opt).save();
    });
}