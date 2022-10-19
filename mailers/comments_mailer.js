//first import nodemailer to send emails.
const nodemailer = require("../config/nodemailer");
//this is another way of exporting a method
//we are doing this instead of module.exports.newComment
exports.newComment = (comment) =>{
    console.log("Inside newComment mailer");
    console.log(comment);
    let htmlString = nodemailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs');
    //sendmail is a predefined function
    nodemailer.transporter.sendMail({
    from: 'learn.ksumit@gmail.com', // sender address
    to: comment.user.email, // list of receivers
    subject: "New Comment Published", // Subject line
    text: "New Comment Published", // plain text body
    html:htmlString, // html template
    }, (err, info)=>{
        //this is the callback function
        // err is simply error
        //info is the info about the request being sent
        if(err){
            console.log("Error in sending mail", err);
            return;
        }
        console.log('Message sent', info);
        return;
    })
}