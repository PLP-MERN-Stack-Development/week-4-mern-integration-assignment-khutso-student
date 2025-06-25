import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const CommentSection = ({ postId }) => {
  const { user } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');

  const fetchComments = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/comments/post/${postId}`);
      setComments(res.data);
    } catch (err) {
      console.error('Failed to fetch comments', err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/comments',
        { content: text, post: postId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setText('');
      fetchComments(); // refresh
    } catch (err) {
      console.error('Failed to post comment', err);
    }
  };

  const handleDelete = async (commentId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/comments/${commentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchComments(); // refresh the comments
    } catch (err) {
      console.error('Failed to delete comment:', err);
    }
  };

  return (
    <div className="flex flex-col gap-2 p-2 w-auto h-auto">
      <h4 className="font-semibold text-sm text-[#464545]">Comments</h4>
      {comments.map((comment) => (
        <div key={comment._id} className="bg-gray-100 p-2 rounded mb-1 relative">
          <p className="text-sm">{comment.content}</p>
          <p className="text-xs text-gray-500">— {comment.author?.name || 'Anonymous'}</p>

          {/* Delete button for comment author */}
          {user && user.id === comment.author?._id && (
            <button
              onClick={() => handleDelete(comment._id)}
              className="absolute top-2 right-2 bg-[#000000] rounded-xl p-1.5 z-10 text-white text-xs hover:underline"
              aria-label="Delete comment"
            >
              Delete
            </button>
          )}
        </div>
      ))}

      {user && (
        <form onSubmit={handleSubmit} className="flex gap-2 mt-2">
          <input
            type="text"
            placeholder="Write a comment..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 border border-[#818181] text-sm rounded px-2 py-1 focus:outline-[#929292]"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
          >
            Send
          </button>
        </form>
      )}
    </div>
  );
};

export default CommentSection;
