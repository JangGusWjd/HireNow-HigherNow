import { useEffect, useState } from "react";
import axios from "axios";
import "../style/CheckPage/CheckApp.scss";
import styled from "styled-components";

const CheckApp = () => {
  const AlbaContainer = styled.div`
    max-width: 1316px;
    margin: 0 auto;
  `;

  const [jobPostings, setJobPostings] = useState([]);

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
      <h1>채용 공고</h1>
      <div className="alba-check-container">
        {jobPostings.map((jobPosting) => (
          <div key={jobPosting.jobListId} className="alba-list">
            {jobPosting.logoUrl ? (
              <img src={jobPosting.logoUrl} alt="logo" />
            ) : (
              <p>로고 이미지를 불러오는 중입니다...</p>
            )}
            <div className="company-info-top">
              <p>{jobPosting.companyName}</p>
              <h3>{jobPosting.recruitTitle}</h3>
            </div>
            <div className="company-info-bottom">
              <p>{jobPosting.companyAddress}</p>
              <p>{jobPosting.employmentType}</p>
              <p>월 {jobPosting.wage}원</p>
            </div>
          </div>
        ))}
      </div>
    </AlbaContainer>
  );
};

export default CheckApp;
