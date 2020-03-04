// Require the framework and instantiate it
const fastify = require('fastify')({
    logger: true
});
// Require external modules
const mongoose = require('mongoose');
// require routes
const routes = require('./routes');
// Import Swagger Options
const swagger = require('./config/swagger');

// Connect to DB
mongoose.Promise = global.Promise;
mongoose.set('debug', true);

const uri = "mongodb://root:hackerman@localhost:27017/admin";

const conn = mongoose.connect(uri,  { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected…'))
    .catch(err => console.log(err));

// Register Swagger
fastify.register(require('fastify-swagger'), swagger.options);

// route each api to fastify
routes.forEach((route, index) => {
    fastify.route(route);
});

// Run the server!
const start = async () => {
    try {
        await fastify.listen(3000);
        fastify.swagger();
        fastify.log.info(`listening on ${fastify.server.address().port}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();