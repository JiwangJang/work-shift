import Thead from "../Content-component/Calender-component/Thead";
import Tbody from "../Content-component/Calender-component/Tbody";
import db from "@/libs/dbConfig";

const getUserData = async (code) => {
  const [userData] = await db.execute(
    "SELECT data FROM userdata WHERE userid=(SELECT id FROM userinfo WHERE sharecode='$2b$12$YEVUAhkUGFOJJkQfasfe4OLpk6lyDCtW64ZRF5X.x5h9lKYVYr7B222');",
    [userid]
  );
  return userData[0]?.data.data;
};

const Page = async ({ params }) => {
  const mainData = await getUserData(params.code);
  return (
    <table className='w-5/6 h-table shadow-2xl rounded-x bg-slate-200'>
      <Thead year={mainData.Year} month={mainData.Month} />
      <Tbody mainData={mainData} />
    </table>
  );
};

export default Page;
