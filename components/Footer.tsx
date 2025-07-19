import { Mail, Github, Linkedin, Code } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full bg-[#fcf7f7] border-t border-[#f3eaea] shadow-[0_-2px_8px_0_rgba(0,0,0,0.03)] py-12 mt-16">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
        <div className="flex items-center gap-2 text-[#3d3553] text-base font-light">
          <Mail className="w-5 h-5 opacity-80" />
          <a href="mailto:sumeetbidhanwork@gmail.com" className="hover:text-[#ff8c42] transition-colors font-light text-sm md:text-base opacity-90">sumeetbidhanwork@gmail.com</a>
        </div>
        <div className="flex gap-8 mt-4">
          <a href="https://github.com/sumeetbidhan" target="_blank" rel="noopener noreferrer" className="text-[#3d3553] hover:text-[#ff8c42] transition-colors"><Github className="w-6 h-6" /></a>
          <a href="https://www.linkedin.com/in/sumeetbidhan" target="_blank" rel="noopener noreferrer" className="text-[#3d3553] hover:text-[#ff8c42] transition-colors"><Linkedin className="w-6 h-6" /></a>
          <a href="https://leetcode.com/u/sumeetbidhan/" target="_blank" rel="noopener noreferrer" className="text-[#3d3553] hover:text-[#ff8c42] transition-colors"><Code className="w-6 h-6" /></a>
        </div>
      </div>
    </footer>
  )
} 