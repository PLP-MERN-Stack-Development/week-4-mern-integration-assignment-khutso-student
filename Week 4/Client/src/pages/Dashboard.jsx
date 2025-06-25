import { useEffect, useState } from 'react';
import DashboardNavbar from '../components/DashboardNavbar';
import CreatePost from '../components/CreatePost';
import PostList from '../components/PostList';
import axios from 'axios';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);

  // Function to fetch posts from backend
  const fetchPosts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/posts');
      setPosts(res.data);
    } catch (err) {
      console.error('Failed to fetch posts:', err);
    }
  };

  // Fetch posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <DashboardNavbar />
      <div className="p-6">
        <h2 className="text-xl text-[#353434] font-bold mb-4">Create a New Post</h2>
  
        <CreatePost onPostCreated={fetchPosts} />
        <h2 className="text-xl text-[#353434]  font-bold my-4">All Posts</h2>

       <PostList
        posts={posts}
        onPostDeleted={fetchPosts}
        onPostUpdated={fetchPosts}
      />


      </div>
    </div>
  );
};

export default Dashboard;
