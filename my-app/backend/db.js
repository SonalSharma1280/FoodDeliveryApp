const mongoose = require('mongoose');
mongoURI = "mongodb+srv://sonamini2002:sonamini2002@cluster0.strfsn9.mongodb.net/FoodieMern?retryWrites=true&w=majority";//put database name before ? mark
/*In MongoDB, we use 'await' to wait for the result of a database operation.
 This is because most database operations in MongoDB are asynchronous, meaning that they do not block the execution of the rest of our code while they are running.
By using 'await', we can ensure that our code waits for the database operation to complete before moving on to the next line of code.
 This can be important when performing operations that depend on the results of a previous operation*/
const mongodb = async () => {
    await mongoose.connect(mongoURI, { useNewUrlParser: true,useUnifiedTopology: true }, async (err, result) => {
        if (err) {
            console.log("---", err);
        } else {
            console.log("connected");
            const fetched_data = await mongoose.connection.db.collection("food_items");//once mongodb is connected we can now fetch data using the mongodb collection
            fetched_data.find({}).toArray(async function (err, data) { //here .find() method to find the data ({}->this is to find all data).into an Array form
                const foodCategory = await mongoose.connection.db.collection("food_category");
                foodCategory.find({}).toArray(function (err, catData) {


                    if (err) console.log(err);
                    else {
                        global.food_items = data;
                        global.food_category = catData;
                    }
                })

            });



        }
    });
}

module.exports = mongodb;
