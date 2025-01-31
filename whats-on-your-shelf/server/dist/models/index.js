import sequelize from '../config/connection.js';
// import { BookFactory } from './book.js';
import { UserFactory } from './user.js';
const User = UserFactory(sequelize);
// const Book = BookFactory(sequelize)
export { User };
