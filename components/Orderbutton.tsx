"use client";
import { useState } from "react";
import OrderModal from "@/components/OrderModal";

interface OrderButtonProps {
    productName: string;
}

export default function OrderButton({ productName }: OrderButtonProps) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-gold font-body font-semibold text-primary-foreground hover:opacity-90 transition-opacity shadow-gold text-base cursor-pointer"
            >
                Buyurtma berish
            </button>
            <OrderModal
                isOpen={open}
                onClose={() => setOpen(false)}
                productName={productName}
            />
        </>
    );
}