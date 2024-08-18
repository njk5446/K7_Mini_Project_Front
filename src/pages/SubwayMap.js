import React, { useEffect } from "react";
import imageMap from "image-map";

// CSS reset을 위한 스타일 추가
const globalStyle = `
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow: hidden; /* 스크롤바를 숨깁니다. */
  }
  #root {
    height: 100%;
    display: flex;
    flex-direction: column; /* 수직 방향으로 정렬 */
    overflow: hidden; /* 스크롤을 숨깁니다. */
  }
`;

const SubwayMap = () => {

    useEffect(() => {
        imageMap('myImage'); // img 태그의 id 속성명
    }, []);

    const handleClick = (e) => {
        e.preventDefault();
        alert(e.target.getAttribute('data-message'));
    }

    return (
      <div style={{
        width: '100vw',
        height: 'calc(98vh - 80px)', // 전체 화면 높이에서 메뉴바 높이를 제외
        overflow: 'hidden', // 스크롤바 숨기기
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '0px', // 상단 여백을 제거
      }}
    >
        <style>{globalStyle}</style> {/* CSS reset을 위한 스타일 추가 */}
        <img
            id="myImage"
            src="/busan_station.png"
            alt="Station"
            useMap="#image-map"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
        {/* <map name="image-map">
          <area
            shape="circle"
            coords="414,126,228"
            href="#"
            data-message="가위"
            alt="Area 1"
            onClick={handleClick}
          />
          <area
            shape="circle"
            coords="1017,255,157"
            href="#"
            data-message="바위"
            alt="Area 2"
            onClick={handleClick}
          />
          <area
            shape="circle"
            coords="562,636,221"
            href="#"
            data-message="보"
            alt="Area 3"
            onClick={handleClick}
          />
        </map> */}
      </div>
    );
};

export default SubwayMap;
