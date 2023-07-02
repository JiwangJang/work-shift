import Thead from "@/components/Content-component/Calender-component/Thead";
import Tbody from "@/components/Content-component/Calender-component/Tbody";
import db from "@/libs/dbConfig";

const getUserData = async (code) => {
  const [userData] = await db.execute(
    "SELECT data FROM userdata WHERE userid=(SELECT id FROM userinfo WHERE sharecode=?);",
    [code]
  );
  return userData[0]?.data;
};

const Page = async ({ params }) => {
  const mainData = await getUserData(params.code);
  return (
    <table
      className='w-4/5 h-[90%] relative top-[50%] left-[50%] translate-x-[-50%] 
                translate-y-[-50%] shadow-2xl rounded-xl bg-slate-200 select-none'
    >
      <Thead year={mainData.Year} month={mainData.Month} />
      <Tbody mainData={mainData} mode={"read"} />
    </table>
  );
};

export default Page;
