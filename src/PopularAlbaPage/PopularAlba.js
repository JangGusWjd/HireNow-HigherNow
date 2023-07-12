import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/PopularAlbaPage/PopularAlba.scss";
import PopularList from "./PopularList";

function PopularAlba() {
  const [jobListings, setJobListings] = useState([]);
  const [topLists, setTopLists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobListings();
  }, []);

  const fetchJobListings = async () => {
    try {
      const response = await fetch("http://49.247.33.67:8080/recruit"); // API 엔드포인트로의 요청
      const data = await response.json();
      setJobListings(data);
      setTopLists(data.slice(0, 3));
      fetchJobLogo(data);
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
      setTopLists(jobPostingsWithLogo.slice(0, 3));
    } catch (error) {
      console.error("로고 이미지를 가져오는 중 오류가 발생했습니다:", error);
    }
  };

  const handleJobClick = (jobListId) => {
    navigate(`/detail/${jobListId}`);
  };

  return (
    <div>
      <div className="popular-top3-body">
        <h1>실시간 Hot 공고</h1>
        <h3>가장 인기있는 채용 공고를 확인하세요</h3>
        <div className="popular-top3-container">
          {topLists.map((job) => (
            <div
              key={job.jobListId}
              className="popular-top3-list"
              onClick={() => handleJobClick(job.jobListId)}
            >
              <div className="alba-info-top">
                <p>{job.companyName}</p>
                <p>{job.recruitTitle}</p>
              </div>
              {job.logoUrl ? (
                <img src={job.logoUrl} alt="logo" />
              ) : (
                <p>로고 이미지를 불러오는 중입니다...</p>
              )}
              <div className="alba-info-bottom">
                <p>{job.companyInfo}</p>
                <div>
                  <p>{job.employmentType}</p>
                  <p>월 {job.wage}원</p>
                </div>
                <hr></hr>
                <p className="address">{job.companyAddress}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <PopularList jobListings={jobListings} />
    </div>
  );
}

export default PopularAlba;
