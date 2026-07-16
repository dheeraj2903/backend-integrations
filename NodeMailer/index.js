const { sendEmail } = require("./email");

sendEmail(
  "dheerajverma2903@gmail.com",
  "Test Subject",
  "This is test email",
  "<b>This is test email </b> ",
);