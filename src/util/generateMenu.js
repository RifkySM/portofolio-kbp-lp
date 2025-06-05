import serverAxios from "@/lib/axiosServer";

export async function generateMenu() {
    try {
        const discoveries = (await serverAxios.get('/discovery/display')).data;
        const multiPurposeMenu = (await serverAxios.get('/multi-purpose-menu/display')).data.data[0];

        const menuItems = [
            {
                title: "Discover KBPayuk",
                href: "#",
                dropdownItems: discoveries.data.map((discovery) => {
                    return {
                        title: discovery.title,
                        href: `/discovery/${discovery.title}`,
                    }
                }),
            },
            {
                title: "What's On",
                href: "#",
                dropdownItems: [
                    { title: "KBPayuk Event", href: "/" },
                    { title: "News", href: "/news" },
                ],
            },
            {
                title: multiPurposeMenu.name,
                href: "#",
                dropdownItems: multiPurposeMenu.children.map((child) => {
                    return {
                        title: child.name,
                        href: child.link,
                    }
                })
            },
            {
                title: "Get Explore",
                href: "#",
                dropdownItems: [
                    { title: "KBPa Maps", href: "/maps" },
                    { title: "KBPa Transportation", href: "/transportation" },
                ],
            },
        ]

        return menuItems
    } catch (err) {
        console.error('Error fetching menu:', err);
    }
}
