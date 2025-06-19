import ForgotPassword from "@/components/Auth/ForgotPassword";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { getMessages } from "next-intl/server";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params }: Props) {
  // first await the params promise
  const { locale } = await params;

  // then load the messages for that locale
  const messages = await getMessages({ locale });

  return {
    title: messages.auth["forgot_password_page_title"] || "Forgot Password",
  };
}

export default function ForgotPasswordPage() {
  const t = useTranslations("auth");

  return (
    <>
      <Breadcrumb pageName={t("forgot_password")} />

      <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
        <div className="flex flex-wrap items-center">
          <div className="w-full xl:w-1/2">
            <div className="w-full p-4 sm:p-12.5 xl:p-15">
              <ForgotPassword />
            </div>
          </div>

          <div className="hidden w-full p-7.5 xl:block xl:w-1/2">
            <div className="custom-gradient-1 overflow-hidden rounded-2xl px-12.5 pt-12.5 dark:!bg-dark-2 dark:bg-none">
              <Link className="mb-10 inline-block" href="/">
                <Image
                  className="hidden dark:block"
                  src={"/images/logo/logo.svg"}
                  alt="Logo"
                  width={176}
                  height={32}
                />
                <Image
                  className="dark:hidden"
                  src={"/images/logo/logo-dark.svg"}
                  alt="Logo"
                  width={176}
                  height={32}
                />
              </Link>

              <p className="mb-3 text-xl font-medium text-dark dark:text-white">
                {t("forgot_password_question")}
              </p>

              <h1 className="mb-4 text-2xl font-bold text-dark dark:text-white sm:text-heading-3">
                {t("reset_password")}
              </h1>

              <p className="w-full max-w-[375px] font-medium text-dark-4 dark:text-dark-6">
                {t("reset_password_instruction")}
              </p>

              <div className="-mt-16.5">
                <Image
                  src={"/images/grids/grid-02.svg"}
                  alt="Grid"
                  width={292}
                  height={234}
                  className="mx-auto dark:opacity-30"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
