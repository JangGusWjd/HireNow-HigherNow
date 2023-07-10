import { Routes, Route } from "react-router-dom";
import HeaderApp from "./Header/HeaderApp";
import MainApp from "./MainPage/MainApp";
import DetailApp from "./DetailPage/DetailApp";
import ApplyApp from "./ApplyPage/ApplyApp";
import CheckApp from "./CheckPage/CheckApp";
import JobPostApp from "./JobPostPage/JobPostApp";
import PopularAlbaApp from "./PopularAlbaPage/PopularAlbaApp";

function App() {
  return (
    <div>
      <Routes>
        <Route element={<HeaderApp />}>
          <Route path="/" element={<MainApp />} />
          <Route path="/detail/:jobListId" element={<DetailApp />} />
          <Route path="/apply/:jobListId" element={<ApplyApp />} />
          <Route path="/check" element={<CheckApp />} />
          <Route path="/job-post" element={<JobPostApp />} />
          <Route path="/popular-alba" element={<PopularAlbaApp />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
