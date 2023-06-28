"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import saveIcon from "/public/image/saveIcon.png";
import LogoutIcon from "/public/image/Logout.png";
import { signOut } from "next-auth/react";
import axios from "axios";
import Spinner from "./Header-component/spinner";

const Header = ({ userid }) => {
  const [sidebarClick, setSidebarClick] = useState(true);
  const SpinnerRef = useRef();
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

  const SaveEvent = async (userid) => {
    const Spinner = SpinnerRef.current;
    const SpinnerChildren = Spinner.firstChild.children;
    Spinner.classList.toggle("invisible");
    SpinnerChildren[1].innerText = "저장중";
    const data = JSON.parse(localStorage.getItem("data"));
    try {
      const result = await axios.post(`/api/save?userid=${userid}`, { data });
      if (result.data.success) alert("저장 성공!");
      else
        alert(
          "서버쪽에 문제가 있어 저장이 실패했습니다. 잠시후 다시 시도해주세요"
        );
    } catch (error) {
      alert("저장중에 에러가 발생했습니다. 잠시후 다시시도해주세요.");
    }
    SpinnerRef.current.classList.toggle("invisible");
  };

  const SignOutEvent = () => {
    const Spinner = SpinnerRef.current;
    const SpinnerChildren = Spinner.firstChild.children;
    Spinner.classList.toggle("invisible");
    SpinnerChildren[1].innerText = "로그아웃 하는중";
    signOut({ callbackUrl: `/` });
  };

  return (
    <div className='h-header bg-blue-200 flex justify-between select-none'>
      <span
        className='text-5xl ml-15 cursor-pointer w-fit'
        onClick={sideBarEvent}
      >
        {sidebarClick ? "☒" : "▶"}
      </span>
      <div className='flex mr-4'>
        <Image
          alt='Logout'
          src={LogoutIcon}
          width={60}
          height={60}
          onClick={SignOutEvent}
          className='cursor-pointer hover:bg-blue-300 transition-all'
          title='로그아웃'
        />
        <Image
          alt='saveIcon'
          src={saveIcon}
          width={50}
          height={90}
          onClick={() => SaveEvent(userid)}
          className='cursor-pointer hover:bg-blue-300 transition-all'
          title='저장하기'
        />
        <Spinner SpinnerRef={SpinnerRef} />
      </div>
    </div>
  );
};

export default Header;
