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
    const url = `${siteUrl}/mahsulot/${product.id}`;

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
            images: [{ url: `/products/${product.id}.png`, width: 800, height: 800, alt: `${product.name} — Vitaflow Pharm` }],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [`/products/${product.id}.png`],
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
        image: `${siteUrl}/products/${product.id}.png`,
        url: `${siteUrl}/mahsulot/${product.id}`,
        brand: { "@type": "Brand", name: "Vitaflow Pharm" },
        offers: {
            "@type": "Offer",
            priceCurrency: "UZS",
            price: String(product.price),
            availability: "https://schema.org/InStock",
            seller: { "@type": "Organization", name: "Vitaflow Pharm", url: siteUrl },
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Navbar />
            <main className="pt-20 min-h-screen bg-background">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">

                    {/* Breadcrumb */}
                    <nav aria-label="Breadcrumb" className="mb-8">
                        <ol
                            className="flex items-center gap-2 text-sm text-muted-foreground font-body"
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
                                className="text-primary"
                                itemProp="itemListElement"
                                itemScope
                                itemType="https://schema.org/ListItem"
                            >
                                <span itemProp="name">{product.name}</span>
                                <meta itemProp="position" content="3" />
                            </li>
                        </ol>
                    </nav>

                    <div className="grid lg:grid-cols-2 gap-16 items-start">
                        {/* Image */}
                        <div className="flex justify-center">
                            <div className="relative bg-secondary/30 rounded-3xl border border-border p-12">
                                <Image
                                    src={product.image}
                                    alt={`${product.name} — ${product.volume} suspenziya`}
                                    width={400}
                                    height={400}
                                    className="w-full max-w-xs object-contain drop-shadow-xl"
                                    priority
                                    quality={90}
                                />
                            </div>
                        </div>

                        {/* Info */}
                        <div className="space-y-6">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-body tracking-widest uppercase">
                {product.volume}
              </span>
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground">
                                {product.name}
                            </h1>
                            <p className="text-muted-foreground font-body text-lg leading-relaxed">
                                {product.description}
                            </p>

                            <ul className="space-y-3" role="list">
                                {product.benefits.map((benefit, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" aria-hidden="true" />
                                        <span className="text-foreground font-body">{benefit}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="pt-4">
                                <p className="text-4xl font-display font-bold text-gradient-gold mb-6">
                                    {product.priceFormatted}
                                </p>
                                {/* Client component — opens order modal */}
                                <OrderButton productName={product.name} />
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
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