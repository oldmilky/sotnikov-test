import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Posts from "../components/Posts/Posts";
import "./Pages.scss";

function PostsPage() {
  return (
    <div className="page">
      <Header />
      <Posts />
      <Footer />
    </div>
  );
}

export default PostsPage;
