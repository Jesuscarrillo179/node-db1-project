const router = require('express').Router()
const db = require('./accountsDb')

router.get("/", (req, res) => {
    db.get()
    .then(accounts => {
        res.status(200).json({ data: accounts })
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ message:"Server Error." })
    })
})

router.get("/:id", (req, res) => {
    const id = req.params.id
    db.getById(id)
    .then(accounts => {
        res.status(200).json({ data: accounts })
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ message:"Server Error." })
    })
})

router.post("/", (req, res) => {
    const newAccount = req.body
    db.insert(newAccount)
    .then(account => {
        res.status(200).json({ data: account })
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ message:"Server Error." })
    })  
})

router.put("/:id", (req, res) => {
    const changes = req.body
    const id = req.params.id

    db.update(id, changes)
    .then(update => {
        if(update){
            res.status(200).json({ message: "updated."})
        } else {
            res.status(200).json({ message: "account not found."})
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ message:"Server Error." })
    })
})

router.delete("/:id", (req, res) => {
    const id = req.params.id
    db.remove(id)
    .then(deleted => {
        if(deleted){
            res.status(200).json({ message: "succesfully deleted."})
        } else {
            res.status(404).json({ message: "account not found."})
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ message:"Server Error." })
    })
})



module.exports = router;