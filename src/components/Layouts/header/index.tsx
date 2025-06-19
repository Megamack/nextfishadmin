"use client";

import { MenuIcon } from "@/assets/icons";
import Image from "next/image";
import Link from "next/link";
import { useSidebarContext } from "../sidebar/sidebar-context";
import { Notification } from "./notification";
import { SearchInput } from "./search-input";
import { ThemeToggleSwitch } from "./theme-toggle";
import { UserInfo } from "./user-info";
import LocaleSwitcher from "../../LocaleSwitcher/LocaleSwitcher";
import { useLocale, useTranslations } from "next-intl";
import { signIn, useSession } from "next-auth/react";

export function Header() {
  const t = useTranslations("layout");
  const { data: session, status } = useSession();
  const { toggleSidebar, isMobile } = useSidebarContext();

  const isLoggedIn = status === "authenticated";

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-stroke bg-white px-4 py-5 dark:border-stroke-dark dark:bg-gray-dark md:px-5 2xl:px-10">
      <button
        onClick={toggleSidebar}
        className="rounded-lg border px-1.5 py-1 dark:border-stroke-dark dark:bg-[#020D1A] hover:dark:bg-[#FFFFFF1A] lg:hidden"
      >
        <MenuIcon />
        <span className="sr-only">{t("toggle_sidebar")}</span>
      </button>
      {isMobile && (
        <Link href={"/"} className="ml-2 max-[430px]:hidden min-[375px]:ml-4">
          <Image
            src={"/images/logo/logo-icon.svg"}
            width={32}
            height={32}
            alt={t("logo_alt")}
            role="presentation"
          />
        </Link>
      )}
      <div className="max-xl:hidden">
        <div className="mb-0.5 text-heading-5 font-bold text-dark dark:text-white">
          {t("header_title")}
        </div>
        <p className="font-medium">{t("header_description")}</p>
      </div>

      <div className="ml-auto flex items-center gap-2 min-[375px]:gap-4">
        {/* <SearchInput /> */}
        <LocaleSwitcher />
        <ThemeToggleSwitch />
        <Notification />

        {isLoggedIn ? (
          <UserInfo />
        ) : (
          <button
            onClick={() => signIn()}
            className="rounded-lg bg-primary px-4 py-2 font-medium text-white transition hover:bg-primary/90"
          >
            {t("sign_in")}
          </button>
        )}
      </div>
    </header>
  );
}
