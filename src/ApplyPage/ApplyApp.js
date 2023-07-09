import CompanyConfirm from "./CompanyConfirm";
import styled from "styled-components";

const ApplyApp = () => {
  const ApplyContainer = styled.div`
    width: 100%;
    max-width: 1024px;
    margin: 0 auto;
    margin-top: 3rem;
  `;
  return (
    <ApplyContainer>
      <h1>지원서 작성</h1>
      <hr />
      <CompanyConfirm />
    </ApplyContainer>
  );
};

export default ApplyApp;
