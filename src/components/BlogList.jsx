import { Link } from "react-router-dom";

const BlogList = ({ blogs, deleteBlog }) => {
  if (blogs.length === 0) {
    return <p className="mt-6 text-center text-white/80">No blogs yet. Add one!</p>;
  }

  return (
    <div className="mt-6 space-y-4">
      {blogs.map((blog) => (
        <div
          key={blog.id}
          className="bg-white/20 rounded-lg p-4 shadow-md backdrop-blur-sm"
        >
          <h2 className="text-2xl font-semibold">
            <Link to={`/blog/${blog.id}`} className="hover:underline text-white">
              {blog.title}
            </Link>
          </h2>
          <button
            onClick={() => deleteBlog(blog.id)}
            className="mt-2 text-red-300 hover:text-red-500"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
