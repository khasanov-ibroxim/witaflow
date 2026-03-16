import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

const siteUrl = "https://vitaflowpharm.uz";

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),

    title: {
        default: "Vitaflow Pharm — OsteoBalance, Baby Vita, Melatonin | Premium Vitaminlar Uzbekiston",
        template: "%s | Vitaflow Pharm",
    },
    description:
        "Vitaflow Pharm — Toshkentdagi premium vitamin va mineral komplekslari ishlab chiqaruvchisi. OsteoBalance (Kaltsiy+D3+Magniy+Rux+C), Baby Vita bolalar uchun, Melatonin uyqu uchun. GMO va shakarsiz, yuqori sifat.",
    keywords: [
        "vitaflow pharm",
        "osteobalance",
        "kaltsiy magniy d3",
        "vitamin uzbekiston",
        "bad uzbekistan",
        "baby vita",
        "melatonin",
        "suyak vitamini",
        "immunitet vitamin",
        "bolalar vitamini",
        "vitaminlar toshkent",
        "premium vitamin",
        "suspenziya vitamin",
        "zinc vitamin",
        "c vitamin",
    ],

    authors: [{ name: "Vitaflow Pharm", url: siteUrl }],
    creator: "Vitaflow Pharm",
    publisher: "Vitaflow Pharm",

    alternates: {
        canonical: siteUrl,
        languages: {
            "uz-UZ": siteUrl,
        },
    },

    openGraph: {
        type: "website",
        locale: "uz_UZ",
        url: siteUrl,
        siteName: "Vitaflow Pharm",
        title: "Vitaflow Pharm — Premium Vitaminlar va Minerallar | Uzbekiston",
        description:
            "OsteoBalance, Baby Vita va Melatonin — ilmiy asosda ishlab chiqilgan premium sifatli vitamin suspenziyalari. GMO va shakarsiz. Toshkentda yetkazib berish.",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Vitaflow Pharm — OsteoBalance, Baby Vita, Melatonin premium vitamin suspenziyalari",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: "Vitaflow Pharm — Premium Vitaminlar | Uzbekiston",
        description:
            "OsteoBalance, Baby Vita va Melatonin — ilmiy asosda ishlab chiqilgan premium vitamin suspenziyalari.",
        images: ["/og-image.png"],
    },

    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },

    icons: {
        icon: [
            { url: "/favicon.ico", sizes: "any" },
            { url: "/icon.svg", type: "image/svg+xml" },
            { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
            { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
        ],
        apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
        shortcut: "/favicon.ico",
    },

    manifest: "/site.webmanifest",

    verification: {
        // google: "YOUR_GOOGLE_SEARCH_CONSOLE_CODE",
        // yandex: "YOUR_YANDEX_WEBMASTER_CODE",
    },

    category: "health",
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#ffffff" },
        { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
    ],
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="uz" dir="ltr">
        <head>
            {/* Preconnect to improve performance */}
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

            {/* JSON-LD Structured Data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@graph": [
                            {
                                "@type": "Organization",
                                "@id": `${siteUrl}/#organization`,
                                name: "Vitaflow Pharm",
                                url: siteUrl,
                                logo: {
                                    "@type": "ImageObject",
                                    url: `${siteUrl}/logo.png`,
                                    width: 512,
                                    height: 512,
                                },
                                description:
                                    "Vitaflow Pharm — O'zbekistonda premium sifatli vitamin va mineral komplekslari ishlab chiqaruvchisi.",
                                address: {
                                    "@type": "PostalAddress",
                                    addressLocality: "Toshkent",
                                    addressCountry: "UZ",
                                },
                                contactPoint: {
                                    "@type": "ContactPoint",
                                    telephone: "+998-90-123-45-67",
                                    contactType: "customer service",
                                    availableLanguage: ["Uzbek", "Russian"],
                                },
                                sameAs: [],
                            },
                            {
                                "@type": "WebSite",
                                "@id": `${siteUrl}/#website`,
                                url: siteUrl,
                                name: "Vitaflow Pharm",
                                description:
                                    "Premium vitamin va mineral komplekslari — OsteoBalance, Baby Vita, Melatonin",
                                publisher: { "@id": `${siteUrl}/#organization` },
                                inLanguage: "uz-UZ",
                            },
                            {
                                "@type": "WebPage",
                                "@id": `${siteUrl}/#webpage`,
                                url: siteUrl,
                                name: "Vitaflow Pharm — Premium Vitaminlar va Minerallar",
                                isPartOf: { "@id": `${siteUrl}/#website` },
                                about: { "@id": `${siteUrl}/#organization` },
                                description:
                                    "OsteoBalance, Baby Vita va Melatonin — ilmiy asosda ishlab chiqilgan premium sifatli vitamin suspenziyalari.",
                                inLanguage: "uz-UZ",
                            },
                            {
                                "@type": "ItemList",
                                name: "Vitaflow Pharm mahsulotlari",
                                itemListElement: [
                                    {
                                        "@type": "ListItem",
                                        position: 1,
                                        item: {
                                            "@type": "Product",
                                            name: "OsteoBalance",
                                            description:
                                                "Kaltsiy, Magniy, D3, Rux va C vitamini suspenziyasi — suyaklar mustahkamligi va immunitet uchun. 100 ml.",
                                            url: `${siteUrl}/mahsulot/osteobalance`,
                                            image: `${siteUrl}/products/osteobalance.png`,
                                            brand: { "@type": "Brand", name: "Vitaflow Pharm" },
                                            offers: {
                                                "@type": "Offer",
                                                priceCurrency: "UZS",
                                                price: "500000",
                                                availability: "https://schema.org/InStock",
                                                seller: { "@id": `${siteUrl}/#organization` },
                                            },
                                        },
                                    },
                                    {
                                        "@type": "ListItem",
                                        position: 2,
                                        item: {
                                            "@type": "Product",
                                            name: "Baby Vita",
                                            description:
                                                "Bolalar uchun multivitamin suspenziyasi — sog'lom o'sish va rivojlanish uchun. 100 ml.",
                                            url: `${siteUrl}/mahsulot/baby-vita`,
                                            image: `${siteUrl}/products/baby-vita.png`,
                                            brand: { "@type": "Brand", name: "Vitaflow Pharm" },
                                            offers: {
                                                "@type": "Offer",
                                                priceCurrency: "UZS",
                                                price: "600000",
                                                availability: "https://schema.org/InStock",
                                                seller: { "@id": `${siteUrl}/#organization` },
                                            },
                                        },
                                    },
                                    {
                                        "@type": "ListItem",
                                        position: 3,
                                        item: {
                                            "@type": "Product",
                                            name: "Melatonin",
                                            description:
                                                "Sifatli uyqu va dam olish uchun tabiiy melatonin preparati. 100 ml.",
                                            url: `${siteUrl}/mahsulot/melatonin`,
                                            image: `${siteUrl}/products/melatonin.png`,
                                            brand: { "@type": "Brand", name: "Vitaflow Pharm" },
                                            offers: {
                                                "@type": "Offer",
                                                priceCurrency: "UZS",
                                                price: "800000",
                                                availability: "https://schema.org/InStock",
                                                seller: { "@id": `${siteUrl}/#organization` },
                                            },
                                        },
                                    },
                                ],
                            },
                        ],
                    }),
                }}
            />
            <meta name="google-site-verification" content="s2VmOYqpbJsnG0amG4z972bSML1_VwzJUmF3yJNvGvA" />
            {/* ✅ Google Analytics */}
            <Script
                strategy="afterInteractive"
                src="https://www.googletagmanager.com/gtag/js?id=G-5WQ53H8GRV"
            />
            <Script
                id="google-analytics"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', 'G-5WQ53H8GRV', {
                        page_path: window.location.pathname,
                      });
                    `,
                }}
            />

            {/* ✅ Yandex Metrika */}
            <Script
                id="yandex-metrika"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                      (function(m,e,t,r,i,k,a){
                        m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                        m[i].l=1*new Date();
                        for (var j = 0; j < document.scripts.length; j++) {
                          if (document.scripts[j].src === r) { return; }
                        }
                        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
                      })(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym');

                      ym(107723464, 'init', {
                        clickmap: true,
                        trackLinks: true,
                        accurateTrackBounce: true,
                        webvisor: true,
                        ecommerce: 'dataLayer'
                      });
                    `,
                }}
            />
        </head>
        <body className={inter.className}>{children}</body>
        </html>
    );
}