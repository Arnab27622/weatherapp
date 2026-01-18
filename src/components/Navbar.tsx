"use client"

import ThemeDropdown from './ThemeDropdown/ThemeDropdown'
import SearchDialog from './SearchDialog/SearchDialog'
import { useTheme } from 'next-themes'
import Image from 'next/image'
import { useUnit } from '@/context/UnitContext'
import { Button } from './ui/button'

function Navbar() {
  const { theme } = useTheme()
  const { unit, toggleUnit } = useUnit()

  return (
    <div className="sticky top-0 z-1140 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 py-2">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {theme === 'dark' ? (
          <Image
            src="/logo.png"
            alt="Dark Logo"
            width={48}
            height={48}
            className="pl-2 h-12 w-auto"
          />
        ) : (
          <Image
            src="/logo2.png"
            alt="Light Logo"
            width={48}
            height={48}
            className="pl-2 h-12 w-auto"
          />
        )}

        <div className="search-container flex gap-4 items-center">
          <SearchDialog />
          <div className="btn-group flex items-center">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleUnit}
              className="text-lg cursor-pointer"
              aria-label="Toggle Unit"
            >
              {unit === 'metric' ? '°C' : '°F'}
            </Button>
          </div>
          <ThemeDropdown />
        </div>
      </div>
    </div>
  );
}

export default Navbar