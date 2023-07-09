// 모집 공고 상단에 표시하는 컴포넌트
import styled from "styled-components";
import "../style/DetailPage/DetailPosting.scss";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const DetailPosting = (props) => {
  const PostingContainer = styled.div`
    width: 100%;
    height: 17rem;
    border-radius: 0.4rem;
    border: 1px solid #c6c6c6;
    margin-top: 5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  `;

  const { companyName } = props;
  const { jobListId } = useParams();

  const [logoUrl, setLogoUrl] = useState("");

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const response = await axios.get(
          `http://49.247.33.67:8080/logo/${jobListId}`,
          {
            responseType: "blob",
          }
        );

        const reader = new FileReader();
        reader.onloadend = () => {
          setLogoUrl(reader.result);
        };
        reader.readAsDataURL(response.data);
      } catch (error) {
        console.log("Error fetching logo:", error);
      }
    };

    fetchLogo();
  }, [jobListId]);

  return (
    <PostingContainer>
      <div className="postingContainer-top">
        {logoUrl ? (
          <img src={logoUrl} alt="로고" />
        ) : (
          <p>로고를 불러오는 중입니다...</p>
        )}
        <div>
          <h1>모집 공고 제목</h1>
          {/* <p>companyInfo</p> */}
          {/* companyInfo 들어갈 자리 */}
          <p style={{ color: "grey", fontSize: "1.25rem" }}>{companyName}</p>
        </div>
      </div>
      <div className="postingContainer-bottom">
        <p>월급</p>
        <p>급여</p>
      </div>
    </PostingContainer>
  );
};

export default DetailPosting;
