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
                url: "/vf-logo.png",
                width: 400,
                height: 400,
                alt: "Vitaflow Pharm — OsteoBalance, Baby Vita, Melatonin premium vitamin suspenziyalari",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: "Vitaflow Pharm — Premium Vitaminlar | Uzbekiston",
        description:
            "OsteoBalance, Baby Vita va Melatonin — ilmiy asosda ishlab chiqilgan premium vitamin suspenziyalari.",
        images: ["/vf-logo.png"],
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
            { url: "/vf-logo.png", sizes: "any" },
            { url: "/vf-logo.png", type: "image/svg+xml" },
            { url: "/vf-logo.png", sizes: "192x192", type: "image/png" },
            { url: "/vf-logo.png", sizes: "512x512", type: "image/png" },
        ],
        apple: [{ url: "/vf-logo.png", sizes: "180x180" }],
        shortcut: "/vf-logo.png",
    },

    manifest: "/site.webmanifest",

    verification: {
        google: "9903763f49128b58",
        yandex: "ccbfefa766afbf88",
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
                                "@id": `${siteUrl}/#haqida`,
                                name: "Vitaflow Pharm",
                                url: siteUrl,
                                logo: {
                                    "@type": "ImageObject",
                                    url: `${siteUrl}/vf-logo.png`,
                                    width: 312,
                                    height: 312,
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
                                    telephone: "+998-90-021-30-21",
                                    contactType: "customer service",
                                    availableLanguage: ["Uzbek", "Russian"],
                                },
                                sameAs: [],
                            },
                            {
                                "@type": "WebSite",
                                "@id": `${siteUrl}/`,
                                url: siteUrl,
                                name: "Vitaflow Pharm",
                                description:
                                    "Premium vitamin va mineral komplekslari — OsteoBalance, Baby Vita, Melatonin",
                                publisher: { "@id": `${siteUrl}/#haqida` },
                                inLanguage: "uz-UZ",
                            },
                            {
                                "@type": "WebPage",
                                "@id": `${siteUrl}/`,
                                url: siteUrl,
                                name: "Vitaflow Pharm — Premium Vitaminlar va Minerallar",
                                isPartOf: { "@id": `${siteUrl}/` },
                                about: { "@id": `${siteUrl}/#haqida` },
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
                                            url: `${siteUrl}/product/osteobalance/`,
                                            image: `/product.png`,
                                            brand: { "@type": "Brand", name: "Vitaflow Pharm" },
                                            offers: {
                                                "@type": "Offer",
                                                priceCurrency: "UZS",
                                                price: "200000",
                                                availability: "https://schema.org/InStock",
                                                seller: { "@id": `${siteUrl}/#haqida` },
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