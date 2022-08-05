// import {MongoClient} from 'mongodb'
import mongoose from 'mongoose'

export const DB_URI = 'mongodb://admin:admin@octatech-shard-00-00.yy12f.mongodb.net:27017,octatech-shard-00-01.yy12f.mongodb.net:27017,octatech-shard-00-02.yy12f.mongodb.net:27017/usayit?ssl=true&replicaSet=atlas-10ynh6-shard-0&authSource=admin&retryWrites=true&w=majority'

// let dbConnection

//connect to MongoDB
const mongoose_connect = mongoose.connect(DB_URI, {useNewUrlParser : true}, (err) => {
    if (!err){
        console.log('Connected to DB')
    }else{
        console.log(err)
    }
})
//schema POST \sendMessage
const messageSchema = new mongoose.Schema({
    message:{
        type : String,
        required : true,
        default : 'Jangan dikosongin dong'
    },
    instagram:{
        type : Boolean,
        default : false
    },
    twitter:{
        type : Boolean,
        default : false
    }
}, {timestamps : true}) 

const History = mongoose.model('history_user', messageSchema)
export {mongoose_connect, History}
