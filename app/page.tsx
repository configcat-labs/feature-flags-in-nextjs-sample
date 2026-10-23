import { Suspense } from "react";
import { connection } from "next/server";
import * as configcat from "@configcat/sdk/node";

import UserCard from "./Components/UserCard";
import type { ApiResponse } from "@/types/ApiResponse";

const configCatSdkKey = process.env.CONFIGCAT_SDK_KEY;

if (!configCatSdkKey) {
  throw new Error("CONFIGCAT_SDK_KEY environment variable is not set.");
}

const configCatClient = configcat.getClient(configCatSdkKey);

const getRandomUser = async () => {
  try {
    const res = await fetch("https://randomuser.me/api/");

    if (!res.ok) {
      return null;
    }

    const data: ApiResponse = await res.json();

    return data.results[0] ?? null;

  } catch (error) {
    console.error("There was an error fetching the random user: ", error);
    return null;
  }
};

async function RandomUser() {
  await connection();
  const isRandomUserFeatureFlagEnabled = await configCatClient.getValueAsync("randomUser", false);

  if (!isRandomUserFeatureFlagEnabled) {
    return <p className="info-text">The randomUser feature flag is disabled.</p>;
  }

  const randomUser = await getRandomUser();

  if (!randomUser) {
    return <p className="info-text">Could not fetch a random user.</p>;
  }

  return <UserCard user={randomUser} />;
}

export default function Home() {
  return (
    <main>
      <div className="text-wrapper">
        <h1>Random User Generator</h1>
        <p>Generate random user profiles instantly. Refresh the page to discover a new user with unique details.</p>
      </div>
      <Suspense fallback={<p className="info-text">Loading...</p>}>
        <RandomUser />
      </Suspense>
    </main>
  );
}
