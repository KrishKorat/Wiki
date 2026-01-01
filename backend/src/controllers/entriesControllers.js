const Entry = require("../models/Entry");


// GET one entry by title name
exports.getEntry = async(req, res) => {
    try {
        const entry = await Entry.findOne({ title: req.params.title });

        if(!entry) {
            return res.status(404).json({ error: "Entry does not exist"});
        }
        res.json(entry);
    }
    catch(err) {
        res.status(500).json({ error: "Server error" });
    }
}


// GET all entries
exports.getAllEntries = async(req, res) => {
    try {
        const entries = await Entry.find({}, "title");
        res.json(entries);
    }
    catch(err) {
        res.status(500).json({ error: "Server error" });
    }
}


// CREATE new entry
exports.createEntry = async(req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).json({ error: "Title and content are required." });
            }

        const exist = await Entry.findOne({ title });
        if(exist) {
            return res.status(409).json({ error: "Entry already exist" });
        }
        
        const entry = await Entry.create({ title, content });
        res.status(201).json(entry);
    }
    catch(err) {
        res.status(500).json({ error: "Server error" });
    }
}


// UPDATE entry
exports.updateEntry = async(req, res) => {
    try {
        const {content} = req.body;

        const entry = await Entry.findOneAndUpdate(
            { title: req.params.title },
            { content },
            { new: true }
        );

        if(!entry) {
            return res.status(404).json({ error: "Entry does not found" });
        }
        res.json(entry);
    }
    catch(err) {
        res.status(500).json({ error: "Server error" });
    }
}


// RANDOM entry
exports.randomEntry = async(req, res) => {
    try {
        const entries = await Entry.find({});
        if(entries.length === 0) return res.status(400).json({ error: "No entries found" });

        const random = entries[Math.floor(Math.random() * entries.length)];
        res.json(random);
    }
    catch(err) {
        res.status(500).json({ error: "Server error" });
    }
}


// SEARCH entry
exports.searchEntries = async(req, res) => {
    try {
        const q = req.query.q.toLowerCase();

        const entries = await Entry.find({});
        const results = entries.filter(e => e.title.toLowerCase().includes(q));
        res.json(results);
    }
    catch(err) {
        res.status(500).json({ error: "Server error" });
    }
}



// DELETE entry
exports.deleteEntry = async (req, res) => {
    try {
        const entry = await Entry.findOneAndDelete({
            title: req.params.title
        });

        if(!entry) {
            return res.status(404).json({error: "Entry not found"});
        }

        res.json({ message: "Entry deleted successfully" });
    }
    catch(err) {
        res.status(500).json({ error: "Server error" });
    }
}