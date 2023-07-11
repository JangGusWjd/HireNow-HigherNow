import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/CheckPage/CheckPassword.scss";

const CheckPassword = ({ jobListId, recruitTitle }) => {
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await axios.post(
        `http://49.247.33.67:8080/apply/${jobListId}`,
        {
          password: password,
        }
      );
      const result = await response.data;
      setData(result);
      console.log(result);
      navigate(`/apply-list/${jobListId}`);
    } catch (error) {
      console.log({ jobListId });
      console.log("비밀번호 전송에 실패했습니다.", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  if (data.length > 0) {
    return (
      <div className="result-list">
        <h2>결과 리스트:</h2>
        <ul>
          {data.map((item) => (
            <li key={item.applicationId}>
              <p>Application ID: {item.applicationId}</p>
              <p>Name: {item.name}</p>
              <p>Created Time: {item.createdTime}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    return (
      <div className="check-password-container">
        <div className="check-password">
          <h1>{recruitTitle}</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={handleChangePassword}
            />
            <button type="submit">확인</button>
          </form>
        </div>
      </div>
    );
  }
};

export default CheckPassword;
