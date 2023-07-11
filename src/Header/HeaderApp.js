import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import "../style/Header/HeaderApp.scss";
import styled from "styled-components";

const HeaderApp = () => {
  const Logo = styled(Link)`
    text-decoration: none;
  `;

  const MenuLink = styled(Link)`
    text-decoration: none;
    color: #1c1b1a;

    &:hover {
      color: #228b22;
    }
  `;

  const [keyword, setKeyword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    window.location.href = `/recruit/search/keyword=${encodeURIComponent(
      keyword
    )}`;
  };

  return (
    <div className="page-body">
      <header>
        <div className="header-top">
          <div className="header-logo">
            <Logo to="/">
              <h1>HIRENOW</h1>
            </Logo>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="어떤 알바를 찾으세요?"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
              />
              <button type="submit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="27"
                  height="24"
                  viewBox="0 0 27 24"
                  fill="none"
                >
                  <path
                    d="M21.7741 21L14.9963 14.7C14.4583 15.1 13.8397 15.4167 13.1404 15.65C12.4411 15.8833 11.697 16 10.908 16C8.95358 16 7.29965 15.3707 5.94624 14.112C4.59282 12.8533 3.91576 11.316 3.91504 9.5C3.91504 7.68333 4.5921 6.146 5.94624 4.888C7.30037 3.63 8.9543 3.00067 10.908 3C12.8625 3 14.5164 3.62933 15.8698 4.888C17.2233 6.14667 17.9003 7.684 17.901 9.5C17.901 10.2333 17.7755 10.925 17.5245 11.575C17.2735 12.225 16.9328 12.8 16.5024 13.3L23.2803 19.6L21.7741 21ZM10.908 14C12.2528 14 13.3961 13.5623 14.3378 12.687C15.2796 11.8117 15.7501 10.7493 15.7493 9.5C15.7493 8.25 15.2785 7.18733 14.3368 6.312C13.395 5.43667 12.2521 4.99933 10.908 5C9.56323 5 8.41996 5.43767 7.47824 6.313C6.53652 7.18833 6.06601 8.25067 6.06673 9.5C6.06673 10.75 6.53759 11.8127 7.47932 12.688C8.42104 13.5633 9.56395 14.0007 10.908 14Z"
                    fill="#228B22"
                  />
                </svg>
              </button>
            </form>
          </div>
          <div className="header-login">
            <p>로그인</p>
            <p>회원가입</p>
          </div>
        </div>
        <div className="header-bottom">
          <ul className="menu-list">
            <li>채용정보</li>
            <li>개인서비스</li>
            <li>인재정보</li>
            <li>알바토크</li>
            <li>고객센터</li>
          </ul>
          <ul className="register-list">
            <MenuLink to="/check">
              <li>지원 현황</li>
            </MenuLink>
            <MenuLink to="/job-post">
              <li>공고 등록</li>
            </MenuLink>
          </ul>
        </div>
      </header>
      <Outlet />
    </div>
  );
};

export default HeaderApp;
