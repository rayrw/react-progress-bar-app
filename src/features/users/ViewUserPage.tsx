import { useParams, useRouteLoaderData, useNavigate } from "app/router";
import { useUser } from "./useUser";

export function ViewUserPage() {
  const navigate = useNavigate();
  const { searchParams } = useRouteLoaderData("userList") as any;
  const { userId } = useParams() as { userId: string };
  const user = useUser(userId);

  const handleReturn = () => {
    const qs = new URLSearchParams(searchParams).toString();
    const nextUrl = `/users/` + (qs ? `?${qs}` : "");
    console.log(nextUrl);
    navigate(nextUrl);
  };

  return (
    <>
      <div
        onClick={handleReturn}
        className="fixed inset-0 z-40 bg-[rgba(0,0,0,0.5)]"
      ></div>
      <div className="fixed right-0 top-0 bottom-0 shadow-md dark:bg-gray-800 text-gray-300 w-[80%] z-50 animate-slide">
        {user.username}
      </div>
    </>
  );
}
