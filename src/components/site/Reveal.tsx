import type { CSSProperties, ElementType, ReactNode } from "react";
import { useReveal } from "@/hooks/use-reveal";

type RevealVariant = "up" | "down" | "left" | "right" | "fade" | "scale";

type RevealProps = {
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

/** Wrapper de scroll-reveal. A animação vive em styles.css (`.reveal`). */
export function Reveal({
  variant = "up",
  delay = 0,
  duration = 700,
  as: Tag = "div",
  className,
  style,
  children,
}: RevealProps) {
  const { ref, revealed } = useReveal<HTMLElement>({ delay });

  return (
    <Tag
      ref={ref}
      data-reveal={revealed ? "in" : "out"}
      data-reveal-variant={variant}
      className={className ? `reveal ${className}` : "reveal"}
      style={{ ...style, "--reveal-duration": `${duration}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
