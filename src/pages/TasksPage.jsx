import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Tasks from "../components/Tasks/Tasks";
import "./Pages.scss";

function TasksPage() {
  return (
    <div className="page">
      <Header />
      <Tasks />
      <Footer />
    </div>
  );
}

export default TasksPage;
