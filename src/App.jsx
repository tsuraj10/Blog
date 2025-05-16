import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import BlogDetails from "./components/BlogDetails";

function App() {
  const [blogs, setBlogs] = useState([]);

  const addBlog = (title, content, image) => {
  const newBlog = { id: Date.now(), title, content, image };
  setBlogs([newBlog, ...blogs]);
};


  const deleteBlog = (id) => {
    setBlogs(blogs.filter((blog) => blog.id !== id));
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-10 px-4">
            <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-xl">
              <h1 className="text-4xl font-bold text-center mb-6">📚 My Blog</h1>
              <BlogForm addBlog={addBlog} />
              <BlogList blogs={blogs} deleteBlog={deleteBlog} />
            </div>
          </div>
        }
      />
      <Route path="/blog/:id" element={<BlogDetails blogs={blogs} />} />
    </Routes>
  );
}

export default App;
