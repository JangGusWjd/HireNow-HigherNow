// 채용 공고 상세보기 페이지
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import DetailPosting from "./DetailPosting";
import DetailMap from "./DetailMap";
import DetailQuestion from "./DetailQuestion";
import "../style/DetailPage/DetailApp.scss";

const DetailApp = () => {
  const { jobListId } = useParams();
  const [jobPosting, setJobPosting] = useState({});
  const [deadlineExpired, setDeadlineExpired] = useState(false);
  const [deadline, setDeadline] = useState("");
  const [remainTime, setRemainTime] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobPostingData();
  }, []);

  const fetchJobPostingData = async () => {
    try {
      const response = await axios.get(
        `http://49.247.33.67:8080/recruit/${jobListId}`
      );
      setJobPosting(response.data);
      setDeadline(response.data.deadline);
      checkDeadlineExpired(response.data.deadline);
    } catch (error) {
      console.error("해당 채용 공고를 불러오는데 실패했습니다.", error);
    }
  };

  useEffect(() => {
    if (deadline) {
      const currentTime = new Date().getTime();
      const remainMillis = new Date(deadline) - currentTime;

      if (remainMillis <= 0) {
        setRemainTime("마감");
      } else {
        const ramainingTime = calculateRemainTime(remainMillis);
        setRemainTime(ramainingTime);
        checkDeadlineExpired(deadline);
      }

      const interval = setInterval(() => {
        const currentTime = new Date().getTime();
        const remainMillis = new Date(deadline) - currentTime;

        if (remainMillis <= 0) {
          setRemainTime("마감");
          clearInterval(interval);
        } else {
          const ramainingTime = calculateRemainTime(remainMillis);
          setRemainTime(ramainingTime);
          checkDeadlineExpired(deadline);
        }
      }, 60000); // 성능 저하로 인해 1분 단위로 업데이트

      return () => {
        clearInterval(interval);
      };
    }
  }, [deadline]);

  const checkDeadlineExpired = (deadline) => {
    const currentTime = new Date().getTime();
    const remainMillis = new Date(deadline) - currentTime;
    const isExpired = remainMillis <= 0;
    setDeadlineExpired(isExpired);
  };

  const calculateRemainTime = (remainMillis) => {
    const days = Math.floor(remainMillis / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (remainMillis % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((remainMillis % (1000 * 60 * 60)) / (1000 * 60));
    // const seconds = Math.floor((remainMillis % (1000 * 60)) / 1000);

    return `${days}일 ${hours}:${minutes}`;
  };

  const handleApply = () => {
    if (deadlineExpired) {
      alert("지원 마감된 공고입니다.");
      return;
    }
    navigate(`/apply/${jobListId}`);
  };
  return (
    <div className="detail-page-container">
      <DetailPosting
        companyName={jobPosting.companyName}
        recruitTitle={jobPosting.recruitTitle}
        companyInfo={jobPosting.companyInfo}
        employmentType={jobPosting.employmentType}
        wage={jobPosting.wage}
        companyAddress={jobPosting.companyAddress}
      />
      <DetailMap
        latitude={jobPosting.latitude}
        longitude={jobPosting.longitude}
      />
      <DetailQuestion props={jobPosting.jobListId} />
      <button
        onClick={handleApply}
        disabled={deadlineExpired}
        className={deadlineExpired ? "disabled-button" : ""}
      >
        {deadlineExpired ? (
          "지원 마감"
        ) : (
          <div>
            지원하기
            <p>마감까지 {remainTime}</p>
          </div>
        )}
      </button>
    </div>
  );
};

export default DetailApp;
