import MannualLayout from "@/components/MannualLayout";

const NotMemberMannaul = () => {
  return (
    <MannualLayout>
      <p>
        현재 귀하께선 <u>비회원상태로</u> 접속중이십니다
      </p>
      <p>
        비회원이실 경우 서버에 저장하는 기능이 <u>제한</u>됩니다
      </p>
      <p>
        서버저장 기능을 이용하고 싶으실 경우 <u>로그인</u>하셔서 이용하시면
        이용가능합니다
      </p>
    </MannualLayout>
  );
};
export default NotMemberMannaul;
