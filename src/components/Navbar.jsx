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
    <NavigationMenu className="p-4 flex justify-center">
        <NavigationMenuList>
            <NavigationMenuItem>
                <NavigationMenuTrigger>
                    <Link href="/">Dashboard</Link>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                    {/* <NavigationMenuLink>Entry1 Content</NavigationMenuLink> */}
                </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
                <NavigationMenuTrigger>
                    {/* <Link href="/addentries">Add new</Link> */}
                    Add new
                </NavigationMenuTrigger>
                <NavigationMenuContent className="w-64 flex justify-center">
                    {/* <NavigationMenuLink href='/'>Club Member?</NavigationMenuLink> */}
                    <NavigationMenuLink href='/addfamilymember'>Family Member</NavigationMenuLink>
                    <NavigationMenuLink href='/addlocation'>Location</NavigationMenuLink>
                    <NavigationMenuLink href='/addPayments'>Payment</NavigationMenuLink>
                    <NavigationMenuLink href='/'>Personnel</NavigationMenuLink>
                    <NavigationMenuLink href='/'>Personnel</NavigationMenuLink>
                    <NavigationMenuLink href='/'>Personnel</NavigationMenuLink>
                </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
                <NavigationMenuTrigger>
                    <Link href="/emails_sent">Emails Sent</Link>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                    {/* <NavigationMenuLink>Entry3 Content</NavigationMenuLink> */}
                </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
                <NavigationMenuTrigger>
                    <Link href="/">Entry4</Link>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                    {/* <NavigationMenuLink>Entry4 Content</NavigationMenuLink> */}
                </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
                <NavigationMenuTrigger>
                    <Link href="/">Entry5</Link>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                    {/* <NavigationMenuLink>Entry5 Content</NavigationMenuLink> */}
                </NavigationMenuContent>
            </NavigationMenuItem>
        </NavigationMenuList>
    </NavigationMenu>
)
}
