require("dotenv").config();

const express = require('express');
const app = express();

//body parsing middleware
app.use(express.json());

let notes = [
{id : 1, title: 'First Page', completed: false},
{id : 2, title: 'Second Page', completed: false},
{id : 3, title: 'Third Page', completed: false},
]


// RETRIEVE all notes
app.get('/notes', (req, res) => {
  res.status(200).json(notes); 
});


// Create all notes
app.post('/notes', (req, res) => {
  const newNote = { id: notes.length + 1, ...req.body };
  notes.push(newNote);
  res.status(201).json(newNote); // Echo back
});

const PORT = process.env.PORT





app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})


