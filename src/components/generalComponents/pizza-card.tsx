import { Plus } from "lucide-react"
import { Button } from "../ui/button"
import { Card, CardContent, CardFooter } from "../ui/card"
import { useCart } from "./cart-provider"
import type { Pizza } from "../../types"
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog"
import { useTranslation } from "react-i18next"

interface PizzaCardProps {
  pizza: Pizza
}

export function PizzaCard({ pizza }: PizzaCardProps) {
  const { addItem } = useCart()
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useTranslation()
  // Ensure price is a number
  const price = Number(pizza.price)

  return (
    <div>
      <Card className="overflow-hidden transition-all hover:shadow-md ">
        <div className="aspect-square relative overflow-hidden cursor-pointer" onClick={() => setIsOpen(true)}>
          <img
            src={pizza.image || "/placeholder.svg"}
            alt={pizza.name}
            className="object-cover w-full h-full transition-transform hover:scale-105" />
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-cairo font-bold text-sm">{pizza.name}</h3>
              <p className="font-cairo text-sm text-muted-foreground line-clamp-2 mt-1 text-xs">{price}﷼</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-center">
          <Button
            onClick={() => addItem(pizza)}
            className="w-full bg-red-500 hover:bg-red-600 font-cairo text-[11px] text-white"
          >
            <Plus className="h-4 w-4 ml-2 " />
            {t("actions.addToCart")}
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px] font-cairo">
          <DialogHeader>
        <DialogTitle className="text-xl font-cairo font-bold">{pizza.name}</DialogTitle>
        <DialogDescription className="text-sm font-cairo">{pizza.description}</DialogDescription>
          </DialogHeader>
          <div className="relative aspect-square w-full overflow-hidden rounded-md">
        <img src={pizza.image || "/placeholder.svg"} alt={pizza.name} className="object-cover" />
          </div>
          <div className="flex justify-between items-center">
        <div className="text-lg font-cairo font-bold">{price} ﷼</div>
        <Button
          onClick={() => {
            addItem(pizza)
            setIsOpen(false)
          }}
          className="bg-red-500 hover:bg-red-600 font-cairo text-[10px] text-white"
        >
          <Plus className="h-4 w-5 ml-2" />
          {t("actions.addToCart")}
         </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
