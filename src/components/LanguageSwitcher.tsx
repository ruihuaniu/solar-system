import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'zh' ? 'en' : 'zh';
    i18n.changeLanguage(nextLang);
  };

  return (
    <Button
      variant="outline"
      onClick={toggleLanguage}
      className="w-40"
    >
      {i18n.language === 'zh' ? '切换到英文' : 'Switch to Chinese'}
    </Button>
  );
}
