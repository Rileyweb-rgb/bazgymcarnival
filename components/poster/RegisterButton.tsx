"use client";

import { ticketCtaLabel } from "@/lib/payment-config";

type RegisterButtonProps = {
  onClick: () => void;
  variant?: "primary" | "secondary" | "coral" | "nav";
  className?: string;
  children?: React.ReactNode;
};

export function RegisterButton({
  onClick,
  variant = "primary",
  className = "",
  children = ticketCtaLabel(),
}: RegisterButtonProps) {
  const styles: Record<NonNullable<RegisterButtonProps["variant"]>, string> = {
    primary:
      "bg-[#ffc93c] text-[#0c1a2e] hover:scale-105 shadow-lg shadow-[#ffc93c]/25",
    secondary:
      "bg-white text-[#0c1a2e] hover:scale-105",
    coral:
      "bg-white text-[#ff5c4d] hover:scale-105 shadow-lg",
    nav: "bg-[#ff5c4d] text-white hover:bg-[#ff5c4d]/90",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-8 py-4 font-display text-base font-bold transition ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
