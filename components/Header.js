import { useState } from "react";
import Image from "next/image";
import saveIcon from "/public/image/saveIcon.png";
import LogoutIcon from "/public/image/Logout.png";
import Contact from "/public/image/contact.png";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
  const [sidebarClick, setSidebarClick] = useState(true);
  const { data } = useSession();
  const userId = data?.user.id;

  const sideBarEvent = () => {
    if (sidebarClick) {
      document.querySelector(".SideBar").style.left = "-100%";
      document.querySelector(".calender").style.right = "0";
    } else {
      document.querySelector(".SideBar").style.left = "0";
      document.querySelector(".calender").style.right = "-20%";
    }

    setSidebarClick(!sidebarClick);
  };

  const SaveEvent = async (userId) => {
    const data = {
      ...JSON.parse(localStorage.getItem("data")),
      recognize: JSON.parse(localStorage.getItem("memberRecognize")),
    };

    fetch("/api/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        data: JSON.stringify(data),
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res.msg);
      })
      .catch(() => {
        console.error("서버쪽 에러발생");
        alert("에러가 발생했습니다, 잠시 후 다시시도해주십시오");
      });
  };

  const question = (userId) => {
    const currentBrowserWidth = document.body.offsetWidth;
    const currentScreenHeight = window.screen.height;
    const popupX = currentBrowserWidth / 2 - 400;
    const popupY = currentScreenHeight / 2 - 325;
    const openOption = `width=800,
    height=650,
    left=${popupX},
    top=${popupY},
    resizable=no`;

    if (userId === "notMember") {
      window.open(`/NotMemberMannual`, "mannaul", openOption);
    } else {
      window.open(`/MemberMannual`, "mannaul", openOption);
    }
  };

  return (
    <div className='h-header bg-blue-200 flex justify-between'>
      <span
        className='text-5xl ml-15 cursor-pointer w-fit'
        onClick={sideBarEvent}
      >
        {sidebarClick ? "☒   " : "▶"}
      </span>

      <div className='flex'>
        <Image
          alt='Contact'
          src={Contact}
          width={60}
          height={60}
          onClick={() => question(userId)}
          className='cursor-pointer'
          title='중요한 사항 다시보기'
        />
        <Image
          alt='Logout'
          src={LogoutIcon}
          width={60}
          height={60}
          onClick={() => signOut({ callbackUrl: `/` })}
          className='cursor-pointer ml-3'
          title='로그아웃'
        />
        {userId !== "notMember" ? (
          <Image
            alt='saveIcon'
            src={saveIcon}
            width={50}
            height={90}
            onClick={() => SaveEvent(userId)}
            className='cursor-pointer ml-3'
            title='저장하기'
          />
        ) : null}
      </div>
    </div>
  );
}
