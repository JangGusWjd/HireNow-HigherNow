import { Routes, Route } from "react-router-dom";
import HeaderApp from "./Header/HeaderApp";
import MainApp from "./MainPage/MainApp";
import DetailApp from "./DetailPage/DetailApp";
import ApplyApp from "./ApplyPage/ApplyApp";

function App() {
  return (
    <div>
      <Routes>
        <Route element={<HeaderApp />}>
          <Route path="/" element={<MainApp />} />
          <Route path="/detail/:companyName" element={<DetailApp />} />
          <Route path="/apply/:companyName" element={<ApplyApp />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
