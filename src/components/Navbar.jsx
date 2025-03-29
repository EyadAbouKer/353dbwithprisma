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
    <NavigationMenu className="p-4">
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
                <NavigationMenuContent>
                    {/* <NavigationMenuLink href='/'>Club Member?</NavigationMenuLink> */}
                    <NavigationMenuLink href='/addentries'>Family Member</NavigationMenuLink>
                    <NavigationMenuLink href='/'>Location</NavigationMenuLink>
                    <NavigationMenuLink href='/'>Payment</NavigationMenuLink>
                    <NavigationMenuLink href='/'>Personnel</NavigationMenuLink>
                    <NavigationMenuLink href='/'>Personnel</NavigationMenuLink>
                    <NavigationMenuLink href='/'>Personnel</NavigationMenuLink>
                </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
                <NavigationMenuTrigger>
                    <Link href="/">Entry3</Link>
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
