import Image from "next/image";
import type { User } from "../types/ApiResponse";

interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <div className="user-card">
      <Image
        src={user.picture.large}
        alt="Profile photo"
        width={150}
        height={150}
        className={user.gender}
      />
      <h2>{`${user.name.first} ${user.name.last}`}</h2>
      <p>
        <span>Gender: </span>
        {user.gender}
      </p>
      <p>
        <span>Location: </span>
        {user.location.country}
      </p>
    </div>
  );
}
