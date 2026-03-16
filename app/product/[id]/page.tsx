import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OrderButton from "@/components/Orderbutton";

const siteUrl = "https://vitaflowpharm.uz";

interface Props {
    params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
    return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const product = products.find((p) => p.id === id);
    if (!product) return {};

    const title = `${product.name} — ${product.volume} | Vitaflow Pharm`;
    const description = `${product.shortDesc} Narxi: ${product.priceFormatted}. Premium sifat, GMO va shakarsiz. Toshkentda yetkazib berish.`;
    const url = `${siteUrl}/product/${product.id}`;

    const ogImage = `${siteUrl}/product.png`;

    return {
        title,
        description,
        alternates: { canonical: url },
        openGraph: {
            type: "website",
            locale: "uz_UZ",
            url,
            title,
            description,
            siteName: "Vitaflow Pharm",
            images: [{
                url: ogImage,   // ← absolute URL
                width: 400,
                height: 400,
                alt: `${product.name} — Vitaflow Pharm`
            }],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [ogImage],  // ← bir xil, absolute URL
        },
    };
}

export default async function ProductPage({ params }: Props) {
    const { id } = await params;
    const product = products.find((p) => p.id === id);
    if (!product) notFound();

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        description: product.description,
        image: `/product.png`,
        url: `${siteUrl}/product/${product.id}`,
        brand: { "@type": "Brand", name: "Vitaflow Pharm" },
        offers: {
            "@type": "Offer",
            priceCurrency: "UZS",
            price: String(product.price),
            availability: "https://schema.org/InStock",
            seller: { "@type": "Organization", name: "Vitaflow Pharm", url: siteUrl },
        },
    };

    const usegLeft = product.useg.slice(0, 4);
    const usegRight = product.useg.slice(4, 8);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Navbar />
            <main className="pt-20 min-h-screen bg-background">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">

                    {/* Breadcrumb */}
                    <nav aria-label="Breadcrumb" className="mb-6 sm:mb-8">
                        <ol
                            className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-sm text-muted-foreground font-body"
                            itemScope
                            itemType="https://schema.org/BreadcrumbList"
                        >
                            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                                <Link href="/" itemProp="item" className="hover:text-primary transition-colors">
                                    <span itemProp="name">Bosh sahifa</span>
                                </Link>
                                <meta itemProp="position" content="1" />
                            </li>
                            <li aria-hidden="true">/</li>
                            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                                <Link href="/#mahsulotlar" itemProp="item" className="hover:text-primary transition-colors">
                                    <span itemProp="name">Mahsulotlar</span>
                                </Link>
                                <meta itemProp="position" content="2" />
                            </li>
                            <li aria-hidden="true">/</li>
                            <li
                                className="text-primary truncate max-w-[160px] sm:max-w-none"
                                itemProp="itemListElement"
                                itemScope
                                itemType="https://schema.org/ListItem"
                            >
                                <span itemProp="name">{product.name}</span>
                                <meta itemProp="position" content="3" />
                            </li>
                        </ol>
                    </nav>

                    {/* Hero: image + info */}
                    <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

                        {/* Image */}
                        <div className="flex justify-center">
                            <div className="relative bg-secondary/30 rounded-3xl border border-border p-8 sm:p-12 w-full max-w-sm lg:max-w-none">
                                <Image
                                    src={product.image}
                                    alt={`${product.name} — ${product.volume} suspenziya`}
                                    width={400}
                                    height={400}
                                    className="w-full max-w-[260px] sm:max-w-xs mx-auto object-contain drop-shadow-xl"
                                    priority
                                    quality={90}
                                />
                            </div>
                        </div>

                        {/* Info */}
                        <div className="space-y-5 sm:space-y-6">
                            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-body tracking-widest uppercase">
                                {product.volume}
                            </span>
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-display font-bold text-foreground leading-tight">
                                {product.name}
                            </h1>
                            <p className="text-muted-foreground font-body text-base sm:text-lg leading-relaxed">
                                {product.description}
                            </p>

                            <ul className="space-y-3" role="list">
                                {product.benefits.map((benefit, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                                        <span className="text-foreground font-body text-sm sm:text-base">{benefit}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="pt-2 sm:pt-4">
                                <p className="text-3xl sm:text-4xl font-display font-bold text-gradient-gold mb-4 sm:mb-6">
                                    {product.priceFormatted}
                                </p>
                                <OrderButton productName={product.name} />
                            </div>
                        </div>
                    </div>

                    {/* Usage sections */}
                    <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">

                        {/* useg — 8 item, ichida 2 ustun */}
                        <div>
                            <h2 className="text-xl sm:text-2xl font-display font-bold mb-5">
                                Qaysi holatlarda qo&apos;llaniladi:
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                                <ul className="space-y-3" role="list">
                                    {usegLeft.map((item, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                                            <span className="text-foreground font-body text-sm">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                                <ul className="space-y-3" role="list">
                                    {usegRight.map((item, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                                            <span className="text-foreground font-body text-sm">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* year_useg — 3 item, bitta ustun */}
                        <div>
                            <h2 className="text-xl sm:text-2xl font-display font-bold mb-5">
                                Qabul qilish tartibi
                            </h2>
                            <ul className="space-y-3" role="list">
                                {product.year_useg.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                                        <span className="text-foreground font-body text-sm sm:text-base">{item}</span>
                                    </li>
                                ))}
                                <li className="pt-1">
                                    <p className="text-muted-foreground font-body text-sm sm:text-base leading-relaxed">
                                        Muhim eslatma: doktorlar har bir bemor uchun individual miqdorni belgilab berishga haqli.
                                    </p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Back link */}
                    <div className="mt-10 sm:mt-12">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-body text-sm"
                        >
                            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                            Bosh sahifaga qaytish
                        </Link>
                    </div>

                </div>
            </main>
            <Footer />
        </>
    );
}