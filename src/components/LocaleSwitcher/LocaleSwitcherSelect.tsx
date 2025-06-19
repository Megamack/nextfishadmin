"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import { Locale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
} from "@/components/ui/dropdown";
import { cn } from "@/lib/utils";
import { ChevronUpIcon } from "@/assets/icons";

export default function LocaleSwitcher() {
  const t = useTranslations("localeswitcher");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  function onLocaleSelect(nextLocale: Locale) {
    setIsOpen(false);
    router.replace(
      { pathname, params: {} }, // adjust if you use params
      { locale: nextLocale },
    );
  }

  return (
    <Dropdown isOpen={isOpen} setIsOpen={setIsOpen}>
      <DropdownTrigger
        className="group flex items-center gap-1 px-2 py-1 outline-none focus-visible:outline-primary"
        aria-label={t("label")}
      >
        <span className="sr-only">{t("label")}</span>

        <span className="font-medium capitalize text-dark dark:text-dark-6">
          {locale}
        </span>

        <ChevronUpIcon
          aria-hidden
          className={cn(
            "text-dark transition-transform duration-200 dark:text-dark-6",
            isOpen ? "rotate-0" : "rotate-180",
          )}
          strokeWidth={1.5}
          width={22}
          height={22}
        />
      </DropdownTrigger>

      <DropdownContent
        className="min-w-[8rem] rounded-md border border-stroke bg-white shadow-md dark:border-dark-3 dark:bg-gray-dark"
        align="end"
      >
        {routing.locales.map((loc) => (
          <button
            key={loc}
            onClick={() => onLocaleSelect(loc as Locale)}
            className={cn(
              "w-full px-4 py-2 text-left text-sm font-medium capitalize hover:bg-gray-100 dark:hover:bg-dark-4",
              loc === locale ? "font-semibold underline" : "",
            )}
          >
            {t("locale", { locale: loc })}
          </button>
        ))}
      </DropdownContent>
    </Dropdown>
  );
}
