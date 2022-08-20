import { NextPage } from "next";
import AdminLayout from "../../components/admin/AdminLayout";

const list = [
  "how to handle async await in react",
  "start using console.warn",
  "how to resize image with proportion",
  "why I am not getting session cookie on express react app",
  "https://stately.ai/blog",
  "https://github.com/reactwg/react-18/discussions/46",
  "https://github.com/reactwg/react-18/discussions/41",
  "https://github.com/reactwg/react-18/discussions/65",
  "Save draft to the database",
  "Fix link creation for text editor",
];

const Admin: NextPage = () => {
  return (
    <>
      <AdminLayout headTitle="Dashboard - Admin">
        {list.map((item) => (
          <li
            key={item}
            className="dark:text-high-contrast-dark text-high-contrast"
          >
            {item}
          </li>
        ))}
      </AdminLayout>
    </>
  );
};

export default Admin;
