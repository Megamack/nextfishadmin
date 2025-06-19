"use client";
import Link from "next/link";
import GoogleSigninButton from "../GoogleSigninButton";
import SigninWithPassword from "../SigninWithPassword";
import { useTranslations } from "next-intl";

export default function Signin() {
  const t = useTranslations("auth");
  return (
    <>
      <GoogleSigninButton text={t("sign_in")} />

      <div className="my-6 flex items-center justify-center">
        <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
        <div className="block w-full min-w-fit bg-white px-3 text-center font-medium dark:bg-gray-dark">
          {t("or_sign_in_with_email")}
        </div>
        <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
      </div>

      <div>
        <SigninWithPassword />
      </div>

      <div className="mt-6 text-center">
        <p>
          {t("dont_have_an_account")} ?{" "}
          <Link href="/auth/signup" className="text-primary">
            {t("sign_up")}
          </Link>
        </p>
      </div>
    </>
  );
}
