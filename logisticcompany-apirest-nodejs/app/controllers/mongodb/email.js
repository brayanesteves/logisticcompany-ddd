const nodemailer   = require("nodemailer");
const asyncHandler = require("express-async-handler");

const sendEmail = asyncHandler(async (data, req, res) => {
    let transporter = nodemailer.createTransport({
        host:"smtp.gmail.com",
        port:587,
        secure:false, // 'True' for 465, 'false' for other port's
        auth: {
            user:process.env.MAIL_ID, // Generated ethernal user
            pass:process.env.MP, // Generated ethernal password
        },
    });

    // Send mail with defined transport object
    let info = await transporter.sendMail({
           from:'"Hey" <articuno@gmail.com>', // Sender Address
             to:data.to,                      // List of receivers
        subject:data.subject,                 // Subject line
           text:data.text,                    // Plain text body
           html:data.html,                    // HTML body
    });
    console.log("Message sent: %s", info.messageId);
    // Message sent: <tugrp@example.com>
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    return res.status(200).json({
        message:"Email sent"
    });            
});

module.exports = { sendEmail };