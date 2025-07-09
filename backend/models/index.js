const User = require('./User');
const { Movie, Actor } = require('./movact');

const models = {
    User,
    Movie,
    Actor
};

Object.values(models).forEach(model => {
    if (model.initializeAssociations) {
        model.initializeAssociations(models);
    }
});

module.exports = models; 