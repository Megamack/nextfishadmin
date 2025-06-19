"use client";
import { EmailIcon } from "@/assets/icons";
import InputGroup from "@/components/FormElements/InputGroup";
import validateEmail from "@/libs/validateEmail";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useTranslations } from "next-intl";

export default function ForgotPassword() {
  const t = useTranslations("auth");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      toast.error(t("please_enter_email"));
      return;
    }

    if (!validateEmail(email)) {
      toast.error(t("please_enter_valid_email"));
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("/api/forgot-password/reset", {
        email,
      });

      if (res.status === 404) {
        toast.error(t("user_not_found"));
        setEmail("");
        setLoading(false);
        return;
      }

      if (res.status === 200) {
        toast.success(res.data);
        setLoading(false);
        setEmail("");
      }

      setEmail("");
    } catch (error: any) {
      setLoading(false);
      toast.error(error.response.data);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <InputGroup
          type="email"
          label={t("email")}
          placeholder={t("enter_email")}
          className="mb-6"
          name="email"
          value={email}
          handleChange={handleChange}
          icon={<EmailIcon />}
        />

        <div className="mb-4.5">
          <button
            type="submit"
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90"
          >
            {loading ? (
              <>
                {t("sending")}
                <span
                  className={`inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent dark:border-dark dark:border-t-transparent`}
                ></span>
              </>
            ) : (
              t("send_password_reset_link")
            )}
          </button>
        </div>

        <div className="text-center font-medium">
          <p>
            {t("login_to_account_from")}{" "}
            <Link href="/auth/signin" className="text-primary underline">
              {t("here")}
            </Link>
          </p>
        </div>
      </form>
    </>
  );
}
