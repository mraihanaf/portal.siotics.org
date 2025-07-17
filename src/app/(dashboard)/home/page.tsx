"use client"

import {
  Home,
  Ticket,
  Users,
  ExternalLink,
  ChevronUp,
  LogOut,
  Menu,
  Banknote,
  Images,
  UserIcon
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { useState } from "react"
import ProtectedPage from "@/components/pages/ProtectedPage"
import Image from "next/image"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { useSession } from "@/lib/auth-client"
import { signOut } from "@/lib/auth-client"
import Link from "next/link"
import { useGetLinks } from "@/hooks/useGetLinks"

const navigationItems = [
  {
    title: "Home",
    icon: Home,
    url: "#",
    isActive: true,
  },
  {
    title: "Absensi",
    icon: Users,
    url: "#",
  },
  {
    title: "Projects",
    icon: Ticket,
    url: "#",
  },
  {
    title: "Uang Kas",
    icon: Banknote,
    url: "#",
  },
  {
    title: "Gallery",
    icon: Images,
    url: "#",
  },
]

function SidebarContent() {
  const handleLogout = async() => {
    await signOut();
  }
  const { data } = useSession();

  return (
    <div className="h-full bg-background flex flex-col w-full">
      <div className="flex items-center gap-2 px-4 py-4 border-b">
        <Image
            src={"/siotics-logo.webp"}
            className="bg-black"
            width={24}
            height={24}
            alt="Siotics Logo"
        />
        <span className="font-semibold">Siotics Portal</span>
      </div>

      <div className="flex-1 p-2">
        <nav className="space-y-1">
          {navigationItems.map((item) => (
            <a
              key={item.title}
              href={item.url}
              className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                item.isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </a>
          ))}
        </nav>
      </div>

      {/* Footer with Dropdown */}
      <div className="p-4 border-t">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start h-auto p-2 hover:bg-muted">
              <div className="flex items-center gap-2 text-sm w-full">
                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                  <UserIcon></UserIcon>
                </div>
                <div className="flex flex-col min-w-0 text-left flex-1 font-medium">
                    {data?.user.name ? data?.user.name : data?.user.preferedName}
                </div>
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" align="end" className="w-56" sideOffset={8}>
            <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

function DesktopSidebar() {
  return (
    <div className="hidden md:flex min-w-2xs w-fit h-screen border-r max-w-fit">
      <SidebarContent />
    </div>
  )
}

function MobileSidebar() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5"/>
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-64">
        <VisuallyHidden>
            <SheetTitle>
                Sidebar Menu
            </SheetTitle>
        </VisuallyHidden>
        <SidebarContent />
      </SheetContent>
    </Sheet>
  )
}

export default function HomePage() {
  const { data } = useSession()
  const { data: socials, loading, error } = useGetLinks()
  if(error){
    alert("Ught, something went wrong...")
    alert(error)
  }
  // if(!data?.user.isApplied) return redirect("/")
  return (
    <ProtectedPage>
    <div className="flex h-screen w-full">
      <DesktopSidebar />
      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b px-4 md:px-6 flex items-center gap-4">
        <div className="hidden md:flex md:flex-col">
            <h1 className="text-lg font-semibold">Home</h1>
          </div>
          <MobileSidebar />
        </header>
        <main className="flex-1 overflow-auto p-4 md:p-6 mt-3">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl md:text-2xl font-bold">Halo, {data?.user.name ? data?.user.name : data?.user.preferedName}.</h2>
              <p className="text-base md:text-lg text-muted-foreground">Semua member diharapkan untuk join Whatsapp Group Chat dan Discord yang ada di bawah. Terimakasih!</p>
            </div>

            <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2">
            <Card>
                <CardHeader>
                  <CardTitle className="text-base md:text-lg">Whatsapp Group</CardTitle>
                  <CardDescription className="text-sm">
                    Ayo join Group Whatsapp Siotics!
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className={loading ? "w-full cursor-not-allowed opacity-50" : "w-full"}>
                    <Link href={socials?.whatsapp || "#"} target="_blank" rel="noopener noreferrer">
                      Join WhatsApp group
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base md:text-lg">Discord Server</CardTitle>
                  <CardDescription className="text-sm">
                    Ayo join Discord Siotics!
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild className={loading ? "w-full cursor-not-allowed opacity-50" : "w-full"} variant={"outline"}>
                    <Link href={socials?.discord || "#"} target="_blank" rel="noopener noreferrer">
                      Join Discord server
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
    </ProtectedPage>
  )
}
