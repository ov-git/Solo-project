import { getUserFromCookie } from "../lib/auth";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

const getData = async () => {
  const user = getUserFromCookie(cookies());
  return user;
};

const Profile = async () => {
  const user = await getData();
  const { drinks } = user;
  return (
    <div className="flex flex-col h-full">
      <div className="w-full h-64 bg-black border border-white">
        <h1 className="text-white">{user?.email}</h1>
      </div>
      <div className="flex w-full h-full gap-4 overflow-x-scroll bg-white border border-white">
        {drinks.map((el) => (
          <div
            key={el.id}
            className="bg-black text-white h-full min-w-[320px] max-w-[320px] flex-grow flex-shrink-0"
          >
            <Image src={el.image} alt={el.name} width={300} height={300} />
            <p>{el.name}</p>
            <Link href={`drink/${el.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
