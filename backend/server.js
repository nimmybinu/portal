const app = require("./app");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
//config
dotenv.config({ path: "backend/config/config.env" });

//db connection
connectDB();


const server = app.listen(process.env.PORT, () => {
    console.log(`server is running on http://localhost:${process.env.PORT}`);
});

