import { NextPage } from "next";
import { AiOutlineComment, AiOutlineLike } from "react-icons/ai";
import AdminLayout from "../../components/admin/AdminLayout";
import AppUsers from "../../components/AppUsers";
import Elements from "../../components/Elements";
import MostActiveUsers from "../../components/MostActiveUsers";

const users: NextPage = () => {
  return (
    <AdminLayout headTitle="Dashboard - Admin">
      <div>
        <Elements.Heading.H3>Users With Accounts</Elements.Heading.H3>

        <div className="min-w-[350px]">
          <MostActiveUsers />
        </div>
      </div>
    </AdminLayout>
  );
};

export default users;
