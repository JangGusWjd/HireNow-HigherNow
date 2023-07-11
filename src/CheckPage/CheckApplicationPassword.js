import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/CheckPage/CheckPassword.scss";
import "../style/CheckPage/CheckApplication.scss";

const CheckApplicationPassword = ({
  jobListId,
  applicationId,
  recruitTitle,
}) => {
  const [password, setPassword] = useState("");
  const [applicationData, setApplicationData] = useState(null);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await axios.post(
        `http://49.247.33.67:8080/apply/${jobListId}/${applicationId}`,
        {
          password: password,
        }
      );
      const result = response.data;
      setApplicationData(result);
    } catch (error) {
      console.log("비밀번호 전송에 실패했습니다.", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  useEffect(() => {
    const fetchJobListing = async () => {
      try {
        const response = await axios.get(
          `http://49.247.33.67:8080/recruit/${jobListId}`
        );
        setData(response.data);
        // console.log("Job Listing 정보:", jobListing);
      } catch (error) {
        console.log("Job Listing 정보를 가져오지 못했습니다.", error);
      }
    };

    fetchJobListing();
  }, [jobListId]);

  if (applicationData) {
    return (
      <div className="application-container">
        <h2>지원서</h2>
        <div className="application-details">
          {/* <h2>Application Details:</h2>
          <p>Application ID: {applicationData.applicationId}</p> */}
          <div className="info">
            <p>이름</p>
            <p>{applicationData.name}</p>
          </div>
          <div className="info">
            <p>성별</p>
            <p>{applicationData.gender}</p>
          </div>
          <div className="info">
            <p>나이</p>
            <p>{applicationData.age}</p>
          </div>

          <div className="question">
            <p>Q1. {data.question1}</p>
            <p>Answer 1: {applicationData.answer1}</p>
          </div>

          <div className="question">
            <p>Q2. {data.question2}</p>
            <p>Answer 2: {applicationData.answer2}</p>
          </div>
          <div className="question">
            <p>Q3. {data.question3}</p>
            <p>Answer 3: {applicationData.answer3}</p>
          </div>
          <p className="create-time">
            Created Time: {applicationData.createdTime}
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="check-password-container">
        <div className="check-password">
          <h1>{recruitTitle}</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={handleChangePassword}
            />
            <button type="submit">확인</button>
          </form>
        </div>
      </div>
    );
  }
};

export default CheckApplicationPassword;
