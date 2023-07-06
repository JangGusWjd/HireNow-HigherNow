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
  return (
    <div className="page-body">
      <header>
        <div className="header-top">
          <div className="header-logo">
            <Logo to="/">
              <h1>HIRENOW</h1>
            </Logo>
            <input type="text" placeholder="어떤 알바를 찾으세요?" />
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
            <li>이력서 등록</li>
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
