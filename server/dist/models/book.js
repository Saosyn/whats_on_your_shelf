import { DataTypes, Model } from 'sequelize';
export class Book extends Model {
    setRating(rating) {
        this.rating = (rating);
    }
}
export function BookFactory(sequelize) {
    Book.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        desc: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    }, {
        tableName: 'Books',
        sequelize,
        hooks: {
            beforeCreate: async (Book) => {
                await Book.setRating(Book.rating);
            },
            beforeUpdate: async (Book) => {
                await Book.setRating(Book.rating);
            },
        },
    });
    return Book;
}
