import React from "react";
import AddToListButton from "./AddToListButton";

const BookCard = ({ book, addToMyBooks }) => {
  return (
    <div className="flex flex-wrap flex-col border-1 border-[#D9D9D9] rounded-lg pb-8 pt-3.5 px-3.5 max-w-[350px] max-h-[900px]">
      <div className="h-[500px] w-auto">
        <img
          src={book.cover}
          alt={book.title}
          className="h-full w-auto rounded-md"
        />
      </div >
        <div className="flex flex-col max-w-2xs text-left pt-6 pb-6">
          <h2 className="text-2xl font-medium line-clamp-2">{book.title}</h2>
          <h3 className="text-lg line-clamp-2">{book.author}</h3>
          <p className="text-gray-700 line-clamp-3 break-words pt-2 ">{book.description}</p>
        </div>
      <AddToListButton book={book} addToMyBooks={addToMyBooks}/>      
    </div>
  );
};

export default BookCard;

//Test