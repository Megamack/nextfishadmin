"use client";
import { useSession } from "next-auth/react";
import { FC } from "react";
import { useTranslations } from "next-intl";

const SessionPage: FC = () => {
  const { data: session, status } = useSession();
  const t = useTranslations("auth");

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return (
      <div>
        <h1>{t("session_title")}</h1> {/* Translated "Hello world!" */}
        <p>You are not logged in. Please log in to view your session.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>{t("title")}</h1> {/* Translated "Hello world!" */}
      <p>
        <strong>Logged in as:</strong> {session.user?.name}
      </p>
      <p>
        <strong>Email:</strong> {session.user?.email}
      </p>
      <p>
        <strong>User ID:</strong> {session.user?.id}
      </p>
      <p>
        <strong>Cover Image:</strong>{" "}
        {session.user?.coverImage || "No cover image available"}
      </p>
    </div>
  );
};

export default SessionPage;
