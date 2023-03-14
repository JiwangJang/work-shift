import MannualLayout from "@/components/MannualLayout";

export default function MemberMannual() {
  return (
    <MannualLayout>
      <p>
        근무표를 작성하신뒤 꼭 <u>저장버튼을 한 번 클릭해주십시오</u>
      </p>
      <p>그렇지 않으면 새로고침이나 창을 껐을때 고심하며 작성하신</p>
      <p>
        <u>근무표가 사라지는</u> 안타까운 상황이 발생할 수 있습니다..
      </p>
    </MannualLayout>
  );
}
