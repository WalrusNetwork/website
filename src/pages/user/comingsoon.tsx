import React from "react";
import { useTranslation } from "react-i18next";

export default function ComingSoon() {
  const { t } = useTranslation("profiles");

  return (
    <div className="coming-soon">
      <h3>{t("Coming soon...")}</h3>
      <p>{t("Stay tuned for more!")}</p>
    </div>
  );
}
