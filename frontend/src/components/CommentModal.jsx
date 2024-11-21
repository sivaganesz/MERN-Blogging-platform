import { useState } from "react";
import { PostAuthor } from './PostAuthor';
// import { Popup } from './Popup';
export const CommentModal = ({ onClose, authorID, createdAt,onCommentCount, onCommentSubmit }) => {
    const [comment, setComment] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Comment submitted: ", comment);
      onCommentCount();
      onCommentSubmit("Comment submitted successfully!"); // Show popup message on submit
      onClose(); // Close the modal after submission
    };
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-4 rounded shadow-lg max-w-xs w-full">
          <h4 className="text-center text-lg font-semibold">Add a Comment</h4>
          <PostAuthor authorID={authorID} createdAt={createdAt} />
          <form onSubmit={handleSubmit}>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Type your comment here..."
              className="w-full border rounded p-2 mt-2"
              rows={4}
              required
            />
            <div className="flex justify-between mt-4">
              <button
                type="button"
                className="bg-gray-300 text-black p-1 px-2 rounded"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-indigo-600 text-white p-1 px-2 rounded"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  