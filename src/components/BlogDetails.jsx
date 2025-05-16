import { useParams, useNavigate } from "react-router-dom";

const BlogDetails = ({ blogs }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const blog = blogs.find((b) => b.id === Number(id));

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p>Blog not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white flex items-center justify-center px-4">
      <div className="max-w-xl bg-white/10 backdrop-blur p-6 rounded-xl shadow-xl">
        <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
        <p className="text-white/90 whitespace-pre-line">{blog.content}</p>
        <button
          onClick={() => navigate("/")}
          className="mt-6 bg-white text-purple-600 font-semibold px-4 py-2 rounded-lg hover:bg-purple-100"
        >
          ← Back
        </button>
      </div>
    </div>
  );
};

export default BlogDetails;
