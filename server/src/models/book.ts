import { DataTypes, type Sequelize, Model, type Optional } from 'sequelize';


interface BookAttributes {
  id: number;
  title: string;
  author: string;
  desc: string;
  rating: number;
}

interface BookCreationAttributes extends Optional<BookAttributes, 'id'> {}

export class Book
  extends Model<BookAttributes, BookCreationAttributes>
  implements BookAttributes
{
  public id!: number;
  public title!: string;
  public author!: string;
  public desc!: string;
  public rating!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public setRating(rating: number) {
    this.rating = (rating);
  }

}

export function BookFactory(sequelize: Sequelize): typeof Book {
  Book.init(
    {
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
    },
    {
      tableName: 'Books',
      sequelize,
      hooks: {
        beforeCreate: async (Book: Book) => {
          await Book.setRating(Book.rating);
        },
        beforeUpdate: async (Book: Book) => {
          await Book.setRating(Book.rating);
        },
      },
    }
  );

  return Book;
}
