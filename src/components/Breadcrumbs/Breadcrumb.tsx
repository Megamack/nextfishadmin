import { useTranslations } from "next-intl";

interface BreadcrumbProps {
  pageName: string;
}

const Breadcrumb = ({ pageName }: BreadcrumbProps) => {
  const t = useTranslations("nav");

  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h1 className="text-[26px] font-bold leading-[30px] text-dark dark:text-white">
        {pageName}
      </h1>

      <nav aria-label={t("ariaLabel")}>
        <ol className="flex items-center gap-2 font-medium">
          <li>{t("dashboard")}</li>

          <li aria-hidden role="presentation">
            /
          </li>

          <li className="text-primary">{pageName}</li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
