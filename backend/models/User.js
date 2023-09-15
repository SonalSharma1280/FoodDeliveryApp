const mongoose=require('mongoose');

const{Schema}=mongoose;
const UserSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
});

module.exports=mongoose.model('users',UserSchema)  

/* A model in Mongoose is a constructor function that represents a collection in MongoDB. 
It is created by calling the 'mongoose.model' method, passing in the name of the collection and a schema definition. 
The model provides an interface for interacting with the database collection, allowing you to perform CRUD (Create, Read, Update, Delete) operations on the documents in the collection.*/

/*Mongoose: Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js.
 It provides a higher-level abstraction over the MongoDB driver, making it easier to work with MongoDB databases and collections. 
 Mongoose allows you to define schemas, create models based on those schemas, and perform various operations like querying, updating, and deleting documents.
 */