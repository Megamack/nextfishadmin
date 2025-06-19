import "@/css/satoshi.css";
import "@/css/simple-datatables.css";
import "dropzone/dist/dropzone.css";
import "flatpickr/dist/flatpickr.min.css";
import "jsvectormap/dist/jsvectormap.css";
import "nouislider/dist/nouislider.css";
import "@/css/style.css";

import type { Metadata } from "next";
import type { PropsWithChildren } from "react";
import NextTopLoader from "nextjs-toploader";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { Providers } from "./providers";
import { routing } from "@/i18n/routing";
import { getMessages } from "next-intl/server";

export const metadata: Metadata = {
  title: {
    template: "%s | NextAdmin - Next.js Dashboard Kit",
    default: "NextAdmin - Next.js Dashboard Kit",
  },
  description:
    "Next.js admin dashboard toolkit with 200+ templates, UI components, and integrations for fast dashboard development.",
};

type Props = PropsWithChildren<{
  params: { locale: string };
}>;

export default async function RootLayout(props: Props) {
  const { locale } = await props.params;

  //const locale = props.params.locale; // ✅ early extraction

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages({ locale }); // pass locale if needed

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <Providers>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <NextTopLoader color="#5750F1" showSpinner={false} />
            {props.children}
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
