import "../style/MainPage/MainApp.scss";
import AlbaZip from "./AlbaZip";

const MainApp = () => {
  return (
    <div className="page-body">
      <div className="main-ad">
        <img
          src="https://yozm.wishket.com/media/news/1587/%EC%9C%84%EC%8B%9C%EC%BC%93_%EC%A0%84%ED%99%98_%EB%B0%B0%EB%84%88.png"
          alt="광고"
        />
      </div>
      <AlbaZip />
    </div>
  );
};

export default MainApp;
