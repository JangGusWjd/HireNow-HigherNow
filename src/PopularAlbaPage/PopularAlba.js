import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

function PopularAlba() {
  const [jobListings, setJobListings] = useState([]);

  useEffect(() => {
    fetchJobListings();
  }, []);

  const fetchJobListings = async () => {
    try {
      const response = await fetch("http://49.247.33.67:8080/recruit"); // API 엔드포인트로의 요청
      const data = await response.json();
      setJobListings(data);
    } catch (error) {
      console.error("Error fetching job listings:", error);
    }
  };

  return (
    <div>
      <h1>실시간 Hot 공고</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>제목</TableCell>
            <TableCell>회사</TableCell>
            <TableCell>주소</TableCell>
            <TableCell>고용형태</TableCell>
            <TableCell>임금</TableCell>
            <TableCell>마감기한</TableCell>
            <TableCell>회사정보</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobListings.map((job) => (
            <TableRow key={job.jobListId}>
              <TableCell>
                <Link to={`/detail/${job.jobListId}`}>{job.recruitTitle}</Link>
              </TableCell>
              <TableCell>{job.companyName}</TableCell>
              <TableCell>{job.companyAddress}</TableCell>
              <TableCell>{job.employmentType}</TableCell>
              <TableCell>{job.wage}원</TableCell>
              <TableCell>{job.deadline}</TableCell>
              <TableCell>{job.companyInfo}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default PopularAlba;
