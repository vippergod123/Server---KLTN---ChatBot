const express = require("express")
const router = express.Router()

// respond function 
const respondFunction = require('../../function/respondFunction');

const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'duytruong7297@gmail.com',
    pass: 'vippergod12'
  }
});

var mailOptions = {
  from: "duytruong7297@gmail.com",
  to: "stsv.hcmus@gmail.com",
  subject: "",
  html:"",
};

const status_code = { 
    error: "error",
    success:"success"
}


function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}


router.post("/", (req,res,next) => { 

    const mail = req.body

    console.log(mail);
    
    const html =    '<h2>Mail from: {0} - {1}</h2>'.format(mail.name, mail.from) +
                    '<h4>{0}</h4>'.format(mail.content) 


    mailOptions.subject = '[HCMUS - Sổ tay sinh viên] - {0}'.format(mail.subject)
    mailOptions.html = html 
    
    console.log(mailOptions);

    if ( validateEmail(mailOptions.from) && mailOptions.subject) {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) 
                respondFunction.errorStatus(res,status_code.error,"send mail",error,500)
            else 
                respondFunction.successStatus(res,status_code.success,"send mail", info.response)
        });
    }
    else { 
        respondFunction.errorStatus(res,status_code.error,"send mail","Email hoặc tiêu đề không hợp lệ",400)
    }
})


module.exports = router;