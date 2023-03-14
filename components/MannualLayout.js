export default function MannualLayout({ children }) {
  return (
    <div className='h-600 flex flex-col justify-around items-center font-popup text-3xl '>
      <p>
        우선 제 서비스를 이용해주심에 감사드리며, 중요사항만 안내해
        드리겠습니다.
      </p>
      {children}
      <p>
        불편하신 사항은 <u>jiwang0917@naver.com</u>으로 연락주시면
        도와드리겠습니다
      </p>
      <p> 감사합니다</p>
      <button
        onClick={() => {
          localStorage.setItem("MemberRecognize", true);
          alert(
            "이제 더 이상 이창은 뜨지 않습니다. 다시보고 싶으시다면 우측상단의 물음표를 눌러주세요"
          );
          window.close();
        }}
        className='px-10 h-1/10 rounded-xl border-none bg-yellow-300'
        title='그만보기'
      >
        애를 누르면 이 창이 제거됩니다
      </button>
    </div>
  );
}
