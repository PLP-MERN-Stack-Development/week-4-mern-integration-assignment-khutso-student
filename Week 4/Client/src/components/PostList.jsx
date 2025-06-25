import { useContext, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import CommentSection from './CommentSection';


const PostList = ({ posts, onPostDeleted, onPostUpdated }) => {
  const { user } = useContext(AuthContext);
  const [editingPostId, setEditingPostId] = useState(null);
  const [editedForm, setEditedForm] = useState({ title: '', content: '' });
  const [loading, setLoading] = useState(false);

  const startEditing = (post) => {
    setEditingPostId(post._id);
    setEditedForm({ title: post.title, content: post.content });
  };

  const cancelEditing = () => {
    setEditingPostId(null);
    setEditedForm({ title: '', content: '' });
  };

  const handleEditChange = (e) => {
    setEditedForm({ ...editedForm, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (postId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/posts/${postId}`, editedForm, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (onPostUpdated) onPostUpdated(); // refresh post list
      setEditingPostId(null);
    } catch (err) {
      console.error('Failed to update post:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (postId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      onPostDeleted(); // refresh posts
    } catch (err) {
      console.error('Failed to delete post:', err);
    }
  };

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post._id} className="bg-white p-4 rounded shadow">
          {editingPostId === post._id ? (
            <>
              <input
                name="title"
                value={editedForm.title}
                onChange={handleEditChange}
                className="w-full border p-2 mb-2 rounded"
              />
              <textarea
                name="content"
                value={editedForm.content}
                onChange={handleEditChange}
                className="w-full border p-2 mb-2 rounded"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => handleUpdate(post._id)}
                  disabled={loading}
                  className="bg-green-600 text-white text-sm cursor-pointer px-3 py-1 rounded disabled:opacity-50 hover:text-[#000] transition duration-500"
                >
                  {loading ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={cancelEditing}
                  className="bg-gray-400 text-white px-3 py-1 rounded"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <h3 className=" text-[#222222]  text-lg font-bold">{post.title}</h3>
              <p className="text-gray-700 mb-2">{post.content}</p>

              {post.image && (
                <img
                  src={`http://localhost:5000/uploads/${post.image}`}
                  alt={post.title}
                  className="w-full max-h-60 object-cover rounded mb-2"
                />
              )}

              {user?.id === post.author?._id && (
                <div className="flex items-center gap-4 mt-2 p-2  ">
                  <button
                    onClick={() => startEditing(post)}
                    className="bg-[#000] hover:bg-[#b4b3b3] cursor-pointer transition duration-300 text-white text-sm hover:text-[#000] px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded cursor-pointer transition duration-300"
                  >
                    Delete
                  </button>
                  <CommentSection postId={post._id} />

                </div>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default PostList;
