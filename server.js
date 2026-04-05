const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

/* MongoDB Connection */
mongoose.connect("mongodb://127.0.0.1:27017/placementDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

/* Student Schema */
const studentSchema = new mongoose.Schema({
    name: String,
    department: String,
    company: String,
    salary: Number
});

const Student = mongoose.model("Student", studentSchema);

/* Home Route */
app.get('/', (req, res) => {
    res.send("Student Placement Database Running");
});

/* Optional Route for Browser Testing */
app.get('/addStudent', (req, res) => {
    res.send("Use POST request to add student data");
});

/* Add Student (POST) */
app.post('/addStudent', async (req, res) => {
    try {

        const student = new Student({
            name: req.body.name,
            department: req.body.department,
            company: req.body.company,
            salary: req.body.salary
        });

        await student.save();

        res.send("Student Added Successfully");

    } catch (error) {
        res.send(error);
    }
});

/* Get All Students */
app.get('/students', async (req, res) => {

    const students = await Student.find();

    res.json(students);

});

/* Start Server */
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
