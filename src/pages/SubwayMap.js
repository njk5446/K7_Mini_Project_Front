import React, { useEffect } from "react";
import imageMap from "image-map";


const SubwayMap = () => {

    useEffect (() => {
        imageMap('myImage') // img 태그의 id 속성명
    },[])

    const handleClick = (e) => {
        e.preventDefault();
        alert(e.target.getAttribute('data-message'));
    }

    return (
        <div style={{
            position: 'sticky', 
            height: 'calc(100vh - 80px)', 
            overflow: 'hidden', // 부모 div를 넘지 않도록
            width: '100%' // 부모 div의 너비를 100%로 설정
        }}>
        <img
            id="myImage"
            src="http://192.168.0.126:8080/images/station.png"
            alt="Station"
            style={{
                position: 'absolute', // 이미지 위치를 부모 div에 대해 절대적으로 설정
                top: 0,
                left: 0,
                width: '90%', // 이미지 너비를 부모 div에 맞춤
                height: '90%', // 이미지 높이를 부모 div에 맞춤
                objectFit: 'scale-down', // 이미지가 부모 div에 맞게 꽉 차도록 설정
            }}
            useMap="#image-map"
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
    )

    
};

export default SubwayMap;

