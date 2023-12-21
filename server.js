const express = require("express")
const mongodb = require("mongodb")
const mongoose = require("mongoose");


const uri = "mongodb://localhost:27017"

const Student = require('./models/studentModel');

const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.get("", (req,res)=>{
    res.send({msg: "Olá!"})
})

//GET ALL STUDENTS
app.get("/student/:id", async (req, res) => {
    try{
        const {id}  = req.params;
        const student = await Student.findById(id);
        res.send(student)

    }
    catch(err){
        console.log(err);
    }

})

app.get("/")



app.post("/add-student", async (req, res) => {
    try {
        const { number, class: className, name } = req.body;

        if (!number || !className || !name) {
            return res.status(400).send({ error: "Please provide valid values for number, class, and name." });
        }

        const newStu = await Student.create(req.body);
        res.send(newStu);
    } catch (err) {
           if (err.name === 'ValidationError') {
            // Handle validation errors
            const validationErrors = Object.values(err.errors).map(error => error.message);
            return res.status(400).send({ error: validationErrors });
        }
        console.log(err);
        res.status(500).send({ error: "Internal Server Error" });
    }
});

// update the student info replace 
app.put('/student-change/:id',async (req, res)=>{

    try{
    let {id}=req.params
      const studnetToUpdate = await Student.findByIdAndUpdate(id,req.body,{new: true})
       
       if(!studnetToUpdate){
        res.status(404).send({msg: 'user not  found'})
       }
    res.status(200).send(studnetToUpdate)
  
    }catch(err){
        console.log(err);
    }
  
    

    
  
})

app.delete("/delete-student/:id", async (req,res)=>{
     try {
        const {id} = req.params
        const student = await Student.findByIdAndDelete(id)
        if(!student){
            return res.status(404).send({ msg:"Student does not exist!" })
        }

        res.status(200).send(student)
        
     } catch (error) {
        console.log(error);
     }
})

app.get('/all-students', async(req,res)=>{
    try {
    const allStudents = await  Student.find()
    console.log(allStudents);
    if(allStudents.length === 0){
        return res.status(404).send({msg: 'no students found'})
    }
        res.status(200).send(allStudents)
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "Internal Server Error" });
        
    }
})

mongoose.set("strictQuery",false)

mongoose.connect(uri).then(() => {
    app.listen(3002, ()=>{
    console.log("app is running on ",3002);
})
  console.log(" connected to mongoDB")
}).catch((err) => {
    console.log(err);
    
});