import Header from "@/components/Header";
import Content from "@/components/Content";
import { getSession, signOut } from "next-auth/react";
import db from "@/libs/dbConfig";
import DataMaker from "@/libs/DataMaker";
import { getLogger } from "@/logging/log-util";

export default function Home({ session, data }) {
  if (session.errMsg && typeof window !== "undefined") {
    alert(`${session.errMsg}`);
    signOut({ callbackUrl: "/" });
  }

  const userId = String(session.user.id);
  if (typeof window !== "undefined") {
    const currentBrowserWidth = document.body.offsetWidth;
    const currentScreenHeight = window.screen.height;
    const popupX = currentBrowserWidth / 2 - 400;
    const popupY = currentScreenHeight / 2 - 325;
    const openOption = `width=800,
    height=650,
    left=${popupX},
    top=${popupY},
    resizable=no`;

    if (new URL(location.href).searchParams.get("error")) {
      alert(
        "이미 로그인하셨습니다, 다른계정을 이용하고 싶으시면 로그아웃하시면 됩니다"
      );
    }

    //팝업기능
    if (userId === "notMember") {
      const recognize = JSON.parse(localStorage.getItem("recognize"));
      //비회원 접속시
      if (!recognize) {
        window.open(
          `http://127.0.0.1:3000/NotMemberMannual`,
          "mannaul",
          openOption
        );
      }
    } else {
      const MemberRecognize = JSON.parse(
        localStorage.getItem("MemberRecognize")
      );
      //회원으로 접속시
      if (!MemberRecognize) {
        window.open(
          `http://127.0.0.1:3000/MemberMannual`,
          "mannaul",
          openOption
        );
      }
    }

    localStorage.setItem("isClick", false);
    localStorage.setItem("userId", userId);

    window.addEventListener("beforeunload", (e) => {
      e.preventDefault();
      e.returnValue = "";
    });

    window.addEventListener("unload", () => {
      localStorage.removeItem("data");
      localStorage.removeItem("userId");
      localStorage.removeItem("first");
      localStorage.removeItem("second");
    });

    Array.prototype.arrayIndexOf = function (array) {
      const arrayfy = array.split(", ");
      let result;
      for (let i = 0; i < this.length; i++) {
        if (JSON.stringify(this[i]) === JSON.stringify(arrayfy)) {
          result = i;
        }
      }
      return result;
    };
  }
  return (
    <>
      <Header />
      <Content data={data} />
    </>
  );
}

export const getServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  const logger = getLogger();
  let data;

  if (session.user.id === "notMember") {
    data = DataMaker();
  } else {
    const result = await new Promise((resolve, reject) => {
      db.query(
        "SELECT data FROM userdata WHERE userid=?;",
        [session.user.id],
        (err, data) => {
          if (err) return reject(err);
          resolve(data[0]);
        }
      );
    }).catch((err) => {
      logger.error(err.message);
      session.errMsg =
        "서버에러로인해 로그아웃 시켜드릴테니, 조금이따가 다시 로그인해주십시오";
    });

    if (result === undefined) data = DataMaker();
    else {
      data = JSON.parse(result.data);
    }
  }

  return {
    props: {
      session,
      data,
    },
  };
};
