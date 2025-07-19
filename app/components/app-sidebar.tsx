"use client"

import { useTheme } from "next-themes"
import { Sun, Moon, Home, Briefcase, GraduationCap, Folder, Wrench, MessageCircle, Book } from "lucide-react"

interface AppSidebarProps {
  activeSection: string
  scrollToSection: (section: string) => void
}

const navItems = [
  { icon: Home, id: "about" },
  { icon: Briefcase, id: "work" },
  { icon: GraduationCap, id: "education" }, // Education/Certification section
  { icon: Folder, id: "projects" },
  { icon: Wrench, id: "skills" },
  { icon: MessageCircle, id: "contact" },
]

export function AppSidebar({ activeSection, scrollToSection }: AppSidebarProps) {
  const { theme, setTheme } = useTheme()
  return (
    <aside className="hidden md:flex fixed top-0 left-0 flex-col h-screen w-20 bg-neutral-100/80 dark:bg-neutral-900/80 backdrop-blur-xl border-r border-neutral-200 dark:border-neutral-800 z-40">
      {/* Header: Logo and Toggle */}
      <div className="flex flex-col items-center gap-8 pt-6 pb-4">
        <div className="flex flex-col items-center gap-3">
          <span className={`font-serif font-extrabold text-3xl tracking-tight transition-colors duration-500 ${theme === 'dark' ? 'text-white' : 'text-[#2d225a]'}`}>SB<span className="text-[#ff4d4f] relative inline-block text-xl ml-0.5 -mb-2">.</span></span>
          <button
            aria-label="Toggle dark mode"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={`w-14 h-8 rounded-full flex items-center px-1 transition-colors duration-300 relative overflow-hidden border border-[#e0dbe7] dark:border-[#23202e] shadow-sm ${theme === 'dark' ? 'bg-[#23202e]' : 'bg-[#474264]'}`}
          >
            <span
              className={`absolute left-1 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full shadow-md block transition-transform duration-300 bg-white ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0'}`}
            />
            <span className={`absolute left-2 top-1/2 -translate-y-1/2 transition-opacity duration-300 ${theme === 'dark' ? 'opacity-0' : 'opacity-100'}`}>
              <Sun className="w-4 h-4 text-yellow-400" />
            </span>
            <span className={`absolute right-2 top-1/2 -translate-y-1/2 transition-opacity duration-300 ${theme === 'dark' ? 'opacity-100' : 'opacity-0'}`}>
              <Moon className="w-4 h-4 text-indigo-400" />
            </span>
          </button>
        </div>
      </div>
      {/* Nav Icons - perfectly centered vertically */}
      <nav className="flex-1 flex flex-col items-center justify-center gap-10 -mt-4">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.id
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`transition-colors duration-200 ${isActive ? 'text-yellow-500' : 'text-[#7c7890]'} hover:scale-110`}
              aria-label={item.id}
            >
              <Icon className="w-7 h-7" strokeWidth={1.5} />
            </button>
          )
        })}
      </nav>
    </aside>
  )
}

// Mobile Bottom Navbar
export function MobileNav({ activeSection, scrollToSection }: AppSidebarProps) {
  return (
    <nav className="fixed bottom-0 left-0 w-full flex items-center justify-around bg-[#faf5f5] dark:bg-[#181415] border-t border-[#f3eded] dark:border-[#232020] py-4 z-40 md:hidden">
      {navItems.map((item) => {
        const Icon = item.icon
        const isActive = activeSection === item.id
        return (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`transition-colors duration-200 ${isActive ? 'text-yellow-500' : 'text-[#7c7890]'} flex flex-col items-center justify-center`}
            aria-label={item.id}
          >
            <Icon className="w-8 h-8" strokeWidth={1.5} />
          </button>
        )
      })}
    </nav>
  )
}
