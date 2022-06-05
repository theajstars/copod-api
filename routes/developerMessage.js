const { app } = require("..");

const Message = require("../models/Messages");

app.post("/developer/send", (req, res) => {
  const { name, email, messageBody } = req.body;
  console.log(req.body);
  const newMessage = new Message({
    name: name,
    email: email,
    message: messageBody,
  });

  newMessage.save((err) => {
    if (err) {
      console.log(err);
      res.json({
        success: false,
      });
    } else {
      res.json({
        success: true,
      });
    }
  });
});
