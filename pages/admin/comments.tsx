import { NextPage } from "next";
import AdminLayout from "../../components/admin/AdminLayout";
import Comments from "../../components/admin/Comments";
import Elements from "../../components/Elements";

const comments: NextPage = (): JSX.Element => {
  return (
    <AdminLayout headTitle="Dashboard - Admin">
      <div>
        <Elements.Heading.H3>Comments</Elements.Heading.H3>

        <Comments />
      </div>
    </AdminLayout>
  );
};

export default comments;
