// 모집 공고 상단에 표시하는 컴포넌트
import styled from "styled-components";

const DetailPosting = (props) => {
  const PostingContainer = styled.div`
    width: 100%;
    height: 17rem;
    border-radius: 0.3125rem;
    border: 1px solid #c6c6c6;
    margin-top: 5rem;
    padding: 0 1.5rem;
  `;

  const { companyName } = props;
  return (
    <PostingContainer>
      <h1>모집 공고 제목</h1>
      <p style={{ color: "grey", fontSize: "1.25rem" }}>{companyName}</p>
      <hr />
    </PostingContainer>
  );
};

export default DetailPosting;
