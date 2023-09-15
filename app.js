const express = require('express');
const mongoose = require('./db'); // Import the MongoDB connection
const { body, validationResult } = require('express-validator');

const app = express();

app.use(express.json());

const Person = require('./models/person'); // Import the Person model

// Create a new Person
app.post('/api/people', [
  body('name').isString(),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  Person.create(req.body)
    .then(person => {
      res.status(201).json(person);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    });
});

// Get all People
app.get('/api/people', (req, res) => {
  Person.find({})
    .then(people => {
      res.json(people);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    });
});

// Get a single Person by ID
app.get('/api/people/:id', (req, res) => {
  Person.findById(req.params.id)
    .then(person => {
      if (!person) {
        return res.status(404).json({ error: 'Person not found' });
      }
      res.json(person);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    });
});

// Update a Person by ID
app.put('/api/people/:id', (req, res) => {
  Person.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(person => {
      if (!person) {
        return res.status(404).json({ error: 'Person not found' });
      }
      res.json(person);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    });
});

// Delete a Person by ID
app.delete('/api/people/:id', (req, res) => {
  Person.findByIdAndRemove(req.params.id)
    .then(person => {
      if (!person) {
        return res.status(404).json({ error: 'Person not found' });
      }
      res.json(person);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
