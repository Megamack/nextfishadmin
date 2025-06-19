"use client";

import { EmailIcon, PasswordIcon } from "@/assets/icons";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import InputGroup from "../FormElements/InputGroup";
import { Checkbox } from "../ui-elements/checkbox";
import { useTranslations } from "next-intl";

export default function SigninWithPassword() {
  const [data, setData] = useState({
    email: "mack@mack.fi",
    password: "megamack",
    remember: false,
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const t = useTranslations("auth");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!data.email) {
      return toast.error(t("enter_email"));
    }

    setLoading(true);

    signIn("credentials", { ...data, redirect: false }).then((callback) => {
      if (callback?.error) {
        let errorMessage = "";

        if (callback.error === "CredentialsSignin") {
          errorMessage = t("invalid_credentials") || "Check your credentials";
        }

        toast.error(errorMessage);
        setLoading(false);
      }

      if (callback?.ok && !callback?.error) {
        toast.success(t("user_logged_in") || "Logged in successfully");
        setLoading(false);
        setData({ email: "", password: "", remember: false });
        router.push("/");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup
        type="email"
        label={t("email")}
        className="mb-4 [&_input]:py-[15px]"
        placeholder={t("enter_email")}
        name="email"
        handleChange={handleChange}
        value={data.email}
        icon={<EmailIcon />}
      />

      <InputGroup
        type="password"
        label={t("password")}
        className="mb-5 [&_input]:py-[15px]"
        placeholder={t("enter_password")}
        name="password"
        handleChange={handleChange}
        value={data.password}
        icon={<PasswordIcon />}
      />

      <div className="mb-6 flex items-center justify-between gap-2 py-2 font-medium">
        <Checkbox
          label={t("remember_me")}
          name="remember"
          withIcon="check"
          minimal
          radius="md"
          onChange={(e) =>
            setData({
              ...data,
              remember: e.target.checked,
            })
          }
        />

        <Link
          href="/auth/forgot-password"
          className="hover:text-primary dark:text-white dark:hover:text-primary"
        >
          {t("forgot_password")}
        </Link>
      </div>

      <div className="mb-4.5">
        <button
          type="submit"
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90"
        >
          {t("sign_in")}
          {loading && (
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent dark:border-primary dark:border-t-transparent" />
          )}
        </button>
      </div>
    </form>
  );
}
