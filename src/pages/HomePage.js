const HomePage = () => {

    return (
        <div style={{
            position: 'relative', // 자식 요소의 절대 위치 조정을 가능하게 함
            height: 'calc(100vh - 80px)', // 화면 높이에서 메뉴바 높이(80px)만큼 빼줌
            overflow: 'hidden', // 부모 div를 넘지 않도록
            width: '100%' // 부모 div의 너비를 100%로 설정
        }}>
            <img
                src="http://192.168.0.126:8080/images/station.png"
                alt="Station"
                style={{
                    position: 'absolute', // 이미지 위치를 부모 div에 대해 절대적으로 설정
                    top: 0,
                    left: 0,
                    width: '100%', // 이미지 너비를 부모 div에 맞춤
                    height: '100%', // 이미지 높이를 부모 div에 맞춤
                    objectFit: 'scale-down', // 이미지가 부모 div에 맞게 꽉 차도록 설정
                }}
            />
        </div>
    );
}
export default HomePage;