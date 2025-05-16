import { useState } from "react";

function BlogForm({ addBlog }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) return;
    addBlog(title, content, image);
    setTitle("");
    setContent("");
    setImage(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded text-black focus:outline-none focus:ring-2 focus:ring-purple-400"
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded text-black focus:outline-none focus:ring-2 focus:ring-purple-400"
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="w-full border border-gray-300 rounded text-black p-2 bg-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-purple-100 file:text-purple-700 hover:file:bg-purple-200"
      />
      {image && (
        <img src={image} alt="Preview" className="w-32 h-32 object-cover rounded" />
      )}
      <button
        type="submit"
        className="bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded text-white font-semibold"
      >
        Add Blog
      </button>
    </form>
  );
}

export default BlogForm;
