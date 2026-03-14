import osteobalanceImg from "@/assets/osteobalance-product.png";
import babyVitaImg from "@/assets/baby-vita-product.png";
import melatoninImg from "@/assets/melatonin-product.png";
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
    price: 500000,
    priceFormatted: "500 000 so'm",
    image: osteobalanceImg,
    shortDesc: "Kaltsiy, Magniy, D3, Sink va C vitamini suspenziyasi — suyaklar mustahkamligi va immunitet uchun.",
    description:
      "OsteoBalance — organizmga zarur bo'lgan kaltsiy, magniy, D3 vitamini, sink va C vitaminini o'z ichiga olgan premium sifatli suspenziya. Suyaklar mustahkamligi, immunitet tizimini qo'llab-quvvatlash va umumiy sog'lom rivojlanish uchun maxsus ishlab chiqilgan.",
    benefits: [
      "Kaltsiy va D3 — suyaklar va tishlar mustahkamligi uchun",
      "Magniy — mushaklar va asab tizimi uchun",
      "Sink — immunitet tizimini kuchaytiradi",
      "C vitamini — energiya va himoya manbayi",
      "Yuqori so'rilish darajasi",
    ],
    volume: "100 ml",
  },
  {
    id: "baby-vita",
    name: "Baby Vita",
    price: 600000,
    priceFormatted: "600 000 so'm",
    image: babyVitaImg,
    shortDesc: "Bolalar uchun multivitamin suspenziyasi — sog'lom o'sish va rivojlanish uchun.",
    description:
      "Baby Vita — bolalar uchun maxsus ishlab chiqilgan multivitamin suspenziyasi. Bolaning sog'lom o'sishi, aqliy rivojlanishi va kuchli immunitet tizimi shakllanishi uchun zarur vitaminlar va minerallar kompleksi.",
    benefits: [
      "Bolalar uchun maxsus dozalangan formula",
      "Sog'lom o'sish va rivojlanishni qo'llab-quvvatlaydi",
      "Immunitet tizimini mustahkamlaydi",
      "Yoqimli ta'm — bolalar osonlik bilan qabul qiladi",
      "Tabiiy ingredientlar asosida",
    ],
    volume: "100 ml",
  },
  {
    id: "melatonin",
    name: "Melatonin",
    price: 800000,
    priceFormatted: "800 000 so'm",
    image: melatoninImg,
    shortDesc: "Sifatli uyqu va dam olish uchun tabiiy melatonin preparati.",
    description:
      "Melatonin — sifatli uyqu va to'liq dam olish uchun mo'ljallangan tabiiy preparat. Uyqu siklini tartibga solish, stress darajasini kamaytirish va organizmning tiklanish jarayonlarini yaxshilash uchun samarali vosita.",
    benefits: [
      "Uyqu sifatini yaxshilaydi",
      "Uyqu siklini tartibga soladi",
      "Stress va charchoqni kamaytiradi",
      "Organizmning tabiiy tiklanishini qo'llab-quvvatlaydi",
      "Tabiiy va xavfsiz formula",
    ],
    volume: "100 ml",
  },
];
