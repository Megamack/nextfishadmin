"use client";

import InputGroup from "@/components/FormElements/InputGroup";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { Checkbox } from "@/components/ui-elements/checkbox";
import Link from "next/link";
import { useTranslations } from "next-intl";

export function SignInForm() {
  const t = useTranslations("auth");

  return (
    <ShowcaseSection title={t("sign_in_form_title")} className="!p-6.5">
      <form action="#">
        <InputGroup
          label={t("email")}
          type="email"
          placeholder={t("enter_email")}
          className="mb-4.5"
        />

        <InputGroup
          label={t("password")}
          type="password"
          placeholder={t("enter_password")}
        />

        <div className="mb-5.5 mt-5 flex items-center justify-between">
          <Checkbox label={t("remember_me")} minimal withBg withIcon="check" />

          <Link href="#" className="text-body-sm text-primary hover:underline">
            {t("forgot_password")}
          </Link>
        </div>

        <button className="flex w-full justify-center rounded-lg bg-primary p-[13px] font-medium text-white hover:bg-opacity-90">
          {t("sign_in")}
        </button>
      </form>
    </ShowcaseSection>
  );
}
