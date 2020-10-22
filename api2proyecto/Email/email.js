var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'edsonguix@gmail.com',
        pass: 'Armandogui2010302'
    }
});

function mail(email,nombre){
    var mailOptions = {
        from: 'edsonguix@gmail.com',
        to: email,
        subject: 'Verificacion de Cuenta',
        html: `
    <div style=" border: 5px outset red; background-color: lightblue; text-align: center;">
        <strong>Verificacion de Cuenta</strong><br/>
         CLick en el siguiente link para validar la cuenta de ${nombre}<br/>
         <strong>Link:</strong> http://192.168.0.35:3031/Validate/${nombre}
    </div>
     `
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
module.exports = {mail:mail};
