const nodemailer = require("nodemailer");
const ejs = require("ejs");
//here we require ejs to render the template and send template as mails.
const path = require("path");
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587, //587 for TLS connections
  secure: false, //we are not using 2 factor authentication.
  auth: {
    user: "learn.ksumit@gmail.com", //user email address for sending mails
    pass: "S^m1t@gm@il", // generated ethereal password
  },
});

let renderTemplate = (data, relativePath) => {
  let mailHTML;
  ejs.renderFile(
    path.join(__dirname, "../views/mailers", relativePath),
    //relativePath is the place from this function is being called
    data,
    //here data is the context that we pass to the ejs
    function (err, template) {
      //this is the callback
      if (err) {
        console.log("Error in rendering template", err);
        return;
      }
      //if no error
      //assign the template to mailHTML
      mailHTML = template;
    }
  );
  return mailHTML;
};
//finally we export the functions renderTemplate and transporter
module.exports = {
  transporter: transporter,
  renderTemplate: renderTemplate,
};
