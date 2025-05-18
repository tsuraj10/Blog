import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Login from "./components/Login";
import BlogForm from "./components/BlogForm";
import BlogList from "./components/BlogList";
import BlogDetails from "./components/BlogDetails";
import { collection, addDoc, Timestamp, onSnapshot, query, orderBy, doc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";
import { Link } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);

  // Auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        console.log("✅ Logged in as:", user.email);
      } else {
        console.log("❌ Not logged in");
      }
    });
    return () => unsubscribe();
  }, []);

  // Firestore listener to fetch blogs in real-time
  useEffect(() => {
    const q = query(collection(db, "blogs"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const blogData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBlogs(blogData);
    });

    return () => unsubscribe();
  }, []);

  // Add blog to Firestore
  const addBlog = async (title, content, image) => {
    try {
      await addDoc(collection(db, "blogs"), {
        title,
        content,
        image,
        createdAt: Timestamp.now(),
        author: user.email,
        uid: user.uid,
      });
      console.log("✅ Blog added to Firestore");
    } catch (err) {
      console.error("❌ Error adding blog:", err);
    }
  };

  // UI-level deletion (Firestore delete optional to implement)
  const deleteBlog = async (id) => {
  try {
    await deleteDoc(doc(db, "blogs", id));
    console.log(`🗑️ Blog with ID ${id} deleted from Firestore`);
  } catch (err) {
    console.error("❌ Error deleting blog:", err);
  }
};

  const isLoggedIn = !!user;

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-10 px-4">
            <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-xl">
              <h1 className="text-4xl font-bold text-center mb-6">📚 My Blog</h1>

              {/* Show login prompt if not logged in */}
              {!isLoggedIn ? (
                <div className="mb-6 text-center text-sm text-white/80">
                  🔒 You must <Link to="/login" className="underline">log in</Link> to post
                </div>
              ) : (
                <BlogForm addBlog={addBlog} />
              )}

              <BlogList blogs={blogs} deleteBlog={isLoggedIn ? deleteBlog : null} />
            </div>
          </div>
        }
      />
      <Route path="/blog/:id" element={<BlogDetails blogs={blogs} />} />
      <Route path="/login" element={<Login onLogin={setUser} />} />
    </Routes>
  );
}

export default App;
