import React from "react";

const AddToListButton = ({book, addToMyBooks}) => {
  return(
    <div>
            <button onClick={() => addToMyBooks(book)} className="cursor-pointer bg-[#ff5a5a] text-white px-4 py-2 rounded-md hover:bg-[#ff5a5a]">Add to Library</button>
    </div>
  )
}

export default AddToListButton;