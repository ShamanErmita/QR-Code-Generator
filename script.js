const wrapper = document.querySelector(".wrapper"),
qrTypeSelect = document.querySelector("#qrType"),
qrInput = wrapper.querySelector(".form input"),
generateBtn = wrapper.querySelector(".form button"),
qrImg = wrapper.querySelector(".qr-code img");
let preValue;

generateBtn.addEventListener("click", () => {
    let qrValue = qrInput.value.trim();
    let qrType = qrTypeSelect.value;

    if (!qrValue || preValue === qrValue) return;

    preValue = qrValue;
    generateBtn.innerText = "Generating QR Code...";

    let apiUrl;
    switch (qrType) {
        case "url":
            apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrValue)}`;
            break;
        case "text":
            apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=text:${encodeURIComponent(qrValue)}`;
            break;
        case "email":
            apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=mailto:${encodeURIComponent(qrValue)}`;
            break;
        case "phone":
            apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=tel:${encodeURIComponent(qrValue)}`;
            break;
        default:
            break;
    }

    qrImg.src = apiUrl;

    qrImg.addEventListener("load", () => {
        wrapper.classList.add("active");
        generateBtn.innerText = "Generate QR Code";
    });
});


qrInput.addEventListener("keyup", () => {
    if(!qrInput.value.trim()) {
        wrapper.classList.remove("active");
        preValue = "";
    }
});

qrTypeSelect.addEventListener("change", () => {
    preValue = "";
  });
