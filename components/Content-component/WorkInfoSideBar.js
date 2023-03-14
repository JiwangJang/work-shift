import Register from "./WorkInfoSideBar-component/Register";
import List from "./WorkInfoSideBar-component/List";
import Order from "./WorkInfoSideBar-component/Order";

export default function WorkInfoSideBar() {
  return (
    <div className='flex flex-col h-full fixed SideBar bg-slate-200 w-1/5 transition-all ease-in-out'>
      <Register />
      <List />
      <Order />
    </div>
  );
}
