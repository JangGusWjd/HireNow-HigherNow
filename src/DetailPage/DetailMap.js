// 채용 회사의 위치 지도 표시하기
import { useEffect } from "react";

const { kakao } = window;

const DetailMap = () => {
  useEffect(() => {
    const container = document.getElementById("map");
    const options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);

    const marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(33.450701, 126.570667),
      map: map,
    });
  });
  return (
    <div>
      <h2>근무 지역</h2>
      <div id="map" style={{ width: "1000px", height: "300px" }}></div>
    </div>
  );
};

export default DetailMap;
