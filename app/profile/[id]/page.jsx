"use client";

import { Suspense } from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

const UserProfile = ({ params }) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");

  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const unwrapParams = async () => {
      const resolvedParams = await params; // Unwrap the Promise
      if (resolvedParams?.id) {
        const response = await fetch(`/api/users/${resolvedParams.id}/posts`);
        const data = await response.json();
        setUserPosts(data);
      }
    };

    unwrapParams();
  }, [params]);

  return (
    <Suspense>
      <Profile
        name={userName}
        desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination`}
        data={userPosts}
      />
    </Suspense>
  );
};

export default UserProfile;
