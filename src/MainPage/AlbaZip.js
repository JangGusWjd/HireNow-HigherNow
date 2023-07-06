import styled from "styled-components";
import "../style/MainPage/AlbaZip.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AlbaZip = () => {
  const AlbaContainer = styled.div`
    max-width: 1316px;
    margin: 0 auto;
  `;

  const Title = styled.h1`
    font-size: 1.5rem;
    font-weight: 800;
    margin: 1.5rem 0 1rem 0;
  `;

  const [jobPostings, setJobPostings] = useState([]);
  // const [jobLogos, setJobLogos] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetchJobPostings();
  }, []);

  const fetchJobPostings = async () => {
    try {
      const response = await axios.get("http://49.247.33.67:8080/recruit");
      setJobPostings(response.data);
      fetchJobLogo(response.data);
    } catch (error) {
      console.error("채용 공고를 가져오는데 실패했습니다.", error);
    }
  };

  const handleJobPostingClick = (jobListId) => {
    // 채용 공고 상세보기로 이동
    navigate(`/detail/${jobListId}`);
  };

  const fetchJobLogo = async (jobPostings) => {
    try {
      const logoPromises = jobPostings.map(async (job) => {
        const response = await axios.get(
          `http://49.247.33.67:8080/logo/${job.jobListId}`,
          {
            responseType: "blob",
          }
        );
        const logoBlob = response.data;
        const imageUrl = URL.createObjectURL(logoBlob);
        return { ...job, logoUrl: imageUrl }; // 로고 이미지 URL을 채용 공고 객체에 추가
      });
      const jobPostingsWithLogo = await Promise.all(logoPromises);
      setJobPostings(jobPostingsWithLogo);
    } catch (error) {
      console.error("로고 이미지를 가져오는 중 오류가 발생했습니다:", error);
    }
  };

  return (
    <AlbaContainer>
      <Title>채용 공고 모아보기</Title>
      <div className="alba-container">
        {jobPostings.map((jobPosting) => (
          <div
            key={jobPosting.jobListId}
            className="alba-list"
            onClick={() => handleJobPostingClick(jobPosting.jobListId)}
          >
            <h3>{jobPosting.companyName}</h3>
            {jobPosting.logoUrl ? (
              <img src={jobPosting.logoUrl} alt="logo" />
            ) : (
              <p>로고 이미지를 불러오는 중입니다...</p>
            )}
            {/* <p>{jobPosting.companyInfo}</p> */}
          </div>
        ))}
      </div>
      {/* <div className="alba-container">
        {jobData.map((jobPosting) => (
          <div key={jobPosting.id} className="alba-list">
            <img src={jobPosting.logoImage} alt={jobPosting.companyName} />
            <h2>{jobPosting.jobTitle}</h2>
            <p>{jobPosting.companyName}</p>
          </div>
        ))}
      </div> */}
    </AlbaContainer>
  );
};

export default AlbaZip;
