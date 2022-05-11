const express = require("express");
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');



//Route 1: Get all notes using POST "api/notes/fetchallnotes". Login required
router.post('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error ocured");
    }

})


//Route 0: Get all notes using POST "api/notes/fetchallnotes". Login required
router.post('/fetchallnews', async (req, res) => {
    try {
        const notes = await Note.find({ __v: 1})
        res.json(notes)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error ocured");
    }

})

//Route 2: add new notes using POST "api/notes/addnote". Login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 charcter.').isLength({ min: 5 }),
], async (req, res) => {
    try {



        const { title, description, tag } = req.body;


        // If there are errors , return and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title, description, tag, user: req.user.id

        })
        const savedNote = await note.save()
        res.json(savedNote)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error ocured");
    }
})

//Route 3: Update notes using PUT "api/notes/updatenote". Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {

        const { title, description, tag } = req.body;

        // create a newnote object
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // find the note to be updated
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not found")
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error ocured");
    }
})

//Route 4: Delete notes using DELETE "api/notes/deletenote". Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        

        // find the note to be deteled and delete it
        let note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not found")
        }

        // Allowed  deletion only if user owns this note   
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted ", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error ocured");
    }
})

module.exports = router;