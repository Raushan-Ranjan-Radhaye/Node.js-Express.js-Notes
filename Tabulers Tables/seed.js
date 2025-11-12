const mongoose = require('mongoose');
const User = require('./models/users.model');

mongoose.connect('mongodb://127.0.0.1:27017/users_demo')
.then(async () => {
    console.log("MongoDB Connected for seeding");
    
    // Clear existing data
    await User.deleteMany({});
    
    // Sample data
    const sampleUsers = [
        { name: "John Doe", email: "john@example.com", age: 30 },
        { name: "Jane Smith", email: "jane@example.com", age: 25 },
        { name: "Bob Johnson", email: "bob@example.com", age: 35 },
        { name: "Alice Brown", email: "alice@example.com", age: 28 }
    ];
    
    await User.insertMany(sampleUsers);
    console.log("Sample users seeded successfully");
    
    mongoose.connection.close();
})
.catch((err) => {
    console.error("Seeding error:", err);
});
