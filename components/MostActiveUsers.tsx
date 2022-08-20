import { useSession } from "next-auth/react";
import { FC, useEffect, useState } from "react";
import { getMostActiveUsers } from "../utils/admin";
import { catchError, runAsync } from "../utils/helper";
import UserProfile from "./admin/UserProfile";
import PageNavigator from "./PageNavigator";

interface Props {}

let currentPageNo = 0;
const limit = 5;

const MostActiveUsers: FC<Props> = (props): JSX.Element => {
  const [reachedToEnd, setReachedToEnd] = useState(false);
  const [users, setUsers] = useState<
    {
      id: string;
      name: string;
      email: string;
      likesCount: number;
      commentsCount: number;
    }[]
  >([]);

  const handleOnNextClick = () => {
    if (reachedToEnd) return;
    currentPageNo += 1;
    fetchUsers(currentPageNo);
  };

  const fetchUsers = async (pageNo: number) => {
    const res = (await runAsync(
      getMostActiveUsers(pageNo, limit),
      catchError
    )) as any;

    if (res.error) return console.log(res.error);

    if (!res.users.length) {
      currentPageNo = pageNo - 1;
      return setReachedToEnd(true);
    }

    setUsers([...res.users]);
  };

  const handleOnPrevClick = () => {
    if (currentPageNo <= 0) return;
    if (reachedToEnd) setReachedToEnd(false);

    currentPageNo -= 1;
    fetchUsers(currentPageNo);
  };

  useEffect(() => {
    fetchUsers(currentPageNo);
  }, []);

  return (
    <div className="w-full p-3 rounded  shadow-md">
      <div className="space-y-2 mt-5">
        {users.map((user) => (
          <UserProfile key={user.id} {...user} />
        ))}
      </div>
      <PageNavigator
        onNextClick={handleOnNextClick}
        onPrevClick={handleOnPrevClick}
      />
    </div>
  );
};

export default MostActiveUsers;
