const generateToken = () => {
    let token = Math.floor(Math.random()*10000);
    return token;
}

const QRCode = require('qrcode');
const generateQRCode = async (data) => {
    try {
      // Generate QR code
      const qrImage = await QRCode.toDataURL(data);
      return qrImage;
    } catch (error) {
      console.error('Error generating or saving QR code:', error);
      return null;
    }
  };

module.exports = { generateToken,generateQRCode };

//generateQRCode("gdhh").then(res => console.log(res))