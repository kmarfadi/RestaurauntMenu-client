import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" aria-label="Change language" className="h-8 w-8 ">
          <Globe className="w-5 h-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => i18n.changeLanguage("ar")}
          className={i18n.language === "ar" ? "font-bold" : ""}
        >
          العربية
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => i18n.changeLanguage("en")}
          className={i18n.language === "en" ? "font-bold" : ""}
        >
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}