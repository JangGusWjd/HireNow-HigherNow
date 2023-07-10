// 채용 질문 나타내는 컴포넌트
import "../style/DetailPage/DetailQuestion.scss";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const DetailQuestion = () => {
  const { jobListId } = useParams();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchJobQuestions();
  }, []);

  const fetchJobQuestions = async () => {
    try {
      const response = await axios.get(
        `http://49.247.33.67:8080/recruit/${jobListId}`
      );
      const { question1, question2, question3 } = response.data;
      setQuestions([question1, question2, question3]);
    } catch (error) {
      console.error("해당 채용 공고의 질문을 불러오는데 실패했습니다.", error);
    }
  };

  return (
    <div className="question-container">
      <h1>채용 질문 미리보기</h1>
      <div className="question-zip">
        <ul>
          {questions.map((question, index) => (
            <li key={index}>
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="zondicons:question" clipPath="url(#clip0_45_3)">
                  <path
                    id="Vector"
                    d="M20 40C14.6957 40 9.60859 37.8929 5.85786 34.1421C2.10714 30.3914 0 25.3043 0 20C0 14.6957 2.10714 9.60859 5.85786 5.85786C9.60859 2.10714 14.6957 0 20 0C25.3043 0 30.3914 2.10714 34.1421 5.85786C37.8929 9.60859 40 14.6957 40 20C40 25.3043 37.8929 30.3914 34.1421 34.1421C30.3914 37.8929 25.3043 40 20 40ZM24 14C24 14.56 23.58 15.6 23.16 16L20 19.16C18.86 20.32 18 22.36 18 24V26H22V24C22 23.42 22.42 22.4 22.84 22L26 18.84C27.14 17.68 28 15.64 28 14C28 11.8783 27.1571 9.84344 25.6569 8.34315C24.1566 6.84285 22.1217 6 20 6C17.8783 6 15.8434 6.84285 14.3431 8.34315C12.8429 9.84344 12 11.8783 12 14H16C16 12.9391 16.4214 11.9217 17.1716 11.1716C17.9217 10.4214 18.9391 10 20 10C21.0609 10 22.0783 10.4214 22.8284 11.1716C23.5786 11.9217 24 12.9391 24 14ZM18 30V34H22V30H18Z"
                    fill="#FFC700"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_45_3">
                    <rect width="40" height="40" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <p>{question}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DetailQuestion;
