const form = document.getElementById('generate-form');
const qr = document.getElementById('qrcode');

const onGenerateSubmit = (e) => {
    e.preventDefault();

    clearUI();

    const url = document.getElementById('url').value;
    const size = document.getElementById('size').value;
    const color = document.getElementById('color').value;

    if (url === '') {
        alert('Please enter the URL');
    }
    else {
        showSpinner();
        setTimeout(() => {
            hideSpinner();
            if (color && color.length > 0) {
                // generateQRCodeWithColor(url, size, color);
                generateQRCode(url, size, color);
            }
            else {
                generateQRCode(url, size);
            }
            setTimeout(() => {
                const saveUrl = qr.querySelector('img').src;
                createSaveBtn(saveUrl);
            }, 50);
        }, 1000);
    }
}

const generateQRCode = (url, size, color = null) => {
    const qrcodeOptions = {
        text: url,
        width: size,
        height: size,
    }

    if(color){
        qrcodeOptions.colorDark = color
    }

    const qrcode = new QRCode("qrcode", qrcodeOptions);
}

// const generateQRCodeWithColor = (url, size, color) => {
//     const qrcode = new QRCode("qrcode", {
//         text: url,
//         width: size,
//         height: size,
//         colorDark: color,
//     });
// }

const createSaveBtn = (saveUrl) => {
    const link = document.createElement('a');
    link.id = "save-link";
    link.classList = "bg-gray-600 w-1/3 rounded py-2 my-5 text-white m-auto hover:bg-black";
    link.href = saveUrl;
    link.innerHTML = "Save Image";
    link.download = "qrcode.png";

    document.getElementById('generated').appendChild(link);
}

const clearUI = () => {
    qr.innerHTML = '';
    const saveLink = document.getElementById('save-link');
    if (saveLink) {
        saveLink.remove();
    }
}

const showSpinner = () => {
    document.getElementById('spinner').style.display = 'block';
}

const hideSpinner = () => {
    document.getElementById('spinner').style.display = 'none';
}

hideSpinner();

form.addEventListener('submit', onGenerateSubmit);