import { Link } from "react-router-dom";

function BlogList({ blogs, deleteBlog }) {
  return (
    <div className="space-y-4 mt-6">
      {blogs.map((blog) => (
        <div key={blog.id} className="bg-white/20 p-4 rounded shadow">
          {blog.image && (
            <img
              src={blog.image}
              alt="Blog"
              className="w-full h-48 object-cover rounded mb-2"
            />
          )}
          <h2 className="text-2xl font-bold">{blog.title}</h2>
          <p className="text-white/80">{blog.content.slice(0, 100)}...</p>
          <div className="mt-2 flex gap-4">
            <Link
              to={`/blog/${blog.id}`}
              className="text-blue-200 underline hover:text-blue-300"
            >
              Read More
            </Link>
            <button
              onClick={() => deleteBlog(blog.id)}
              className="text-red-300 hover:text-red-500"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BlogList;
