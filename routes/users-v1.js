//import

const express = require('express')
const router = express.Router()

let usersModel = undefined

// user model initialisation control
router.use((req, res, next) => {
    if (!usersModel) {
        res.status(500).json({ message: 'model not initialised' })
    }
    next()
})

//GET all users
router.get('/', (req, res, next) => {
    res.json(usersModel.getAll())
})

//GET user by id
router.get('/:id', (req, res, next) => {
    const id = req.params.id
    if (id) {
        try {
            const getUsers = usersModel.get(id)
            if (getUsers) {
                res.json(getUsers)
            } else {
                res.status(400).json({ message: 'user not found with id ${id}' })
            }
        } catch (ex) {
            res.status(400).json({ message: ex.message })
        }
    } else {
        res.status(400).json({ message: 'wrong parameter' })
    }

})

// Add a new user
router.post('/', (req, res, next) => {
    const newUser = req.body

    if (newUser) {
        try {
            const user = usersModel.add(newUser)
            req.res.status(201).send(user)
        } catch (ex) {
            res.status(400).json({ message: ex.message })
        }
    } else {
        res.status(400).json({ message: 'wrong parameters' })
    }
})

//Update a user
router.patch('/:id', (req, res, next) => {
    const id = req.params.id
    const userPropertiesUpdated = req.body

    if (id & userPropertiesUpdated) {
        try {
            if (id & userPropertiesUpdated) {
                const updated = usersModel.update(id, userPropertiesUpdated)
                res.status(200).json(updated)
            } else {
                res.status(400).json({ message: 'wrong parameter' })
            }
        } catch (ex) {
            if (ex.message === 'user not found') {
                res.status(400).json({ message: 'user not found with id ${id}' })
            } else if (ex.message === 'user not valid') {
                res.status(400).json({ message: 'invalid user data' })
            }
        }
    } else {
        res.status(400).json({ message: 'wrong parameters' })
    }
})

//Remove a user by id
router.delete('/:id', (req, res, next) => {
    const id = req.params.id
    if (id) {
        try {
            usersModel.remove(id)
            req.res.status(200).end()
        } catch (ex) {
            if (ex.message === 'user not found') {
                res.status(404).json({ message: 'user not found with id ${id}' })
            } else {
                res.status(400).json({ message: ex.message })
            }
        }
    } else {
        res.status(400).json({ message: 'wrong parameter' })
    }
})

// router module export
module.exports = (model) => {
    usersModel = model
    return router
}