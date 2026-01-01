const express = require("express");
const router = express.Router();

const {
    getEntry,
    getAllEntries,
    createEntry,
    updateEntry, 
    randomEntry,
    searchEntries,
    deleteEntry
} = require("../controllers/entriesControllers");

router.get("/", getAllEntries);
router.get("/random", randomEntry);
router.get("/search", searchEntries);
router.get("/:title", getEntry);
router.post("/", createEntry);
router.put("/:title", updateEntry);
router.delete("/:title", deleteEntry);

module.exports = router;