import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Photos from "../components/Photos/Photos";
import "./Pages.scss";

function PhotosPage() {
  return (
    <div className="page">
      <Header />
      <Photos />
      <Footer />
    </div>
  );
}

export default PhotosPage;
