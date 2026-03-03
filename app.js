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
  return res.status(200).json(notes); 
});

app.get('/notes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const note = notes.find((n) => n.id === id);

if (!note) {
  return res.status(404).json({ message: 'Note not found' });
}

res.status(202).json();

});


// Create notes
app.post('/notes', (req, res) => {
  const title = req.body?.title;

if (typeof title !== "string" || title.trim() === "") {
  return res.status(400).json({ error: "title is required" });
}

  const newNote = { id: notes.length + 1, ...req.body };
  notes.push(newNote);
  res.status(201).json(newNote); // Echo back
});

const PORT = process.env.PORT





app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})


