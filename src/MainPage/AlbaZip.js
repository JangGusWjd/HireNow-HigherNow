import styled from "styled-components";
import "../style/MainPage/AlbaZip.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// const jobData = [
//   {
//     id: 1,
//     companyName: "쿠팡",
//     jobTitle: "공고 제목1",
//     logoImage:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgZOKF-YHVHafbP3gfaCVRUP4HkwnS6IccH2P20IPu&s",
//   },
//   {
//     id: 2,
//     companyName: "카카오톡",
//     jobTitle: "공고 제목 2",
//     logoImage:
//       "https://play-lh.googleusercontent.com/Ob9Ys8yKMeyKzZvl3cB9JNSTui1lJwjSKD60IVYnlvU2DsahysGENJE-txiRIW9_72Vd",
//   },
//   {
//     id: 3,
//     companyName: "배달의 민족",
//     jobTitle: "공고 제목 3",
//     logoImage: "https://woowahan-cdn.woowahan.com/static/image/share_kor.jpg",
//   },
//   {
//     id: 4,
//     companyName: "네이버",
//     jobTitle: "공고 제목 3",
//     logoImage: "https://www.navercorp.com/img/ko/og/logo.png",
//   },
//   {
//     id: 5,
//     companyName: "네이버",
//     jobTitle: "공고 제목 3",
//     logoImage: "https://www.navercorp.com/img/ko/og/logo.png",
//   },
// ];

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
  const navigate = useNavigate();
  useEffect(() => {
    fetchJobPostings();
  }, []);

  const fetchJobPostings = async () => {
    try {
      const response = await axios.get("http://49.247.33.67:8080/recruit");
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
      <Title>채용 공고 모아보기</Title>
      <div className="alba-container">
        {jobPostings.map((jobPosting) => (
          <div
            key={jobPosting.jobListId}
            className="alba-list"
            onClick={() => handleJobPostingClick(jobPosting.companyName)}
          >
            <h3>{jobPosting.companyName}</h3>
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
