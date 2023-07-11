// 지원서 하나만 출력하는 페이지
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const CheckApplySingle = () => {
  const { jobListId, applicationId } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://49.247.33.67:8080/apply/${jobListId}/${applicationId}`
      );
      setData(response.data);
    } catch (error) {
      console.error("개별 지원서를 가져오는데 실패했습니다.", error);
    }
  };

  return (
    <div>
      <h1>지원서 출력</h1>
      <p>{data.name}</p>
      <p>{data.gender}</p>
      <p>{data.age}</p>
      <p>{data.answer1}</p>
      <p>{data.answer2}</p>
      <p>{data.answer3}</p>
    </div>
  );
};

export default CheckApplySingle;
