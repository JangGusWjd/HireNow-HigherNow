import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../style/CheckPage/CheckPassword.scss";
import "../style/CheckPage/CheckResultList.scss";
import styled from "styled-components";
import DetailPosting from "../DetailPage/DetailPosting";

const CheckPassword = ({
  jobListId,
  companyName,
  recruitTitle,
  companyInfo,
  employmentType,
  wage,
  companyAddress,
}) => {
  const Container = styled.div`
    width: 100%;
    max-width: 1024px;
    margin: 0 auto;
  `;
  const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
  `;
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
      const result = response.data;
      setData(result);
      navigate(`/apply-list/${jobListId}`);
    } catch (error) {
      console.log("비밀번호 전송에 실패했습니다.", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return data.length > 0 ? (
    <Container>
      <DetailPosting
        companyName={companyName}
        recruitTitle={recruitTitle}
        companyInfo={companyInfo}
        employmentType={employmentType}
        wage={wage}
        companyAddress={companyAddress}
      />
      <div className="result-list">
        <h2>지원자 명단</h2>
        <table>
          <thead>
            <tr>
              <th>이름</th>
              <th>제출 시간</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.applicationId}>
                {/* <p>Application ID: {item.applicationId}</p> */}
                <td>
                  <StyledLink
                    to={`/apply-list/${jobListId}/${item.applicationId}`}
                  >
                    {/* Name:{" "} */}
                    {item.name}
                  </StyledLink>
                </td>
                <td>{item.createdTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  ) : (
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
};

export default CheckPassword;
