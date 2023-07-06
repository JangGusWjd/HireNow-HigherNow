import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

const JobPostApp = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    companyInfo: "",
    question1: "",
    question2: "",
    question3: "",
    password: "",
    confirmPassword: "",
    file: null,
  });

  const [passwordError, setPasswordError] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "file") {
      setFormData({ ...formData, file: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setPasswordError(true);
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "confirmPassword") {
        data.append(key, value);
      }
    });

    fetch("http://49.247.33.67:8080/recruit", {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("전송 완료:", data);
        alert("전송이 성공적으로 완료되었습니다.");
      })
      .catch((error) => {
        console.error("오류 발생:", error);
        alert("전송 중 오류가 발생했습니다.");
      });
  };

  return (
    <Card style={{ maxWidth: 800, margin: "0 auto", marginTop: 50 }}>
      <CardContent>
        <Typography variant="h5" component="div" style={{ marginBottom: 20 }}>
          회사 공고 작성
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="회사명을 입력해주세요"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="지원자에게 소개할 회사정보를 입력해주세요"
                name="companyInfo"
                value={formData.companyInfo}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="지원자에게 전달할 1번문항을 입력해주세요"
                name="question1"
                value={formData.question1}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="지원자에게 전달할 2번문항을 입력해주세요"
                name="question2"
                value={formData.question2}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="지원자에게 전달할 3번문항을 입력해주세요"
                name="question3"
                value={formData.question3}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="password"
                label="비밀번호를 입력해주세요"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={passwordError}
                helperText={passwordError && "비밀번호가 일치하지 않습니다."}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="password"
                label="비밀번호 확인"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={passwordError}
              />
            </Grid>
            <Grid item xs={12}>
              <input type="file" name="file" onChange={handleChange} />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default JobPostApp;
