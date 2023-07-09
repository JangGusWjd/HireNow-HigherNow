import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import DetailPosting from "../DetailPage/DetailPosting";
import Application from "./Application";

const CompanyConfirm = () => {
  const ConfirmTitle = styled.h2`
    margin-top: 2rem;
    margin-bottom: -1rem;
  `;
  const { jobListId } = useParams();
  // const [jobPosting, setJobPosting] = useState({});
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchJobPostingData();
  }, []);

  const fetchJobPostingData = async () => {
    try {
      const response = await axios.get(
        `http://49.247.33.67:8080/recruit/${jobListId}`
      );
      // setJobPosting(response.data);
      const { question1, question2, question3 } = response.data;
      setQuestions([question1, question2, question3]);
    } catch (error) {
      console.error("해당 채용 공고를 불러오는데 실패했습니다.", error);
    }
  };

  return (
    <div>
      <div className="CompanyConfirm-Container">
        <ConfirmTitle>지원 회사 확인</ConfirmTitle>
        <DetailPosting />
        {/* <div>
          <p>근무회사명</p>
          <p></p>
        </div>
        <div>
          <p>공고 제목</p>
          <p>{jobPosting.companyInfo}</p>
        </div> */}
      </div>
      <Application questions={questions} />
    </div>
  );
};

export default CompanyConfirm;
