"use client";
import { DescentButton } from "@/components";
import useSystemFunctions from "@/hooks/useSystemFunctions";

export default function Home() {
  const { userState } = useSystemFunctions();
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Welcome {userState.user?.name}</h1>
      <DescentButton variant="action" text="Sign Out" />
      <DescentButton text="Sign Out" />
    </div>
  );
}
