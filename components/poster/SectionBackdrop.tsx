import Image from "next/image";

type SectionBackdropProps = {
  src: string;
  alt?: string;
  /** 0–100, how strong the photo shows through */
  opacity?: number;
  /** Tailwind gradient overlay classes */
  overlay?: string;
  position?: string;
};

export function SectionBackdrop({
  src,
  alt = "",
  opacity = 18,
  overlay = "from-[#fff8f0]/92 via-[#fff8f0]/88 to-[#fff8f0]/95",
  position = "object-center",
}: SectionBackdropProps) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover ${position} scale-105`}
        sizes="100vw"
        style={{ opacity: opacity / 100 }}
      />
      <div className={`absolute inset-0 bg-gradient-to-b ${overlay}`} />
    </div>
  );
}

type DarkSectionBackdropProps = {
  src: string;
  alt?: string;
  opacity?: number;
};

export function DarkSectionBackdrop({
  src,
  alt = "",
  opacity = 22,
}: DarkSectionBackdropProps) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover object-center scale-105"
        sizes="100vw"
        style={{ opacity: opacity / 100 }}
      />
      <div className="absolute inset-0 bg-[#0c1a2e]/88" />
    </div>
  );
}

type CoralSectionBackdropProps = {
  src: string;
  alt?: string;
};

export function CoralSectionBackdrop({ src, alt = "" }: CoralSectionBackdropProps) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover object-center scale-110"
        sizes="100vw"
        style={{ opacity: 0.2 }}
      />
      <div className="absolute inset-0 bg-[#ff5c4d]/85" />
    </div>
  );
}
