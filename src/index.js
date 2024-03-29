import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import passportSetup from "./config/passport-setup";

//Routes
import authRoutes from "./routes/auth-routes.js";
import macroquietAccountRoutes from "./routes/user/macroquiet-account-routes.js";
import webRoutes from "./routes/user/web-routes.js";
import unityRoutes from "./routes/user/unity-routes.js";
import adminRoutes from "./routes/admin-routes";
import publicRoutes from "./routes/public-routes";

const app = express();
const port = process.env.PORT;

// Set up EJS
app.use(bodyParser.json({ limit: "5mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "5mb",
    extended: true,
    parameterLimit: 5000,
  })
);
app.set("view engine", "ejs");

// Set up CORS
app.use(cors()); //Enable CORS on all routes
app.use(express.json()); //Automatically decode JSON data

/////////////////////////////////////////////////////////////
app.listen(port, () => {
  console.log(`Listening on port ${port} ✅`);
});
//Service status
app.get("/", (req, res) => {
  res.status(200).send("MacroQuiet server - Up and Running ✅");
});
/////////////////////////////////////////////////////////////

app.use("/api/auth", authRoutes);
app.use("/api/users", macroquietAccountRoutes);
app.use("/api/users/profile", webRoutes);
app.use("/api/users/games", unityRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/public", publicRoutes);
