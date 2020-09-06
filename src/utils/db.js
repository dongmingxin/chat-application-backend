const mongoose = require('mongoose');

exports.connectToDB = () => {
    const { DB_HOST, DB_PORT, DB_DATABASE } = process.env;
    const connectionString = `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;
    // const connectionString = `mongodb://localhost:27017/chat-app`;
    
    const db = mongoose.connection;
    db.on('connected', ()=> {
        console.log('DB connected');
    })
    db.on('error', (error) => {
        console.log('BD connection failed')
        console.error(error.message)
        process.exit(1)
    })
    db.on('disconnected', ()=> {
        console.log("mongoose connection is disconnected");
    })

    return mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
}

