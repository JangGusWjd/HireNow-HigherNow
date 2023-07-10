import "../style/MainPage/MainApp.scss";
import AlbaZip from "./AlbaZip";
import { useNavigate } from "react-router-dom";

const MainApp = () => {
  const navigate = useNavigate();
  const goPopularPage = () => {
    navigate("/popular-alba");
  };
  return (
    <div className="page-body">
      <div className="main-ad">
        <img
          src="https://yozm.wishket.com/media/news/1587/%EC%9C%84%EC%8B%9C%EC%BC%93_%EC%A0%84%ED%99%98_%EB%B0%B0%EB%84%88.png"
          alt="광고"
        />
        <div className="announcement">
          <div className="announcement-arrow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M19.2352 0.440231C19.7249 0.722196 20 1.10457 20 1.50327C20 1.90197 19.7249 2.28434 19.2352 2.56631L6.30514 10.0091L19.2352 17.4518C19.711 17.7354 19.9743 18.1152 19.9684 18.5095C19.9624 18.9037 19.6877 19.2808 19.2034 19.5596C18.7191 19.8384 18.0639 19.9965 17.379 19.9999C16.6941 20.0034 16.0343 19.8518 15.5416 19.5779L0.764797 11.0721C0.275098 10.7902 0 10.4078 0 10.0091C0 9.61038 0.275098 9.228 0.764797 8.94604L15.5416 0.440231C16.0315 0.158351 16.6958 0 17.3884 0C18.0811 0 18.7454 0.158351 19.2352 0.440231Z"
                fill="#228B22"
              />
            </svg>
          </div>
          <div className="announcement-text" onClick={goPopularPage}>
            <p>실시간 TOP100</p>
            <p>
              가장 <span>인기있는 공고</span>를 <br />
              확인하세요
            </p>
          </div>
          <div className="announcement-arrow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 21 21"
              fill="none"
            >
              <path
                d="M0.77847 1.4059C0.28877 1.68786 0.0136719 2.07024 0.0136719 2.46894C0.0136719 2.86763 0.28877 3.25001 0.77847 3.53197L13.7085 10.9747L0.77847 18.4175C0.302648 18.7011 0.0393589 19.0809 0.0453104 19.4751C0.051262 19.8694 0.325978 20.2465 0.810289 20.5253C1.2946 20.8041 1.94976 20.9622 2.63465 20.9656C3.31954 20.969 3.97937 20.8175 4.47203 20.5436L19.2489 12.0378C19.7386 11.7558 20.0137 11.3734 20.0137 10.9747C20.0137 10.576 19.7386 10.1937 19.2489 9.91171L4.47203 1.4059C3.98218 1.12402 3.31789 0.965668 2.62525 0.965668C1.9326 0.965668 1.26832 1.12402 0.77847 1.4059Z"
                fill="#228B22"
              />
            </svg>
          </div>
        </div>
      </div>
      <AlbaZip />
    </div>
  );
};

export default MainApp;
