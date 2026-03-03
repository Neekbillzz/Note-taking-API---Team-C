require("dotenv").config();

const express = require('express');
const app = express();



//body parsing middleware
app.use(express.json());




let notes = [
  {
    id: 1,
    title: 'First Class',
    content: 'Intro to Backend',
    timestamp: '2026-03-07T17:00:00Z',
    version: '1.0'
  },
  {
    id: 2,
    title: 'Second Class',
    content: 'Node js and Express',
    timestamp: '2026-03-14T17:15:00Z',
    version: '1.0'
  },
  {
    id: 3,
    title: 'Third Class',
    content: 'CRUD API',
    timestamp: '2026-03-21T17:30:00Z',
    version: '1.1'
  }
];




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

res.status(202).json(note);
});





// Create notes
app.post('/notes', (req, res) => {
    const { title, content } = req.body;

    // Basic validation
    if (!title || !content) {
        return res.status(400).json({ error: "Title and content are required" });
    }

    const newNote = {
        id: notes.length + 1,
        title: title,
        content: content,
        timestamp: new Date().toISOString(), // Sets the current date and time
        version: "1.0"                        // Starts every new note at version 1.0
    };

    notes.push(newNote);
    res.status(201).json(newNote); 
});







// PATCH Update – Partial
app.patch('/notes/:id', (req, res) => {
  const note = notes.find((n) => n.id === parseInt(req.params.id)); // Array.find()
  if (!note) return res.status(404).json({ message: 'Note not found' });
  Object.assign(note, req.body); // Merge: e.g., {completed: true}
  res.status(200).json(note);
});








// DELETE Remove
app.delete('/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const initialLength = notes.length;
  notes = notes.filter((n) => n.id !== id); // Array.filter() – non-destructive
  if (notes.length === initialLength)
    return res.status(404).json({ error: 'Not found' });
  res.status(204).send(); // Silent success
});






const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})


