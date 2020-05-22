//uuid module import
const uuidv1 = require('uuid');

//user model 
const users = [{
    name: 'Marius Katou',
    login: 'maro',
    age: 18
}, {
    id: '456897d-98a8-78d8-4565-2d42b21b1a3e',
    name: 'Rodrigue Katou',
    login: 'drigo',
    age: 30
}, {
    id: '987sd88a-45q6-78d8-4565-2d42b21b1a3e',
    name: 'Frigue Feulé',
    login: 'rigo',
    age: 29
}, {
    id: '9876788a-45q6-78d8-4565-2d42b21b1a3e',
    name: 'Ferdinand Konan',
    login: 'fredy',
    age: 25
}, {
    id: '780sd88a-45q6-78d8-4565-2d42b21b1a3e',
    name: 'Hugue Katou',
    login: 'hugo',
    age: 26
}, {
    id: '654de540-877a-65e5-4565-2d42b21b1a3e',
    name: 'Huguest Koffi',
    login: 'hug',
    age: 25
}, {
    id: '654de540-877a-65e5-4565-2d42b21b1a3e',
    login: 'mano',
    name: 'Hermann Katou',
    age: 28
}]


/* ----- patten injection creation -----*/

//get user by id

const get = (id) => {
    const getUsers = users.filter((user) => user.id === id)
    return getUsers.length >= 1 ? getUsers[0] : undefined
}


//get all users
const getAll = () => {
    return users
}


//add new user 
const add = (user) => {
    const newUser = {
        ...user,
        id: uuidv1()
    }
    if (userValidator(newUser)) {
        users.push(newUser)
    } else {
        throw new Error('this user is not valid')
    }
    return newUser
}

//update a user
const update = (id, userPropertiesUpdated) => {
    const getUsers = users.filter((user) => user.id === id)
    if (getUsers.length === 1) {
        const existingUser = getUsers[0]
        const newUser = {
            ...existingUser,
            ...userPropertiesUpdated
        }
        if (userValidator(newUser)) {
            //Object.assign usage: it permits to keep old user properties and add new user
            Object.assign(existingUser, newUser)
        } else {
            throw new Error('user is not valid')
        }
    } else {
        throw new Error('user is not found')
    }
}

//remove user

const remove = (id) => {
    const userIndex = users.findIndex((user) => user.id === id)
    if (userIndex > -1) {
        users.splice(userIndex, 1)
    } else {
        throw new Error('user is not found')
    }
}

//user validation function
function userValidator(user) {
    let output = true
    if (user && user.id && user.login && user.name) {
        output = true
    }
}

//patten export
exports.users = users
exports.get = get
exports.getAll = getAll
exports.add = add
exports.update = update
exports.remove = remove