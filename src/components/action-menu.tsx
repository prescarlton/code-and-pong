"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus, ClipboardEdit, PlayCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const ActionMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen((prev) => !prev)

  const menuItems = [
    { href: "/score-keeper", icon: PlayCircle, label: "Start New Round" },
    { href: "/past-round", icon: ClipboardEdit, label: "Enter Past Round" },
  ]

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 flex flex-col items-end gap-4"
          >
            {menuItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.2, delay: index * 0.1 }}
              >
                <Link href={item.href}>
                  <Button
                    variant="secondary"
                    className="flex items-center gap-2 px-4 py-2 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Button>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div whileTap={{ scale: 0.95 }}>
        <Button
          size="icon"
          className="w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all"
          onClick={toggleMenu}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <Plus
            className={`w-6 h-6 transition-transform duration-300 ${
              isOpen ? "rotate-45" : "rotate-0"
            }`}
          />
        </Button>
      </motion.div>
    </div>
  )
}

export default ActionMenu
