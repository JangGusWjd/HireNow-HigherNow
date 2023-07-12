import { useNavigate } from "react-router-dom";
import "../style/PopularAlbaPage/PopularList.scss";

const PopularList = ({ jobListings }) => {
  const navigate = useNavigate();
  const goJobPost = (jobListId) => {
    navigate(`/detail/${jobListId}`);
  };

  return (
    <div className="popular-list-container">
      <h1>인기순 채용 공고</h1>
      {jobListings.map((job) => (
        <div
          key={job.jobListId}
          className="popular-list-single"
          onClick={() => goJobPost(job.jobListId)}
        >
          {job.logoUrl ? (
            <img src={job.logoUrl} alt="logo" />
          ) : (
            <p>로고 이미지를 불러오는 중입니다...</p>
          )}
          <div>
            <p>
              {job.companyName}
              <span>{job.companyInfo}</span>
            </p>
            <p>{job.recruitTitle}</p>
            <p>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M15 4.5L11 8.5L7 10L5.5 11.5L12.5 18.5L14 17L15.5 13L19.5 9M9 15L4.5 19.5M14.5 4L20 9.5"
                    stroke="#FFC700"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              근무지역: {job.companyAddress}
            </p>
            <p>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M15 4.5L11 8.5L7 10L5.5 11.5L12.5 18.5L14 17L15.5 13L19.5 9M9 15L4.5 19.5M14.5 4L20 9.5"
                    stroke="#FFC700"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              {job.employmentType}
            </p>
            <p>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M15 4.5L11 8.5L7 10L5.5 11.5L12.5 18.5L14 17L15.5 13L19.5 9M9 15L4.5 19.5M14.5 4L20 9.5"
                    stroke="#FFC700"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              월 {job.wage}원
            </p>
            <p>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M15 4.5L11 8.5L7 10L5.5 11.5L12.5 18.5L14 17L15.5 13L19.5 9M9 15L4.5 19.5M14.5 4L20 9.5"
                    stroke="#FFC700"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              채용마감: {job.deadline}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PopularList;
