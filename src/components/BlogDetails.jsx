import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

function BlogDetails({ blogs }) {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const found = blogs.find((b) => b.id === id);
    if (found) {
      setBlog(found);
    } else {
      // Fallback fetch from Firestore
      const fetchBlog = async () => {
        try {
          const docRef = doc(db, "blogs", id);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setBlog({ id: docSnap.id, ...docSnap.data() });
          }
        } catch (err) {
          console.error("Failed to fetch blog:", err);
        }
      };
      fetchBlog();
    }
  }, [id, blogs]);

  if (!blog) return <div className="text-white text-center mt-10">Loading blog...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-10">
      <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-xl">
        <h2 className="text-4xl font-bold mb-4">{blog.title}</h2>
        {blog.image && (
          <img
            src={blog.image}
            alt="Blog"
            className="w-full h-64 object-cover rounded mb-4"
          />
        )}
        <p className="text-white/90 whitespace-pre-wrap">{blog.content}</p>
        <Link
          to="/"
          className="inline-block mt-6 text-blue-200 underline hover:text-blue-300"
        >
          ← Back to Blogs
        </Link>
      </div>
    </div>
  );
}

export default BlogDetails;
