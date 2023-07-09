import { Routes, Route } from "react-router-dom";
import HeaderApp from "./Header/HeaderApp";
import MainApp from "./MainPage/MainApp";
import DetailApp from "./DetailPage/DetailApp";
import ApplyApp from "./ApplyPage/ApplyApp";
import JobPostApp from "./JobPostPage/JobPostApp";

function App() {
  return (
    <div>
      <Routes>
        <Route element={<HeaderApp />}>
          <Route path="/" element={<MainApp />} />
          <Route path="/detail/:jobListId" element={<DetailApp />} />
          <Route path="/apply/:jobListId" element={<ApplyApp />} />
          <Route path="/job-post" element={<JobPostApp />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
