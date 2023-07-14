const { MongoClient } = require('mongodb');
// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'mydatabase';

// Create a new MongoClient
const client = new MongoClient(url);

// Connect to the MongoDB server
client.connect(function (err) {
  if (err) {
    console.error('Failed to connect to the database:', err);
    return;
  }

  console.log('Connected successfully to the database');

  // Store the database instance in the app.locals to make it accessible in the routes
  app.locals.db = client.db(dbName);

  // Start the server
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`);
  });
});
