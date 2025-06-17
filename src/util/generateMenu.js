import axiosClient from "@/lib/axiosClient";

export async function generateMenu() {
    try {
        const discoveryResponse = await axiosClient.get('/discovery/display');
        const multiPurposeResponse = await axiosClient.get('/multi-purpose-menu/display');

        const discoveries = discoveryResponse?.data?.data || [];
        const multiPurposeMenu = multiPurposeResponse?.data?.data?.[0] || {};

        const menuItems = [
            {
                title: "Discover KBPayuk",
                href: "#",
                dropdownItems: discoveries.map((discovery) => {
                    return {
                        title: discovery?.title || 'Untitled',
                        href: `/discovery/${discovery?.title || ''}`,
                    }
                }),
            },
            {
                title: "What's On",
                href: "#",
                dropdownItems: [
                    { title: "KBPayuk Event", href: "#this-month-event" },
                    { title: "News", href: "/news" },
                ],
            },
            {
                title: multiPurposeMenu?.name || 'Menu',
                href: "#",
                dropdownItems: (multiPurposeMenu?.children || []).map((child) => {
                    return {
                        title: child?.name || 'Untitled',
                        href: child?.link || '#',
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
        // Return a default menu structure when there's an error
        return [
            {
                title: "Error",
                href: "#",
                dropdownItems: []
            }
        ];
    }
}
