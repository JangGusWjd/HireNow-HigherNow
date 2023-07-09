import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const JobPostApp = () => {
  const [formData, setFormData] = useState({
    recruitTitle: "",
    companyName: "",
    companyAddress: "",
    // latitude: null,
    // longitude: null,
    companyInfo: "",
    employmentType: "",
    wage: "",
    question1: "",
    question2: "",
    question3: "",
    deadline: "",
    password: "",
    confirmPassword: "",
    file: null,
  });

  // useEffect(() => {}, [formData]);

  const [passwordError, setPasswordError] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "file") {
      setFormData({ ...formData, file: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const renderTimeOptions = () => {
    const options = [];

    for (let hour = 0; hour <= 23; hour++) {
      const formatHour = hour.toString().padStart(2, "0");
      const timeLabel = `${formatHour}:00`;
      options.push(
        <option key={formatHour} value={formatHour}>
          {timeLabel}
        </option>
      );
    }
    return options;
  };

  // const handleTimeChange = (e) => {
  //   const newSelectedTime = e.target.value;
  //   setSelectedTime(newSelectedTime);
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     deadline: `${selectedDate} ${newSelectedTime}:00:00`,
  //   }));
  // };

  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     deadline: `${date} ${selectedTime}:00:00`,
  //   }));
  // };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    updateDeadline(date, selectedTime);
  };

  const handleTimeChange = (e) => {
    const time = e.target.value;
    setSelectedTime(time);
    updateDeadline(selectedDate, time);
  };

  const updateDeadline = (date, time) => {
    if (date && time) {
      const formattedDate = date.toISOString().split("T")[0];
      const deadline = `${formattedDate} ${time}:00:00`;
      setFormData((prevFormData) => ({
        ...prevFormData,
        deadline: deadline,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        deadline: "",
      }));
    }
  };

  // const handleClock = () => {
  //   console.log(formData);
  // };

  // const handleClock = () => {
  //   const deadline = `${
  //     selectedDate.toISOString().split("T")[0]
  //   } ${selectedTime}:00:00`;
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     deadline: deadline,
  //   }));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setPasswordError(true);
      return;
    }

    try {
      const geocodingAPIKey = "AIzaSyBRpARVc5rjCBiJHU8riyw8OqdAJY6UqZ8";
      const { companyAddress } = formData;

      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          companyAddress
        )}&key=${geocodingAPIKey}`
      );

      const { lat, lng } = response.data.results[0].geometry.location;

      const updatedFormData = {
        ...formData,
        latitude: lat,
        longitude: lng,
      };

      const data = new FormData();
      Object.entries(updatedFormData).forEach(([key, value]) => {
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
    } catch (error) {
      console.error("주소를 변환하는데 실패했습니다.", error);
    }
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
                label="채용 공고 제목을 입력해주세요"
                name="recruitTitle"
                value={formData.recruitTitle}
                onChange={handleChange}
              />
            </Grid>
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
                label="회사 주소를 입력해주세요"
                name="companyAddress"
                value={formData.companyAddress}
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
              <FormControl fullWidth>
                <InputLabel id="employmentType-label">고용 형태</InputLabel>
                <Select
                  labelId="employmentType-label"
                  id="employmentType"
                  name="employmentType"
                  value={formData.employmentType}
                  onChange={handleChange}
                >
                  <MenuItem value="정규직">정규직</MenuItem>
                  <MenuItem value="비정규직">비정규직</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="급여"
                name="wage"
                value={formData.wage}
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
              <p>마감 시간: </p>
              <DatePicker selected={selectedDate} onChange={handleDateChange} />
              <select value={selectedTime} onChange={handleTimeChange}>
                <option value="">시간 선택</option>
                {renderTimeOptions()}
              </select>
              {/* <button onClick={handleClock}>마감 시간 선택</button> */}
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
