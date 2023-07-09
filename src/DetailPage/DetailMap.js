// 채용 회사의 위치 지도 표시하기
import "../style/DetailPage/DetailMap.scss";
import { useEffect } from "react";

const { kakao } = window;

const DetailMap = (props) => {
  const { latitude, longitude } = props;
  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(latitude, longitude),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);

    const marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(latitude, longitude),
      map: map,
    });
  });
  return (
    <div className="map-container">
      <h2>근무 지역</h2>
      <div id="map" style={{ width: "1000px", height: "300px" }}></div>
    </div>
  );
};

export default DetailMap;
