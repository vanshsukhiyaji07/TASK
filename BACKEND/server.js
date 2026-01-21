const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const taskRoutes = require("./Routes/TaskRoutes")

const app = express()
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/taskTracker").then(()=> console.log("mongodb conneted....")).catch((err)=> console.log("mongodb is not connected", err.message));


app.use("/api/tasks", taskRoutes);

app.get("/", (req,res)=>{
    res.send("taskTracker Backend")
})

app.listen(5000 , ()=> console.log("server started on port 5000"))