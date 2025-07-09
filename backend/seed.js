const { sequelize } = require('./config/database');
const { Movie, Actor } = require('./models/movact');
const User = require('./models/User');

async function seed() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        const movies = [
            {
                name: 'Avatar 2',
                image: '/uploads/image-1751898268177-492449190.jpeg',
                description: 'Sam Worthington',
                genre: 'Action',
                actors: 'Sam Worthington',
                hours: 3.00
            },
            {
                name: 'John wick 4',
                image: '/uploads/image-1751898610831-134848867.jpeg',
                description: 'Action ,Thriling and best shooting movies of all time',
                genre: 'Action ,Thriller',
                actors: 'Keenu reeves, Donnie yen',
                hours: 2.30
            },
            {
                name: 'Avengers Endgame',
                image: '/uploads/image-1751898678983-7836724.jpg',
                description: 'Best movie in 2024 and highest grossing movie',
                genre: 'Action,Thriller',
                actors: 'Robert downey jr, Chris Hemsworth',
                hours: 2.50
            },
            {
                name: 'Thor',
                image: '/uploads/image-1751899070815-570610358.jpg',
                description: 'Best action movie',
                genre: 'Action Scifi',
                actors: 'Chris Hemsworth',
                hours: 2.10
            },
            {
                name: 'Ironman',
                image: '/uploads/image-1751899190111-309074128.jpg',
                description: 'Best scifi movie',
                genre: 'Action ,Scifi',
                actors: 'Robert downey jr',
                hours: 1.50
            },
            {
                name: 'Dolitle',
                image: '/uploads/image-1751969826563-766873145.jpg',
                description: 'A man who talks to animals',
                genre: 'comedy',
                actors: 'Robert downey jr',
                hours: 2.00
            },
            {
                name: 'Man In Black',
                image: '/uploads/image-1751970620770-721548414.jpg',
                description: 'fighting with extraterrsitrial aliens',
                genre: 'comedy',
                actors: 'Chris Hemsworth',
                hours: 2.20
            }
        ];
        const actors = [
            {
                name: 'Sam worthington',
                hours: 45.00,
                image: '/uploads/image-1751898505314-81013099.jpeg',
                description: 'great and best actor',
                movies: 'Avatar 2'
            },
            {
                name: 'Robert downey jr',
                hours: 60.00,
                image: '/uploads/image-1751898765816-376959831.jpg',
                description: 'One of the best actor known for it role in ironman',
                movies: 'Iron man ,Dolitle ,Avengers endgame'
            },
            {
                name: 'Chris Hemsworth',
                hours: 40.00,
                image: '/uploads/image-1751898952123-433445459.jpg',
                description: 'Most hansdsome actor and known for thor',
                movies: 'Thor ,Avengers Endgame'
            },
            {
                name: 'Donnie yen',
                hours: 55.00,
                image: '/uploads/image-1751899259064-400881675.jpg',
                description: 'Best chinese actor',
                movies: 'John wick 4'
            },
            {
                name: 'Chris Evans',
                hours: 45.00,
                image: '/uploads/image-1751972319960-68056277.jpeg',
                description: '',
                movies: 'Avengers Endgame'
            }
        ];

        const users = [
            {
                username: 'user',
                email: 'harsha1423@gmail.com',
                password: '$2a$10$stV2CmHyr4.sJfTTffhbHuSpTmRnB.S9lJDrDlC8jZa1xyTh20MyC',
                role: 'user',
                isEmailVerified: true
            },
            {
                username: 'admin',
                email: 'harsha@gmail.com',
                password: '$2a$10$ZLZhBe.T7JilTxjIQhJrKuXFiuWMiiC7YXRQbeI68MwxfnLChBnaW',
                role: 'admin',
                isEmailVerified: true
            }
        ];

        await sequelize.sync({ force: false });
        await Movie.bulkCreate(movies, { ignoreDuplicates: true });
        await Actor.bulkCreate(actors, { ignoreDuplicates: true });
        await User.bulkCreate(users, { ignoreDuplicates: true, individualHooks: false });
        console.log('Seeding completed!');
    } catch (error) {
        console.error('Unable to connect to the database or seed data:', error);
    } finally {
        await sequelize.close();
    }
}

seed(); 