'use client'

import { Button } from '@/components/ui/botton'
import { useCart } from '@/hooks/use-cart'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export const NavbarActions = () => {
  const cart = useCart()
  const router = useRouter()

  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <div className="ml-auto flex items-center gap-x-4">
      <Button
        className="flex items-center rounded-full bg-black px-4 py-2"
        onClick={() => router.push('/cart')}
      >
        <img src="https://andrestayupanta.neocities.org/proyecto/imagenes/icons8-carrito-de-compras-64.png" alt="Cart" className="w-6 h-6" />
     {/*   <ShoppingBag size={20} color="white" /> */}
        <span className="ml-2 text-sm font-medium text-white">
          {cart.items.length}
        </span>
      </Button>
    </div>
  )
}