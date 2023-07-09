import { useState } from "react";
import { useParams } from "react-router-dom";
import "../style/ApplyPage/Application.scss";
// import styled from "styled-components";
import axios from "axios";

const Application = ({ questions }) => {
  // 스타일 컴포넌트 사용했는데 input에 한 글자씩만 쳐지는 문제 발생
  // const ApplicationContainer = styled.div`
  //   margin-top: 4rem;
  // `;
  const { jobListId } = useParams();
  const [applicantData, setApplicantData] = useState({
    jobListId: jobListId,
    name: "",
    gender: "",
    age: "",
    answer1: "",
    answer2: "",
    answer3: "",
  });

  const handleChange = (e) => {
    setApplicantData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/apply",
        applicantData
      );
      console.log(applicantData);
      console.log(response.data);
      alert("지원이 완료되었습니다.");
    } catch (error) {
      console.error("지원자의 데이터 전송을 실패했습니다.", error);
      console.log(applicantData);
    }
  };

  return (
    // <ApplicationContainer>
    <div>
      <h2>지원 내용</h2>
      <form onSubmit={handleSubmit} className="application-form">
        <label>
          이름
          <input
            type="text"
            name="name"
            value={applicantData.name}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <div className="choice-gender">
          <label>성별</label>
          <label>
            <input
              type="radio"
              name="gender"
              value="M"
              checked={applicantData.gender === "M"}
              onChange={handleChange}
            />
            남자
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="F"
              checked={applicantData.gender === "F"}
              onChange={handleChange}
            />
            여자
          </label>
        </div>
        <br />
        <label>
          나이
          <input
            type="number"
            name="age"
            value={applicantData.age}
            onChange={handleChange}
          />
        </label>
        <br />
        {questions.map((question, index) => (
          <div key={index}>
            <label className="answer-question">
              Q{index + 1}. {question}
              <input
                type="text"
                name={`answer${index + 1}`}
                value={applicantData[`answer${index + 1}`]}
                onChange={handleChange}
              />
            </label>
          </div>
        ))}
      </form>
      <div className="button-container">
        <button onClick={handleSubmit}>지원</button>
      </div>
      {/* </ApplicationContainer> */}
    </div>
  );
};

export default Application;
