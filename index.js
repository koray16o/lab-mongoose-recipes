const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'recipe-app';

async function updateDatabase() {
  // Connection to the database "recipe-app"
  try {
    const x = await mongoose.connect(MONGODB_URI);
    console.log('connected to', x.connections[0].name);
    await Recipe.deleteMany();

    //Start coding here
    await Recipe.create({
      title: 'Express Burger',
      level: 'Easy Peasy',
      ingredients: [
        'burger buns',
        'beef patty',
        'cheddar cheese',
        'pickles',
        'caramelized onions',
        'ketchup',
        'mayo'
      ],
      cuisine: 'American',
      dishType: 'main_course',
      image:
        'https://s23209.pcdn.co/wp-content/uploads/2022/07/220602_DD_The-Best-Ever-Cheeseburger_267.jpg',
      duration: 30,
      creator: 'me',
      created: 5 / 10 / 2022
    });
    await Recipe.insertMany(data);
    await Recipe.findOneAndUpdate(
      { title: 'Rigatoni alla Genovese' },
      { duration: 100 },
      console.log('Updated Rigatoni')
    );
    await Recipe.deleteOne(
      { title: 'Carrot Cake' },
      console.log('Deleted Carrot Cake')
    );
  } catch (e) {
    console.error('Error connecting to the database', error);
  } finally {
    mongoose.connection.close();
  }
}

updateDatabase();
