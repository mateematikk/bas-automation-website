import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "md" | "lg";

type CommonProps = {
  children: React.ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
};

type ButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps & {
  href: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-white shadow-sm shadow-accent/25 hover:bg-accent-hover hover:shadow-md hover:shadow-accent/20",
  secondary:
    "bg-white text-navy border border-border hover:border-accent/40 hover:bg-accent-soft/50",
  ghost: "bg-transparent text-navy hover:bg-white/70",
};

const sizes: Record<ButtonSize, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base sm:h-14 sm:px-7",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60 active:scale-[0.98]";

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const {
    children,
    className,
    variant = "primary",
    size = "md",
  } = props;

  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes} onClick={props.onClick}>
        {children}
      </Link>
    );
  }

  const { href: _href, ...buttonProps } = props as ButtonAsButton;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
