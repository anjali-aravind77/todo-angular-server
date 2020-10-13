const db = require('../models/todo')
const dbUser = require('../models/User')
const crypto = require('crypto')


const getTodos = () => {
    return db.todo.find();
}

const createTodo = (data) => {
    const todos = new db.todo(data);
    todos.save()
    .then(d => {
        console.log(d)
    })
    .catch(err => {
        console.log(err)
    })
    return {
        statusCode: 200,
        message: "todo added succesfully"
    }
}

const login = (data) => {
    return db.todo.findOne({
        email: data.email
    })
    .then(user => {
        if(!user) {
            return {
                statusCode: 422,
                message: "user not found"
            }
        }
       const hash = generateHash(data.password)
       if(hash == user.password) {
           return {
               statusCode: 200,
               message: "user logged in"
           }
        }
    
    
        return {
            statusCode: 422,
            message: "invalid credentilas"
        }
        
        })
}
const generateHash = (password) => {
    const hash = crypto.pbkdf2Sync("1234", "aweryt", 1000, 64, 'sha512' ).toString('hex'); //ranspm string called salt.
    return hash;
}

const createUser = (data) => {
    return dbUser.User.findOne({email: data.email})
    .then(user => {
        if(user) {        
        return {
            statusCode: 422,
            message: "user already exists"
        }
    }
    const hash = generateHash(data.password);
    data.password = hash;
    const newuser = new dbUser.User(data);
    newuser.save();
    return {
        statusCode: 200,
        message:"succesfully registered"
    }

    })
}

module.exports = {
    createTodo, getTodos,
    login, createUser
}