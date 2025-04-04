import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import Link from "next/link"

export default function Navbar() {
  return (
    <NavigationMenu className="p-6 flex justify-center border-b">
      <NavigationMenuList className="gap-2">
        <NavigationMenuItem>
          <NavigationMenuTrigger className="hover:bg-slate-100 transition-colors">
            <Link href="/" className="text-slate-800 font-medium">Dashboard</Link>
          </NavigationMenuTrigger>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="hover:bg-slate-100 transition-colors">
            <span className="text-slate-800 font-medium">Add New</span>
          </NavigationMenuTrigger>
          <NavigationMenuContent className="min-w-[200px] p-2 bg-white rounded-md shadow-lg">
            <div className="flex flex-col gap-2">
              <NavigationMenuLink href='/addfamilymember' className="text-slate-800 hover:bg-slate-100 px-4 py-2 rounded-sm transition-colors">Family Member</NavigationMenuLink>
              <NavigationMenuLink href='/addlocation' className="text-slate-800 hover:bg-slate-100 px-4 py-2 rounded-sm transition-colors">Location</NavigationMenuLink>
              <NavigationMenuLink href='/addPayments' className="text-slate-800 hover:bg-slate-100 px-4 py-2 rounded-sm transition-colors">Payment</NavigationMenuLink>
              <NavigationMenuLink href='/addpersonnel' className="text-slate-800 hover:bg-slate-100 px-4 py-2 rounded-sm transition-colors">Personnel</NavigationMenuLink>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="hover:bg-slate-100 transition-colors">
            <Link href="/emails_sent" className="text-slate-800 font-medium">Emails</Link>
          </NavigationMenuTrigger>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="hover:bg-slate-100 transition-colors">
            <Link href="/reports" className="text-slate-800 font-medium">Reports</Link>
          </NavigationMenuTrigger>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="hover:bg-slate-100 transition-colors">
            <Link href="/settings" className="text-slate-800 font-medium">Settings</Link>
          </NavigationMenuTrigger>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
