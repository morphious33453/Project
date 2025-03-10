"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { navLinks } from "@/lib/utils/navigation"
import { useState, useEffect } from "react"

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const html = document.documentElement
    if (isOpen) {
      html.style.overflow = "hidden"
    } else {
      html.style.overflow = ""
    }
  }, [isOpen])

  return (
    <div className="flex items-center md:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="h-8 w-8 p-0"
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Open menu</span>
      </Button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-all duration-100"
            onClick={() => setIsOpen(false)}
          />
          <div 
            className={`
              fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-background p-6 shadow-lg 
              transition-transform duration-300 ease-in-out
              ${isOpen ? "translate-x-0" : "translate-x-full"}
            `}
          >
            <div className="flex items-center justify-between mb-8">
              <Link 
                href="/" 
                className="flex items-center space-x-2"
                onClick={() => setIsOpen(false)}
              >
                <span className="font-bold">Niagara Paint</span>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-5 w-5" />
                <span className="sr-only">Close menu</span>
              </Button>
            </div>
            <nav className="space-y-6">
              {navLinks.map((link) => {
                const Icon = link.icon
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-2 text-lg font-medium transition-colors hover:text-primary"
                  >
                    <Icon className="h-5 w-5" />
                    <span>{link.label}</span>
                  </Link>
                )
              })}
            </nav>
          </div>
        </>
      )}
    </div>
  )
}
