// 지원자 명단 출력 페이지
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const CheckApplyZip = () => {
  const navigate = useNavigate();
  const jobListId = useParams();
  const [applyData, setApplyData] = useState({});

  useEffect(() => {
    fetchApplyData();
  }, []);

  const fetchApplyData = async () => {
    try {
      const response = await axios.get(
        `http://49.247.33.67:8080/apply/${jobListId}`
      );
      setApplyData(response.data);
    } catch (error) {
      console.error("지원자 명단을 가져오는데 실패했습니다.", error);
    }
  };

  const handleApplyDataClick = (applicationId) => {
    navigate(`/apply-list/${jobListId}/${applicationId}`);
  };

  return (
    <div>
      <h1>지원자 명단</h1>
      {applyData.map((data) => (
        <div
          key={data.applicationId}
          onClick={() => handleApplyDataClick(data.applicationId)}
        >
          <p>{data.name}</p>
          <p>{data.createdTime}</p>
        </div>
      ))}
    </div>
  );
};

export default CheckApplyZip;
