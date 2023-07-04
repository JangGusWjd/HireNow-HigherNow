import styled from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AlbaZip = () => {
  const AlbaContainer = styled.div`
    max-width: 1024px;
    margin: 0 auto;
  `;

  const [jobPostings, setJobPostings] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchJobPostings();
  }, []);

  const fetchJobPostings = async () => {
    try {
      const response = await axios.get("/recruit");
      setJobPostings(response.data);
    } catch (error) {
      console.error("채용 공고를 가져오는데 실패했습니다.", error);
    }
  };

  const handleJobPostingClick = (companyName) => {
    // 채용 공고 상세보기로 이동
    navigate(`/detail/${companyName}`);
  };

  return (
    <AlbaContainer>
      <h1>채용 공고 모아보기</h1>
      {jobPostings.map((jobPosting, index) => (
        <div
          key={index}
          onClick={() => handleJobPostingClick(jobPosting.companyName)}
        >
          <h3>{jobPosting.companyName}</h3>
          <p>{jobPosting.companyInfo}</p>
        </div>
      ))}
    </AlbaContainer>
  );
};

export default AlbaZip;
