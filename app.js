const express = require('express');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('สวัสดี');
});

app.get('/api/items', (req, res) => {
    res.json([{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }]);
});

app.post('/api/items', (req, res) => {
    const newItem = req.body;
    res.status(201).json(newItem);
});

let students = [
    { id: 1, name: 'John Doe', student_id: 'S001', branch: 'CSE', year: '3' },
    { id: 2, name: 'Jane Smith', student_id: 'S002', branch: 'ECE', year: '2' }
];

// Get all students
app.get('/api/students', (req, res) => {
    res.json(students);
});

// Get a student by ID
app.get('/api/students/:id', (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    if (!student) return res.status(404).send('Student not found');
    res.json(student);
});

// Create a new student
app.post('/api/students', (req, res) => {
    const newStudent = {
        id: students.length + 1,
        name: req.body.name,
        student_id: req.body.student_id,
        branch: req.body.branch,
        year: req.body.year
    };
    students.push(newStudent);
    res.status(201).json(newStudent);
});

// Update a student by ID
app.put('/api/students/:id', (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id));
    if (!student) return res.status(404).send('Student not found');

    student.name = req.body.name;
    student.student_id = req.body.student_id;
    student.branch = req.body.branch;
    student.year = req.body.year;

    res.json(student);
});

// Delete a student by ID
app.delete('/api/students/:id', (req, res) => {
    const studentIndex = students.findIndex(s => s.id === parseInt(req.params.id));
    if (studentIndex === -1) return res.status(404).send('Student not found');

    const deletedStudent = students.splice(studentIndex, 1);
    res.json(deletedStudent);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});