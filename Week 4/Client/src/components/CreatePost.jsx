import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const CreatePost = ({ onPostCreated }) => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: '',
    content: '',
    image: null,
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setForm({ ...form, image: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('content', form.content);
    if (form.image) {
        formData.append('image', form.image);
    }

    try {
        const token = localStorage.getItem('token');

        await axios.post('http://localhost:5000/api/posts', formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        },
        });

        setMessage('Post created successfully!');
        setForm({ title: '', content: '', image: null });

        if (onPostCreated) onPostCreated();

        setTimeout(() => setMessage(''), 3000); // clear success msg
    } catch (err) {
        setMessage('Failed to create post');
    } finally {
        setLoading(false); // ✅ This must be at the end
    }
};


  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
      {message && <p className="text-green-600 font-medium">{message}</p>}

      <input
        type="text"
        name="title"
        placeholder="Post Title"
        value={form.title}
        onChange={handleChange}
        required
        className="w-full p-2 border border-[#5c5c5c] rounded focus:outline-[#666565] focus:outline-1"
      />

      <textarea
        name="content"
        placeholder="Post Content"
        value={form.content}
        onChange={handleChange}
        required
        className="w-full p-2 border border-[#5c5c5c] rounded focus:outline-[#666565] focus:outline-1"
      ></textarea>

      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleChange}
        className="w-full"
      />

        <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white text-sm px-4 py-2 rounded disabled:opacity-50"
        >
        {loading ? 'Creating...' : 'Create Post'}
        </button>

    </form>
  );
};

export default CreatePost;
