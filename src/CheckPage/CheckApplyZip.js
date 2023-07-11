import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CheckPassword from "./CheckPassword";
import CheckApplySingle from "./CheckApplySingle";
const CheckApplyZip = () => {
  const { jobListId } = useParams();

  // const [selectedRecruitTitle, setSelectedRecruitTitle] = useState(null);
  const [selectedJob, setSelectedJob] = useState([]);

  useEffect(() => {
    fetchJobTitle();
    // fetch recruit title using jobListId if needed
    // setSelectedRecruitTitle(recruitTitle);
  }, []);

  const fetchJobTitle = async () => {
    try {
      const response = await axios.get(
        `http://49.247.33.67:8080/recruit/${jobListId}`
      );
      setSelectedJob(response.data);
    } catch (error) {
      console.error("채용 제목 불러오기 실패", error);
    }
  };

  return (
    <div>
      {jobListId && (
        <CheckPassword
          jobListId={jobListId}
          companyName={selectedJob.companyName}
          recruitTitle={selectedJob.recruitTitle}
          companyInfo={selectedJob.companyInfo}
          employmentType={selectedJob.employmentType}
          wage={selectedJob.wage}
          companyAddress={selectedJob.companyAddress}
        />
      )}
    </div>
  );
};

export default CheckApplyZip;
