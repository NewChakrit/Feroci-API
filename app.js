require("dotenv").config();
require("./config/passport");
const express = require("express");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const eventRoute = require("./routes/eventRoute");
const performanceRoute = require("./routes/performanceRoute");
const auditionRoute = require("./routes/auditionRoute");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", userRoute);
app.use("/event", eventRoute);
app.use("/performance", performanceRoute);
app.use("/audition", auditionRoute);

app.use((req, res) => {
  res.status(404).json({ message: "resourse not found on this server" });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: err.message });
});

const port = process.env.PORT || 8001;
app.listen(port, () => console.log(`running on port ${port}`));
