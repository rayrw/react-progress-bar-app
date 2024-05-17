import { useTransition } from "react";
import { clsx } from "clsx";
import { Link, Outlet, useNavigate } from "app/router";
import { useUserList } from "./useUserList";
import { User } from "./schemas";

export function UserListPage() {
  const userList = useUserList();

  return (
    <>
      <div>
        <h1 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
          Users
        </h1>
        <Link
          to="/users/?email=Julianne.OConner@kory.org"
          className="text-gray-700"
        >
          Hi
        </Link>

        <table className="w-full whitespace-no-wrap">
          <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
            <tr>
              <td className="px-4 py-3">Username</td>
              <td className="px-4 py-3">Full name</td>
              <td className="px-4 py-3">Email</td>
              <td className="px-4 py-3">Phone</td>
            </tr>
          </thead>
          <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800 text-gray-700 dark:text-gray-400">
            {userList.map((user) => (
              <UserListRow key={user.username} user={user} />
            ))}
          </tbody>
        </table>
      </div>

      <Outlet />
    </>
  );
}

interface UserListRowProps {
  user: User;
}

function UserListRow({ user }: UserListRowProps) {
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();
  const { id, username, name, email, phone } = user;

  const handleRowClick = () => {
    startTransition(() => {
      navigate(`./${id}`);
    });
  };

  return (
    <tr
      className={clsx(
        { "cursor-pointer": !isPending },
        { "cursor-progress opacity-50": isPending },
      )}
      onClick={handleRowClick}
      key={username}
    >
      <td className="px-4 py-3">
        <div className="flex items-center text-sm">
          <div>
            <p className="text-sm">{username}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3">
        <span className="text-sm">{name}</span>
      </td>
      <td className="px-4 py-3">
        <span className="text-sm">{email}</span>
      </td>
      <td className="px-4 py-3">
        <span className="text-sm">{phone}</span>
      </td>
    </tr>
  );
}
