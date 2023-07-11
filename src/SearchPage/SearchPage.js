import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../style/CheckPage/CheckApp.scss";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const SearchPage = () => {
  const SearchContainer = styled.div`
    width: 100%;
    max-width: 1316px;
    margin: 0 auto;
  `;
  const { keyword } = useParams();
  const [jobListings, setJobListings] = useState([]);

  useEffect(() => {
    fetchJobListings();
  }, [keyword]);

  const fetchJobListings = async () => {
    try {
      const response = await fetch(
        `http://49.247.33.67:8080/recruit/search/?${keyword}`
      ); // API 엔드포인트로의 요청
      const data = await response.json();
      fetchJobLogo(data);
      setJobListings(data);
    } catch (error) {
      console.error("Error fetching job listings:", error);
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
      setJobListings(jobPostingsWithLogo);
    } catch (error) {
      console.error("로고 이미지를 가져오는 중 오류가 발생했습니다:", error);
    }
  };

  const navigate = useNavigate();
  const jobListingClick = (jobListId) => {
    navigate(`/detail/${jobListId}`);
  };

  return (
    <SearchContainer>
      <h1>검색결과</h1>
      <div className="alba-check-container">
        {jobListings.map((job) => (
          <div
            key={job.jobListId}
            className="alba-list"
            onClick={() => jobListingClick(job.jobListId, job.recruitTitle)}
          >
            {job.logoUrl ? (
              <img src={job.logoUrl} alt="logo" />
            ) : (
              <p>로고 이미지를 불러오는 중입니다...</p>
            )}
            <div className="company-info-top">
              <p>{job.companyName}</p>
              <h3>{job.recruitTitle}</h3>
            </div>
            <div className="company-info-bottom">
              <p>{job.companyAddress}</p>
              <p>{job.employmentType}</p>
              <p>월 {job.wage}원</p>
            </div>
          </div>
        ))}
      </div>
    </SearchContainer>
  );
};

export default SearchPage;
