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

  const ActiveTitle = styled.h1`
    width: 17rem;
    font-size: 1.2rem;
    font-weight: 800;
    color: #228b22;
    margin: 2.5rem 0 1rem 0;
    border: 2px solid #228b22;
    border-radius: 15px;
    text-align: center;
  `;

  const ExpiredTitle = styled.h1`
    width: 17rem;
    font-size: 1.2rem;
    font-weight: 800;
    color: #929090;
    margin: 3.5rem 0 1rem 0;
    border: 2px solid #929090;
    border-radius: 15px;
    text-align: center;
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

  const filterJobPostings = () => {
    const currentDate = new Date();
    return jobPostings.filter((jobPosting) => {
      const deadline = new Date(jobPosting.deadline);
      return deadline >= currentDate;
    });
  };

  const activeJobPostings = filterJobPostings();
  const expiredJobPostings = jobPostings.filter(
    (jobPosting) => !activeJobPostings.includes(jobPosting)
  );

  return (
    <AlbaContainer>
      <Title>채용 공고 모아보기</Title>
      <div className="alba-container">
        {activeJobPostings.length > 0 && (
          <div>
            <ActiveTitle>지원 가능한 채용 공고</ActiveTitle>
            <div className="alba-list-container">
              {activeJobPostings.map((jobPosting) => (
                <div
                  key={jobPosting.jobListId}
                  className="alba-list"
                  onClick={() => handleJobPostingClick(jobPosting.jobListId)}
                >
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
          </div>
        )}
        {expiredJobPostings.length > 0 && (
          <div>
            <ExpiredTitle>마감된 채용 공고</ExpiredTitle>
            <div className="alba-list-container">
              {expiredJobPostings.map((jobPosting) => (
                <div
                  key={jobPosting.jobListId}
                  className="alba-list-expired"
                  onClick={() => handleJobPostingClick(jobPosting.jobListId)}
                >
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
          </div>
        )}
      </div>
    </AlbaContainer>
  );
};

export default AlbaZip;
