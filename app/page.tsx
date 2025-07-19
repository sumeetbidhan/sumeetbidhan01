"use client"

import { useState, useEffect, useRef } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Github, Linkedin, Mail, Download, MapPin, ArrowUpRight, Sparkles, Code, GraduationCap, Award } from "lucide-react"
import { AppSidebar } from "./components/app-sidebar"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import Image from "next/image"
import { MobileNav } from "./components/app-sidebar"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("about")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [activeTab, setActiveTab] = useState("education")
  const [activeImageIndex, setActiveImageIndex] = useState<{ [key: string]: number }>({})
  
  // Contact form state
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState<'success' | 'error'>('success')

  const aboutRef = useRef<HTMLElement>(null)
  const workRef = useRef<HTMLElement>(null)
  const educationRef = useRef<HTMLElement>(null)
  const projectsRef = useRef<HTMLElement>(null)
  const skillsRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)

  const sectionRefs = {
    about: aboutRef,
    work: workRef,
    education: educationRef,
    projects: projectsRef,
    skills: skillsRef,
    contact: contactRef,
  }

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  // Scroll spy functionality
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id
          setActiveSection(sectionId)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current)
      }
    })

    return () => {
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current)
        }
      })
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const ref = sectionRefs[sectionId as keyof typeof sectionRefs]
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Contact form submission
  const handleContactSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      // Create a FormData object
      const formData = new FormData()
      formData.append('name', name)
      formData.append('email', email)
      formData.append('subject', subject)
      formData.append('message', message)
      formData.append('access_key', '3d7321bc-f327-4af7-a94c-9b002ec6801f')

      // Convert formData to a JSON object
      const object = Object.fromEntries(formData)
      const json = JSON.stringify(object)

      // Make the POST request to the Web3Forms API
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: json,
      }).then((res) => res.json())

      // Show toast based on the response
      if (res.success) {
        setToastMessage('Message sent successfully! I\'ll get back to you soon.')
        setToastType('success')
        setShowToast(true)
        // Clear form after successful submission
        setName('')
        setEmail('')
        setSubject('')
        setMessage('')
        // Hide toast after 5 seconds
        setTimeout(() => setShowToast(false), 5000)
      } else {
        setToastMessage('Something went wrong, please try again.')
        setToastType('error')
        setShowToast(true)
        setTimeout(() => setShowToast(false), 5000)
      }
    } catch (error) {
      setToastMessage('Something went wrong, please try again.')
      setToastType('error')
      setShowToast(true)
      setTimeout(() => setShowToast(false), 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const projects = [
    {
      title: "BlogHarmony",
      description: "A modern, full-stack blog platform with Node.js backend and integrated CMS, enabling dynamic content management and rapid updates. Features responsive UI/UX design for enhanced user engagement and SEO optimization, deployed with modern CI/CD practices.",
      tech: ["React", "Node.js", "MongoDB", "CMS", "Git", "Docker", "CI/CD", "Responsive Design", "UI/UX", "SEO"],
      status: "Live",
      year: "2023",
      images: [
        "/project/BlogHarmony01.png",
        "/project/BlogHarmony02.png", 
        "/project/BlogHarmony03.png",
        "/project/BlogHarmony04.png"
      ],
      link: "https://blogharmony.netlify.app/",
      github: "https://github.com/sumeetbidhan/MyBlog"
    },
    {
      title: "Video Caption App",
      description: "A robust React-based web application for precise video captioning with synchronized timestamps. Utilizes Django backend, AWS cloud storage, and Redux for efficient state management, deployed via Docker for scalable and reliable containerization.",
      tech: ["React", "Django", "AWS", "Docker", "Redux", "PostgreSQL", "RESTful APIs", "Git", "HTML5 Video API", "Scalable Backend"],
      status: "Live",
      year: "2024",
      images: [
        "/project/video01.png",
        "/project/video02.png",
        "/project/video03.png"
      ],
      link: "https://video-caption-app-five.vercel.app/",
      github: "https://github.com/sumeetbidhan/video-caption-app"
    },
    {
      title: "Chemical Inventory App",
      description: "A comprehensive cross-platform (Web/Mobile) inventory management system for chemical laboratories. Features FastAPI backend, secure Firebase authentication with OTP, and optimized PostgreSQL database with custom schema design for efficient data handling.",
      tech: ["React Native", "React", "FastAPI", "Firebase Auth", "PostgreSQL", "AWS", "Docker", "OTP", "Git", "Scalable Architecture", "Database Design", "Responsive UI"],
      status: "Live",
      year: "2024",
      images: [
        "/project/app01.png",
        "/project/app02.png",
        "/project/app03.png",
        "/project/appMobile01.png",
        "/project/appMobile02.png",
        "/project/appMobile03.png",
        "/project/appMobile04.png"
      ],
      link: "#",
      github: "https://github.com/sumeetbidhan/chemical-inventory-app"
    },
  ]

  const skills = [
    { name: "Frontend Development", level: 95 },
    { name: "Backend Development", level: 90 },
    { name: "Database Systems", level: 88 },
    { name: "DevOps & Cloud", level: 85 },
    { name: "Mobile Development", level: 82 },
    { name: "Data Analysis", level: 80 },
  ]

  const experience = [
    {
      company: "Blossoms Aroma Private Limited",
      logo: "/logos/blossoms.jpeg",
      role: "Software Engineer",
      period: "Jun 2025 - Present",
      location: "Noida, Uttar Pradesh, India · On-site",
      summary: "Lead full-stack development and infrastructure for the company's core website and cross-platform app.",
      highlights: [
        "Built and maintain a full-featured website using React, Next.js, WordPress, and Shopify, improving customer engagement by 35%.",
        "Integrated CMS and eCommerce features with dynamic APIs, reducing manual content updates by 60%.",
        "Managed full deployment lifecycle (DNS, SSL, hosting) on Hostinger, ensuring 99.9% uptime and faster go-to-market for new products.",
        "Spearheaded cross-platform app development using React, React Native, FastAPI, PostgreSQL, and Firebase.",
        "Implemented scalable architecture and secure RESTful APIs with real-time updates and cloud messaging.",
        "Reduced backend response time by 40%, enabling faster user interaction and real-time inventory tracking.",
        "Set up CI/CD pipelines with GitHub Actions for zero-downtime deployments, cutting manual deployment time by 80%.",
        "Manage multiple environments (dev, staging, production) and implement uptime monitoring, backups, and auto-recovery, resulting in 99.99% service reliability.",
        "Helped reduce manual operational workload by 50%, enabling non-technical teams to update content and manage inventory autonomously.",
        "Contributed to a 25% increase in online sales by improving site performance, mobile responsiveness, and SEO."
      ]
    },
    {
      company: "RegisterKaro",
      logo: "/logos/registerkaro.jpeg",
      role: "Frontend Developer",
      period: "Apr 2024 - Jun 2025",
      location: "Gurugram, Haryana, India · On-site",
      summary: "Designed and implemented dynamic user interfaces and integrated payment systems for rapid business growth.",
      highlights: [
        "Designed and implemented dynamic user interfaces for Services and Local pages using Next.js and TypeScript, increasing user engagement and reducing bounce rate by 20%.",
        "Integrated SQL and MongoDB for seamless data storage and retrieval, ensuring robust backend connectivity and optimized query handling.",
        "Implemented Razorpay payment gateway and launched package-buying functionality, leading to a 30% increase in revenue within the first quarter.",
        "Worked with marketing, ads, and CRM teams to brainstorm campaign strategies and translated them into high-converting landing pages and CTAs, boosting lead generation by 25%.",
        "Built and maintained CMS-integrated pages for rapid content updates and dynamic service listings, improving operational agility.",
        "Collaborated with Google Ads and Analytics teams to refine targeting, track user behavior, and increase conversions through data-driven design adjustments.",
        "Coordinated with the Zoho CRM team to streamline lead capture, automate sales funnel actions, and support cross-functional revenue initiatives.",
        "Utilized Git for version control and participated in regular code reviews, ensuring maintainability, scalability, and team collaboration."
      ]
    },
    {
      company: "Web Cosmos",
      logo: "/logos/webcosmos.jpeg",
      role: "Full Stack Developer",
      period: "Aug 2021 - Mar 2024",
      location: "Lucknow, Uttar Pradesh, India · Remote",
      summary: "Developed scalable backend services and interactive UIs, improving performance and user engagement.",
      highlights: [
        "Designed and implemented database schemas in MySQL and MongoDB, improving query performance and reducing data fetch latency by 30%.",
        "Developed and deployed secure RESTful APIs using Node.js and Flask, enabling seamless integration between frontend and backend systems.",
        "Created interactive and responsive user interfaces using React.js and Angular, resulting in a 40% improvement in user retention and engagement.",
        "Built scalable backend services for e-commerce and healthcare platforms, increasing application reliability and load-handling capacity.",
        "Used Tableau and Python to process and visualize client data, supporting informed decision-making across domains.",
        "Performed code reviews and debugging sessions, reducing error rates by 15% and ensuring maintainable, production-ready code.",
        "Collaborated with cross-functional teams to define and deliver client-specific solutions under tight deadlines.",
        "Drafted detailed project roadmaps and documentation, improving team coordination and stakeholder communication."
      ]
    }
  ]

  return (
    <div className="relative">
      {/* Subtle background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-neutral-50 via-white to-neutral-100 dark:from-neutral-950 dark:via-black dark:to-neutral-900 -z-10" />

      {/* Cursor follower - hidden on mobile */}
      <div
        className="fixed w-6 h-6 bg-neutral-900/10 dark:bg-white/10 rounded-full pointer-events-none transition-all duration-300 ease-out -z-10 hidden md:block"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
        }}
      />

      <SidebarProvider>
        <AppSidebar activeSection={activeSection} scrollToSection={scrollToSection} />
        <SidebarInset>
          {/* Mobile header */}
          <div className="sticky top-0 z-50 flex items-center justify-between bg-yellow-50/80 dark:bg-black/80 backdrop-blur-xl border-b border-sky-200 dark:border-neutral-800 px-4 py-3 md:hidden">
            <div className="flex items-center gap-2">
              <span className={`font-serif font-extrabold text-xl tracking-tight transition-colors duration-500 ${theme === 'dark' ? 'text-white' : 'text-[#2d225a]'}`}>SB<span className="text-[#ff4d4f] relative inline-block text-base ml-0.5 -mb-1">.</span></span>
              <span className="font-semibold text-base ml-2">Sumeet Bidhan</span>
            </div>
            {/* Theme toggle button */}
            <button
              aria-label="Toggle dark mode"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={`w-14 h-8 rounded-full flex items-center px-1 transition-colors duration-300 relative overflow-hidden ${theme === 'dark' ? 'bg-[#23202e]' : 'bg-[#474264]'}`}
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

          <main className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 2xl:px-32 max-w-6xl mx-auto">
            {/* About Section */}
            <section id="about" ref={aboutRef} className="min-h-screen flex items-center py-8 md:py-16">
              <div className="w-full max-w-4xl">
                <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
                  <div className="flex-1 space-y-6 md:space-y-8">
                    <div className="space-y-4 md:space-y-6">
                      <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-emerald-50 dark:bg-emerald-950/50 rounded-full border border-emerald-200 dark:border-emerald-800">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                        <span className="text-xs md:text-sm font-medium text-emerald-700 dark:text-emerald-300">
                          Available for new opportunities
                        </span>
                      </div>

                      <div className="space-y-3 md:space-y-4">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                          <span className="bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-900 dark:from-white dark:via-neutral-300 dark:to-white bg-clip-text text-transparent">
                            Sumeet Bidhan
                          </span>
                        </h1>
                        <h2 className="text-lg sm:text-xl md:text-2xl text-neutral-600 dark:text-neutral-400 font-light">
                          Software Engineer | Product Builder | Data Analyst
                        </h2>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 text-sm text-neutral-500 dark:text-neutral-400">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          New Delhi, India
                        </div>
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4" />
                          2+ years experience
                        </div>
                      </div>
                    </div>

                    {/* Profile Image - Mobile First */}
                    <div className="lg:hidden flex justify-center">
                      <div className="relative">
                        <div className="w-48 h-48 rounded-full bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-800 p-1">
                          <div className="w-full h-full rounded-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                            <Image
                              src="/avatar-1.svg?height=192&width=192"
                              alt="Sumeet Bidhan"
                              width={192}
                              height={192}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Social Icons - Mobile Only */}
                    <div className="lg:hidden flex justify-center gap-4">
                      {[
                        { icon: Github, href: "https://github.com/sumeetbidhan", label: "GitHub" },
                        { icon: Linkedin, href: "https://www.linkedin.com/in/sumeetbidhan", label: "LinkedIn" },
                        { icon: Mail, href: "mailto:sumeetbidhanwork@gmail.com", label: "Email" },
                      ].map((social, index) => (
                        <a
                          key={index}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-neutral-600 dark:text-neutral-400 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
                        >
                          <social.icon className="w-6 h-6" />
                        </a>
                      ))}
                      <a
                        href="https://leetcode.com/u/sumeetbidhan/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-600 dark:text-neutral-400 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
                        >
                        <Code className="w-6 h-6" />
                      </a>
                    </div>

                    <div className="space-y-4 md:space-y-6 max-w-2xl">
                      <p className="text-base md:text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
                      I'm a full-stack developer with a focus on building fast, scalable, and user-friendly web and mobile applications. My experience spans working with startups and growing companies, where I've delivered impactful products using technologies like React, Next.js, TypeScript, FastAPI, PostgreSQL, and Firebase. Whether it's creating eCommerce platforms, CMS-powered websites, or cross-platform apps, I enjoy turning complex ideas into seamless digital experiences.
                      </p>
                      <p className="text-base md:text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
                      I care deeply about clean architecture, performance optimization, and delivering features that matter. I've worked closely with design, marketing, and DevOps teams to ship high-converting pages, integrate payment systems like Razorpay, and automate deployments with Docker, GitHub Actions, and AWS. Outside of coding, I enjoy working on personal projects, exploring new tools, and continuously sharpening my skills through real-world challenges.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                      <Button
                        size="lg"
                        onClick={() => scrollToSection("contact")}
                        className="bg-neutral-900 hover:bg-yellow-400 dark:bg-white dark:text-black dark:hover:bg-yellow-300 text-white px-6 md:px-8 py-2.5 md:py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 w-full sm:w-auto"
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Get in touch
                      </Button>
                      <a
                        href="https://drive.google.com/file/d/15wVdyQ_-SxiDrHhQ9EYLVi1fyC98D1iF/view?pli=1"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center bg-transparent border border-neutral-200 dark:border-neutral-700 hover:border-yellow-400 dark:hover:border-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 text-neutral-900 dark:text-white px-6 md:px-8 py-2.5 md:py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 w-full sm:w-auto"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Resume
                      </a>
                    </div>

                    {/* Social Icons - Desktop Only */}
                    <div className="hidden lg:flex gap-6">
                      {[
                        { icon: Github, href: "https://github.com/sumeetbidhan", label: "GitHub" },
                        { icon: Linkedin, href: "https://www.linkedin.com/in/sumeetbidhan", label: "LinkedIn" },
                        { icon: Mail, href: "mailto:sumeetbidhanwork@gmail.com", label: "Email" },
                      ].map((social, index) => (
                        <a
                          key={index}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-neutral-600 dark:text-neutral-400 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
                        >
                          <social.icon className="w-6 h-6" />
                        </a>
                      ))}
                      <a
                        href="https://leetcode.com/u/sumeetbidhan/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neutral-600 dark:text-neutral-400 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
                        >
                        <Code className="w-6 h-6" />
                      </a>
                    </div>

                  </div>

                  {/* Profile Image - Desktop Only */}
                  <div className="hidden lg:block lg:w-80 flex-shrink-0">
                    <div className="relative">
                      <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-full bg-gradient-to-br from-neutral-200 to-neutral-300 dark:from-neutral-700 dark:to-neutral-800 p-1">
                        <div className="w-full h-full rounded-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                          <Image
                            src="/avatar-1.svg?height=320&width=320"
                            alt="Sumeet Bidhan"
                            width={320}
                            height={320}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Work Section */}
            <section id="work" ref={workRef} className="min-h-screen flex items-center py-16 md:py-24">
              <div className="w-full space-y-12 md:space-y-16">
                <div className="space-y-3 md:space-y-4">
                  <h2 className="text-3xl md:text-4xl font-bold">Work Experience</h2>
                  <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400">
                    Building products at scale for millions of users
                  </p>
                </div>

                <div className="space-y-8 md:space-y-12">
                  {experience.map((exp, index) => (
                    <div key={index} className="group">
                      <div className="flex flex-col gap-4 md:gap-8 md:flex-row">
                        <div className="md:w-48 flex-shrink-0">
                          <div className="text-sm text-neutral-500 dark:text-neutral-400 font-mono">{exp.period}</div>
                        </div>
                        <div className="flex-1 space-y-3 md:space-y-4">
                          <div className="space-y-1 md:space-y-2">
                            <div className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white group-hover:text-neutral-600 dark:group-hover:text-neutral-300 transition-colors">
                              {exp.role}
                            </div>
                            <div className="flex items-center gap-2 mb-0.5">
                              <Image src={exp.logo} alt={exp.company} width={28} height={28} className="rounded bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700" />
                              <span className="font-medium text-base md:text-lg text-neutral-700 dark:text-neutral-200">{exp.company}</span>
                            </div>
                            <div className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400 mb-1">
                              {exp.period} <span className="hidden md:inline">· {exp.location}</span>
                            </div>
                            <div className="text-sm md:text-base text-neutral-700 dark:text-neutral-300 mb-1">
                              {exp.summary}
                          </div>
                            <ul className="list-disc pl-5 space-y-1 text-sm md:text-base text-neutral-700 dark:text-neutral-300">
                            {exp.highlights.map((highlight, i) => (
                                <li key={i}>{highlight}</li>
                            ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Education/Certification Section */}
            <section id="education" ref={educationRef} className="min-h-screen flex items-center py-16 md:py-24">
              <div className="w-full space-y-12 md:space-y-16">
                <div className="space-y-3 md:space-y-4">
                  <h2 className="text-3xl md:text-4xl font-bold">Education & Certifications</h2>
                  <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400">
                    Academic background and professional certifications
                  </p>
                </div>

                <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden">
                  {/* Tabs */}
                  <div className="flex border-b border-neutral-200 dark:border-neutral-700">
                    {[
                      { id: "education", label: "Education", active: activeTab === "education" },
                      { id: "certifications", label: "Certifications", active: activeTab === "certifications" }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                          tab.active 
                            ? 'bg-yellow-500 text-white' 
                            : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                        }`}
                        onClick={() => setActiveTab(tab.id)}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8">
                    {activeTab === "education" && (
                      <div className="space-y-6">
                        <h3 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white">Education</h3>
                        
                        <div className="relative">
                          {/* Education Entry */}
                          <div className="relative flex items-start space-x-4">
                            <div className="flex-shrink-0 w-16 h-16 bg-white dark:bg-neutral-800 rounded-full flex items-center justify-center border border-neutral-200 dark:border-neutral-700">
                              <Image 
                                src="/logos/GGSIU_logo.svg.png" 
                                alt="GGSIU Logo" 
                                width={48} 
                                height={48} 
                                className="w-12 h-12 object-contain"
                              />
                            </div>
                            <div className="flex-1 space-y-2">
                              <div className="text-sm text-neutral-500 dark:text-neutral-400">2016 - 2020</div>
                              <div className="text-lg md:text-xl font-bold text-neutral-900 dark:text-white">
                                Bachelor of Technology (B.Tech), Biochemical Engineering
                              </div>
                              <div className="text-sm text-neutral-600 dark:text-neutral-300">
                                Guru Gobind Singh Indraprastha University (GGSIPU), Dwarka, New Delhi
                              </div>
                              <div className="text-sm text-neutral-600 dark:text-neutral-300">
                                University School of Chemical Technology (USCT)
                              </div>
                              <div className="text-sm text-neutral-600 dark:text-neutral-300">
                                Key Courses: Computational Methods, Bioprocess Equipment Design, Enzyme Technology
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === "certifications" && (
                      <div className="space-y-6">
                        <h3 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white">Certifications</h3>
                        
                        <div className="relative">
                          {/* Certification Entries */}
                          {[
                            {
                              year: "2025",
                              title: "Data Structures & Algorithms in Python: Sorting Algorithms",
                              issuedBy: "Skillsoft",
                              logo: "/logos/skillsoft.png",
                              link: "https://skillsoft.digitalbadges.skillsoft.com/575391a7-8dbe-4ac1-ad1d-287ff4826cf6"
                            },
                            {
                              year: "2024",
                              title: "Geospatial Analysis",
                              description: "GeoPandas | Python",
                              issuedBy: "Kaggle",
                              logo: "/logos/kaggle.png",
                              link: "https://www.kaggle.com/learn/certification/sumeetbidhan/geospatial-analysis"
                            },
                            {
                              year: "2024",
                              title: "Pandas",
                              description: "Pandas | GeoPandas | Python",
                              issuedBy: "Kaggle",
                              logo: "/logos/kaggle.png",
                              link: "https://www.kaggle.com/learn/certification/sumeetbidhan/pandas"
                            },
                            {
                              year: "2024",
                              title: "CS50's Introduction to Computer Science",
                              description: "Foundational course in computer science exploring algorithms, data structures, AI, SQL, and web technologies with a focus on computational thinking",
                              issuedBy: "Harvard University",
                              logo: "/logos/harvard.png",
                              link: "https://cs50.harvard.edu/x/2024/certificate/"
                            },
                            {
                              year: "2024",
                              title: "CS50's Introduction to Programming with Python",
                              description: "Comprehensive Python programming course covering memory management, OOP, algorithms, and practical problem-solving.",
                              issuedBy: "Harvard University",
                              logo: "/logos/harvard.png",
                              link: "https://cs50.harvard.edu/python/certificate/"
                            },
                            {
                              year: "2024",
                              title: "Introduction to Machine Learning",
                              description: "Machine Learning | Pandas | Python",
                              issuedBy: "Kaggle",
                              logo: "/logos/kaggle.png",
                              link: "https://www.kaggle.com/learn/certification/sumeetbidhan/intro-to-machine-learning"
                            },
                            {
                              year: "2024",
                              title: "Python",
                              description: "Python",
                              issuedBy: "Kaggle",
                              logo: "/logos/kaggle.png",
                              link: "https://www.kaggle.com/learn/certification/sumeetbidhan/python"
                            },
                            {
                              year: "2023",
                              title: "International English Language Testing System",
                              description: "English | Analytical Skills",
                              issuedBy: "British Council",
                              logo: "/logos/ilets.png",
                              link: "http://linkedin.com/feed/update/urn:li:activity:7242253404708749314/"
                            }
                          ].map((cert, index) => (
                            <div key={index} className="relative flex items-start space-x-4 mb-6">
                              <div className="flex-shrink-0 w-16 h-16 bg-white dark:bg-neutral-800 rounded-full flex items-center justify-center border border-neutral-200 dark:border-neutral-700">
                                <Image 
                                  src={cert.logo} 
                                  alt={`${cert.issuedBy} Logo`} 
                                  width={48} 
                                  height={48} 
                                  className="w-12 h-12 object-contain p-1"
                                />
                              </div>
                              <div className="flex-1 space-y-2">
                                <div className="text-sm text-neutral-500 dark:text-neutral-400">{cert.year}</div>
                                <div className="text-lg font-bold text-neutral-900 dark:text-white">
                                  {cert.title}
                                </div>
                                {cert.description && (
                                  <div className="text-sm text-neutral-600 dark:text-neutral-300">
                                    {cert.description}
                                  </div>
                                )}
                                <div className="text-sm text-neutral-500 dark:text-neutral-400">
                                  Issued By: {cert.issuedBy}
                                </div>
                                <a 
                                  href={cert.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-block px-4 py-2 bg-yellow-500 text-white rounded-lg text-sm font-medium hover:bg-yellow-600 transition-colors"
                                >
                                  View Certificate
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* Projects Section */}
            <section id="projects" ref={projectsRef} className="min-h-screen flex items-center py-16 md:py-24">
              <div className="w-full space-y-16 md:space-y-20">
                <div className="space-y-3 md:space-y-4">
                  <h2 className="text-3xl md:text-4xl font-bold">Selected Projects</h2>
                  <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400">
                    Some things I've built in my spare time
                  </p>
                </div>

                <div className="space-y-20 md:space-y-24">
                  {projects.map((project, index) => (
                    <div key={index} className="group">
                      <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
                        {/* Project Image Carousel */}
                        <div className="order-2 lg:order-1">
                          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                            {project.images && project.images.length > 0 ? (
                              <div className="relative w-full h-full">
                                <Image
                                  src={project.images[activeImageIndex[project.title] || 0]}
                                  alt={`${project.title} screenshot`}
                                  fill
                                  className="object-contain bg-neutral-50 dark:bg-neutral-900 transition-all duration-500 ease-in-out"
                                />
                                {project.images.length > 1 && (
                                  <>
                                    {/* Navigation Dots */}
                                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 bg-black/50 backdrop-blur-sm px-3 py-2 rounded-full">
                                      {project.images.map((_, index) => (
                                        <button
                      key={index}
                                          onClick={() => setActiveImageIndex(prev => ({ ...prev, [project.title]: index }))}
                                          className={`w-3 h-3 rounded-full transition-all duration-300 ease-in-out ${
                                            index === (activeImageIndex[project.title] || 0) ? 'bg-yellow-400 scale-110' : 'bg-white hover:bg-yellow-300 hover:scale-110'
                                          }`}
                                        />
                                      ))}
                                    </div>
                                    {/* Navigation Arrows */}
                                    <button
                                      onClick={() => {
                                        const currentIndex = activeImageIndex[project.title] || 0;
                                        const newIndex = currentIndex === 0 ? project.images.length - 1 : currentIndex - 1;
                                        setActiveImageIndex(prev => ({ ...prev, [project.title]: newIndex }));
                                      }}
                                      className="absolute left-3 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/60 text-white rounded-full flex items-center justify-center hover:bg-black/80 hover:scale-110 transition-all duration-300 ease-in-out"
                                    >
                                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                      </svg>
                                    </button>
                                    <button
                                      onClick={() => {
                                        const currentIndex = activeImageIndex[project.title] || 0;
                                        const newIndex = currentIndex === project.images.length - 1 ? 0 : currentIndex + 1;
                                        setActiveImageIndex(prev => ({ ...prev, [project.title]: newIndex }));
                                      }}
                                      className="absolute right-3 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/60 text-white rounded-full flex items-center justify-center hover:bg-black/80 hover:scale-110 transition-all duration-300 ease-in-out"
                                    >
                                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                      </svg>
                                    </button>
                                  </>
                                )}
                              </div>
                            ) : (
                              <div className="w-full h-full bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900 dark:to-yellow-800 rounded-2xl flex items-center justify-center">
                                <span className="text-6xl">📱</span>
                            </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Project Content */}
                        <div className="order-1 lg:order-2 space-y-6">
                          <div className="space-y-4">
                            <div className="flex items-center gap-3">
                              <span className="text-sm text-neutral-500 dark:text-neutral-400 font-mono">{project.year}</span>
                                  <Badge
                                    variant={project.status === "Live" ? "default" : "secondary"}
                                    className={
                                      project.status === "Live"
                                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
                                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                    }
                                  >
                                    {project.status}
                                  </Badge>
                                </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                              {project.title}
                            </h3>
                            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-lg">
                              {project.description}
                            </p>
                          </div>

                          {/* Tech Stack */}
                          <div className="space-y-3">
                            <h4 className="text-sm font-semibold text-neutral-900 dark:text-white uppercase tracking-wide">Technologies</h4>
                            <div className="flex flex-wrap gap-2">
                              {project.tech.map((tech, i) => (
                                <span
                                  key={i}
                                  className="px-3 py-1 text-sm font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-lg border border-neutral-200 dark:border-neutral-700"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-4 pt-4">
                            {project.link && project.link !== "#" && (
                              <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-500 text-white rounded-lg font-medium hover:bg-yellow-600 transition-colors group"
                              >
                                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:animate-bounce" />
                                Live Demo
                              </a>
                            )}
                            {project.github && (
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-black rounded-lg font-medium hover:bg-neutral-700 dark:hover:bg-neutral-200 transition-colors"
                              >
                                <Github className="w-4 h-4" />
                                View Code
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Skills Section */}
            <section id="skills" ref={skillsRef} className="min-h-screen flex items-center py-16 md:py-24">
              <div className="w-full space-y-12 md:space-y-16">
                <div className="space-y-3 md:space-y-4">
                  <h2 className="text-3xl md:text-4xl font-bold">Skills & Expertise</h2>
                  <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400">
                    Technologies I work with and love
                  </p>
                </div>

                <div className="grid gap-8 md:gap-12 lg:grid-cols-2">
                  <div className="space-y-6 md:space-y-8">
                    <h3 className="text-xl md:text-2xl font-semibold">Technical Skills</h3>
                    <div className="space-y-4 md:space-y-6">
                      {skills.map((skill, index) => (
                        <div key={index} className="space-y-2 md:space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-sm md:text-base">{skill.name}</span>
                            <span className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400">
                              {skill.level}%
                            </span>
                          </div>
                          <div className="h-2 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-neutral-900 to-neutral-700 dark:from-white dark:to-neutral-300 rounded-full transition-all duration-1000 ease-out"
                              style={{ width: `${skill.level}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6 md:space-y-8">
                    <h3 className="text-xl md:text-2xl font-semibold">What I Do</h3>
                    <div className="space-y-4 md:space-y-6">
                      {[
                        {
                          title: "Frontend Development",
                          description: "React.js, Next.js, Vue.js, TypeScript, HTML5, CSS3, Tailwind CSS, Bootstrap, SASS. Creating responsive and interactive user interfaces with modern frameworks.",
                        },
                        {
                          title: "Backend Development",
                          description: "Node.js, Express, Django, Flask, FastAPI, Firebase. Building scalable APIs and server-side applications with robust architecture.",
                        },
                        {
                          title: "Database & DevOps",
                          description: "MySQL, PostgreSQL, MongoDB, Docker, AWS (EC2, S3), GitHub Actions, CI/CD. Managing data systems and cloud infrastructure.",
                        },
                        {
                          title: "Mobile & CMS",
                          description: "React Native, WordPress, Shopify. Cross-platform mobile development and content management systems integration.",
                        },
                      ].map((item, index) => (
                        <div key={index} className="space-y-2">
                          <h4 className="font-semibold text-sm md:text-base">{item.title}</h4>
                          <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-sm md:text-base">
                            {item.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Contact Section */}
            <section id="contact" ref={contactRef} className="min-h-screen flex items-center py-16 md:py-24">
              <div className="w-full max-w-xl mx-auto flex flex-col gap-8 items-center">
                <h2 className="text-4xl md:text-5xl font-extrabold text-[#3d3553] dark:text-white mb-6 text-center">Let's talk about everything!</h2>
                <p className="text-lg md:text-xl text-[#3d3553] dark:text-neutral-200 font-medium mb-2 text-center">Don't like forms? <a href="mailto:sumeetbidhanwork@gmail.com" className="underline underline-offset-2 decoration-[#ffb199] hover:text-[#ffb199] transition-colors">Send me an email</a>. <span role="img" aria-label="wave">👋</span></p>
                <form onSubmit={handleContactSubmit} className="flex flex-col gap-6 w-full">
                  <div className="flex flex-col md:flex-row gap-4 w-full">
                          <input
                            type="text"
                      placeholder="Insert your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="flex-1 px-6 py-4 rounded-full bg-white text-[#3d3553] placeholder-[#a3a3a3] text-base border-0 shadow-sm focus:ring-2 focus:ring-[#ffb199] outline-none transition-all w-full"
                          />
                          <input
                            type="email"
                      placeholder="Insert your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="flex-1 px-6 py-4 rounded-full bg-white text-[#3d3553] placeholder-[#a3a3a3] text-base border-0 shadow-sm focus:ring-2 focus:ring-[#ffb199] outline-none transition-all w-full"
                          />
                        </div>
                  <input
                    type="text"
                    placeholder="Insert your subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                    className="px-6 py-4 rounded-full bg-white text-[#3d3553] placeholder-[#a3a3a3] text-base border-0 shadow-sm focus:ring-2 focus:ring-[#ffb199] outline-none transition-all w-full"
                  />
                          <textarea
                    rows={5}
                    placeholder="Write your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="px-6 py-4 rounded-3xl bg-white text-[#3d3553] placeholder-[#a3a3a3] text-base border-0 shadow-sm focus:ring-2 focus:ring-[#ffb199] outline-none transition-all resize-none w-full"
                  />
                  <div className="flex justify-center w-full">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="mt-2 px-8 py-3 rounded-full bg-[#ff8c42] text-white font-semibold text-lg shadow-md transition-all disabled:opacity-60 hover:bg-[#ffb199]"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                        </div>
                </form>
              </div>
            </section>
          </main>
        </SidebarInset>
      </SidebarProvider>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right-2 duration-300">
          <div className={`rounded-lg shadow-lg border p-4 max-w-sm ${
            toastType === 'success' 
              ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' 
              : 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800'
          }`}>
            <div className="flex items-start gap-3">
              <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                toastType === 'success' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-red-500 text-white'
              }`}>
                {toastType === 'success' ? (
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <p className={`text-sm font-medium ${
                  toastType === 'success' 
                    ? 'text-green-800 dark:text-green-200' 
                    : 'text-red-800 dark:text-red-200'
                }`}>
                  {toastMessage}
                </p>
              </div>
              <button
                onClick={() => setShowToast(false)}
                className="flex-shrink-0 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Mobile Bottom Navbar */}
      <MobileNav activeSection={activeSection} scrollToSection={scrollToSection} />
    </div>
  )
}
