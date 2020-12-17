const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/recipe-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const User = mongoose.model("user", {
    firstname: String,
    lastname: String,
    email: String,
    password: String
})

const Recipe = mongoose.model("recipe", {
    title: String,
    guide: String,
    name: String,
    amount: String,
    userId: mongoose.Schema.Types.ObjectId
})

module.exports = {
    User,
    Recipe
}