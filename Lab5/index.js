import PathParameters from './PathParameters.js';
import QueryParameters from './QueryParameters.js';
import WorkingWithObjects from './WorkingWithObjects.js';
import WorkingWithArrays from './WorkingWithArrays.js';



export default function Lab5(app) {
  app.get('/lab5/welcome', (req, res) => {
    res.send('Welcome to Lab 5');
  });

  // Register PathParameters routes
  PathParameters(app);
    // Register QueryParameters routes
  QueryParameters(app);
    // Register WorkingWithObjects routes
  WorkingWithObjects(app);
    // Register WorkingWithArrays routes
  WorkingWithArrays(app);
}
