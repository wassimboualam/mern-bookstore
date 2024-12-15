import express, { response } from "express";
import { mongodbUrl, PORT }  from "./config.js";
import mongoose from "mongoose";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";

const app = express();

app.use(express.json());

// test router
app.get("/", (req,res) => {
    console.log(req);
    return res.status(234).send("Hallo niece and nephew, i am uncle rodja")
});


// handle cors policy
// 1- allows all origins with default cors(*)
app.use(cors());
// 2- creates custom origins
// app.use(cors({
//     origin:"http://localhost:5173",
//     methods:["GET","POST","PUT","DELETE"]
// }))


// add router for books
app.use("/books",booksRoute);


mongoose
    .connect(mongodbUrl)
    .then(() => {
        console.log("App connected to database");
        app.listen(PORT, () => {
            console.log("App is listen for:", PORT);
        })
    })
    .catch((err) => {
        console.log(err.message)
    })
    .finally(() => {
        console.log("Connection attempt done");
    })