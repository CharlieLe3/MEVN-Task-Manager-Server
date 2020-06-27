const mongoose = require('mongoose');

// TEMPORARY UNTIL ENV 
const password = '5A6o0bY7qNVF3Kyx';
const username = 'TestUser';
const databasename = 'Learning';
let dbUrl = `mongodb+srv://${username}:${password}@learning-a3t0s.mongodb.net/${databasename}?retryWrites=true&w=majority`;

function connectToDB() {
    mongoose.connect(dbUrl, 
    { useNewUrlParser: true, useUnifiedTopology: true },
    error => {
        if (error) {
            console.log('Unable to connect to database');
            throw error;
        } else {
            console.log(`Connected to MongoDB. Ready state: ${mongoose.connection.readyState}`);
        }
    });
}

module.exports = {
    connectToDB
};