import { MetadataRoute } from "next";
import { products } from "@/data/products";

const siteUrl = "https://vitaflowpharm.uz";

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();

    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: siteUrl,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 1.0,
        },
    ];

    const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
        url: `${siteUrl}/mahsulot/${product.id}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.8,
    }));

    return [...staticRoutes, ...productRoutes];
}