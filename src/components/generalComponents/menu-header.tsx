import { ThemeToggle } from "./theme-toggle";
import { Sheet, SheetTrigger, SheetContent } from "../ui/sheet";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import { Cart } from "./cart";
import { useMediaQuery } from "../../hooks/use-media-query";
import { JSX } from "react";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { useTranslation } from "react-i18next";

interface MenuHeaderProps {
  onCartClick: () => void;
  onHomeClick: () => void;
}

export const MenuHeader = ({ onCartClick, onHomeClick}: MenuHeaderProps): JSX.Element => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const itemCount = 0; // Replace with actual state or prop
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-10 bg-background border-b border-border py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div 
          className="flex items-center text-xl font-bold cursor-pointer hover:text-red-500 transition-colors" 
          onClick={onHomeClick}
        >
          {t('common.restaurantName')}
        </div>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />

          {isDesktop ? (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="relative text-sm">
                  <ShoppingCart className="h-3 w-3 ml-1" />
                  {t('common.cart')}
                  {itemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[400px] sm:w-[540px]" side="left">
                <div className="h-full flex flex-col">
                  <Cart onCheckout={onCartClick} />
                </div>
              </SheetContent>
            </Sheet>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="relative text-sm hover:bg-gray-200 dark:hover:bg-gray-700"
              onClick={onCartClick}
            >
              <ShoppingCart className="h-3 w-3 ml-1" />
              {t('common.cart')}
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};