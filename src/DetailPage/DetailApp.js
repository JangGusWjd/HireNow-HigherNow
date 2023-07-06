// 채용 공고 상세보기 페이지
import { useEffect, useState } from "react";
import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import DetailPosting from "./DetailPosting";
import DetailMap from "./DetailMap";
import DetailQuestion from "./DetailQuestion";
import "../style/DetailPage/DetailApp.scss";

const DetailApp = () => {
  const { jobListId } = useParams();
  const [jobPosting, setJobPosting] = useState({});
  // const navigate = useNavigate();

  useEffect(() => {
    fetchJobPostingData();
  }, []);

  const fetchJobPostingData = async () => {
    try {
      const response = await axios.get(
        `http://49.247.33.67:8080/recruit/${jobListId}`
      );
      setJobPosting(response.data);
    } catch (error) {
      console.error("해당 채용 공고를 불러오는데 실패했습니다.", error);
    }
  };

  // const handleApply = () => {
  //   navigate(`/apply/${companyName}`);
  // };
  return (
    <div className="detail-page-container">
      <DetailPosting companyName={jobPosting.companyInfo} />
      <DetailMap />
      <DetailQuestion />
      {/* <h3>회사 이름: {jobPosting.companyName}</h3>
      <p>회사 정보: {jobPosting.companyInfo}</p>
      <p>질문 1: {jobPosting.question1}</p>
      <p>질문 2: {jobPosting.question2}</p>
      <p>질문 3: {jobPosting.question3}</p>
      <button onClick={handleApply}>지원하기</button> */}
    </div>
  );
};

export default DetailApp;
