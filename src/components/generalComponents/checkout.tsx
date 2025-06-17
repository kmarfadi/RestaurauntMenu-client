import type React from "react"
import { useState } from "react"
import { ArrowLeft, Trash2 } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Separator } from "../ui/separator"
import { useCart } from "./cart-provider"
import { submitOrder } from "../../lib/services"
import { useTranslation } from "react-i18next"

interface CheckoutProps {
  onBackToMenu: () => void
  onOrderComplete: (orderId: string) => void
}

const branchNumbers = {
  1: "+967777858820",
  2: "+967779595956",
}

export function Checkout({ onBackToMenu, onOrderComplete }: CheckoutProps) {
  const { t, i18n } = useTranslation()
  const { items, subtotal, clearCart, removeItem } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [branchId, setBranchId] = useState<number | null>(null)
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!branchId) {
      alert(t("checkout.selectBranch"))
      return
    }

    setIsSubmitting(true)

    try {
      const orderData = {
        name,
        address,
        cart: items.map((item) => ({
          id: item.id,
          name: item.name,
          qty: item.quantity,
        })),
        branch_id: branchId,
      }

      const data = await submitOrder(orderData)
      const whatsappUrl = data.whatsappUrl

      clearCart()
      onOrderComplete("Order Completed")
      window.location.href = whatsappUrl
    } catch (error) {
      console.error("Error:", error)
      alert(t("checkout.error"))
    } finally {
      setIsSubmitting(false)
    }
  }

  const isEnglish = i18n.language === "en"

  return (
    <div
      className={`max-w-3xl mx-auto ${isEnglish ? "text-left" : "text-right"}`}
      dir={isEnglish ? "ltr" : "rtl"}
    >
      <Button variant="ghost" className="mb-6 pl-0" onClick={onBackToMenu}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        {t("checkout.backToMenu")}
      </Button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold mb-4">{t("checkout.orderSummary")}</h3>
          </div>
          <Separator className="my-4" />
          <div className="space-y-4 mb-6">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div>
                  <span className="font-medium">{item.quantity}x</span> {item.name}
                </div>
                <div className="flex items-center gap-2">
                  <div>{t("common.currency")}{(item.price * item.quantity)}</div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">{t("checkout.removeItem")}</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <Separator className="my-4" />

          <div className="space-y-1.5">
            <div className="flex justify-between font-medium text-lg pt-2">
              <span className="font-bold">{t("checkout.total")}</span>
              <span className="font-bold"> {subtotal} {t("common.currency")}</span>
            </div>
          </div>
        </div>
        <Separator/>
        <div>
          <h3 className="text-lg font-bold mb-4 font-cairo dark:text-white">{t("checkout.deliveryInfo")}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="font-cairo">
                {t("checkout.fullName")}
              </Label>
              <Input
                id="name"
                placeholder={t("checkout.namePlaceholder")}
                required
                className="font-cairo"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-2 mb-8">
              <Label htmlFor="address" className="font-cairo">
                {t("checkout.deliveryAddress")}
              </Label>
              <Input
                id="address"
                placeholder={t("checkout.addressPlaceholder")}
                required
                className="font-cairo"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label className="font-cairo">{t("checkout.selectBranch")}</Label>
              <div className="space-y-2">
                {Object.entries(branchNumbers).map(([id]) => (
                  <div key={id} className="flex items-center space-x-2 space-x-reverse">
                    <input
                      type="radio"
                      id={`branch-${id}`}
                      name="branch"
                      value={id}
                      onChange={() => setBranchId(Number(id))}
                      className="cursor-pointer mr-2 accent-red-500"
                    />
                    <label htmlFor={`branch-${id}`} className="font-cairo cursor-pointer">
                      {id === "1" ? t("checkout.branch1") : t("checkout.branch2")}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 mt-6 font-cairo"
              disabled={isSubmitting}
            >
              {isSubmitting ? t("checkout.processing") : t("checkout.completeOrder")}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
