import { Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "../ui/button"
import { ScrollArea } from "../ui/scroll-area"
import { Separator } from "../ui/separator"
import { useCart } from "./cart-provider"
import { useTranslation } from "react-i18next"

interface CartProps {
  onCheckout: () => void
  isCompact?: boolean
}

export function Cart({ onCheckout, isCompact = false }: CartProps) {
  const { items, subtotal, removeItem, updateItemQuantity } = useCart()
  const { t, i18n } = useTranslation()

  const textAlignment = i18n.language === 'ar' ? 'text-right' : 'text-left'
  const flexDirection = i18n.language === 'ar' ? 'flex-row-reverse' : 'flex-row'

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full pb-1">
        <h3 className="text-lg font-medium mb-2 font-cairo dark:text-white">{t('cart.empty')}</h3>
        <p className="text-muted-foreground text-sm text-center mb-4 font-cairo">{t('cart.continueShopping')}</p>
      </div>
    )
  }

  const clearCart = () => {
    items.forEach(item => removeItem(item.id))
  }

  return (
    <div className={`flex flex-col ${isCompact ? "" : "h-full"}`}>
      <div className={isCompact ? "" : "flex-1"}>
        <div className={isCompact ? "" : "mb-4"}>
          <h3 className={`font-medium font-cairo dark:text-white ${isCompact ? "sr-only" : "text-lg mb-2"}`}>{t('cart.yourOrder')}</h3>
          {!isCompact && (
            <p className="text-muted-foreground text-sm font-cairo">
              {items.length} {items.length === 1 ? t('cart.item') : t('cart.items')}
            </p>
          )}
        </div>

        {isCompact ? (
          <div className="flex items-center justify-between">
            <div className="font-cairo">
              <span className="font-medium dark:text-white">
                {items.length} {items.length === 1 ? t('cart.item') : t('cart.items')}
              </span>
              <span className="mx-2 dark:text-white">·</span>
              <span className="font-medium dark:text-white">{subtotal} {t('common.currency')}</span>
            </div>
            <Button onClick={onCheckout} className="bg-red-500 hover:bg-red-600 font-cairo">
              {t('cart.checkout')}
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1">
              <div className="space-y-4 pr-3">
                {items.map((item) => (
                  <div key={item.id} className={`flex gap-4 ${flexDirection}`}>
                    <div className="relative h-16 w-16 overflow-hidden rounded-md flex-shrink-0">
                      <img src={item.image || "/placeholder.svg"} alt={item.name} className="object-cover" />
                    </div>
                    <div className={`flex-1 flex flex-col ${textAlignment}`}>
                      <div className="flex justify-between">
                        <h4 className="font-medium font-cairo dark:text-white">{item.name}</h4>
                        <div className="font-medium font-cairo dark:text-white">
                          {(item.price * item.quantity).toFixed(2)} {t('common.currency')}
                        </div>
                      </div>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateItemQuantity(item.id, Math.max(1, item.quantity - 1))}
                          >
                            <Minus className="h-3 w-3" />
                            <span className="sr-only">{t('cart.decreaseQuantity')}</span>
                          </Button>
                          <span className="w-8 text-center dark:text-white">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                            <span className="sr-only">{t('cart.increaseQuantity')}</span>
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-muted-foreground"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">{t('cart.remove')}</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="mt-6 space-y-4">
              <Separator className="dark:bg-gray-800" />
              <div className={`space-y-1.5 font-cairo ${textAlignment}`}>
                <div className="flex justify-between">
                  <span className="font-medium dark:text-white">{t('cart.subtotal')}</span>
                  <span className="dark:text-white">{subtotal.toFixed(2)} {t('common.currency')}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>{t('cart.tax')} (8%)</span>
                  <span>{(subtotal * 0.08).toFixed(2)} {t('common.currency')}</span>
                </div>
                <div className="flex justify-between font-medium text-lg">
                  <span className="dark:text-white">{t('cart.total')}</span>
                  <span className="dark:text-white">{(subtotal * 1.08).toFixed(2)} {t('common.currency')}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Button onClick={onCheckout} className="bg-red-500 hover:bg-red-600 font-cairo">
                  {t('cart.checkout')}
                </Button>
                <Button variant="outline" onClick={clearCart} className="font-cairo">
                  {t('cart.clearCart')}
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
