import osteobalanceImg from "@/assets/product.png";
import {StaticImageData} from "next/image";

export interface Product {
  id: string;
  name: string;
  price: number;
  priceFormatted: string;
  image: StaticImageData;
  shortDesc: string;
  description: string;
  benefits: string[];
  volume: string;
}

export const products: Product[] = [
  {
    id: "osteobalance",
    name: "OsteoBalance",
    price: 200000,
    priceFormatted: "200 000 so'm",
    image: osteobalanceImg,
    shortDesc: "Kaltsiy, Magniy, D3, Rux va C vitamini suspenziyasi — suyaklar mustahkamligi va immunitet uchun.",
    description:
      "OsteoBalance — organizmga zarur bo'lgan kaltsiy, magniy, D3 vitamini, rux va C vitaminini o'z ichiga olgan premium sifatli tsitrat formasida. Suyaklar mustahkamligi, immunitet tizimini qo'llab-quvvatlash va umumiy sog'lom rivojlanish uchun maxsus ishlab chiqilgan.",
    benefits: [
      "Kaltsiy va D3 — suyaklar va tishlar mustahkamligi uchun",
      "Magniy — mushaklar va asab tizimi uchun",
      "Rux — immunitet tizimini kuchaytiradi",
      "C vitamini — energiya va himoya manbayi",
      "Sorilishi darajasi 98% gacha",
    ],
    volume: "100 ml",
  }
];
