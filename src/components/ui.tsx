import type { ReactNode } from "react"

type IconName = "arrow" | "bag" | "close" | "menu" | "play" | "instagram" | "whatsapp" | "check"

export function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),

    bag: (
      <>
        <path d="M6 8h12l1 12H5L6 8Z" />
        <path d="M9 9V6a3 3 0 0 1 6 0v3" />
      </>
    ),

    close: (
      <>
        <path d="m6 6 12 12" />
        <path d="M18 6 6 18" />
      </>
    ),

    menu: (
      <>
        <path d="M4 8h16" />
        <path d="M4 16h16" />
      </>
    ),

    play: <path d="m9 7 8 5-8 5V7Z" />,

    instagram: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r=".5" fill="currentColor" />
      </>
    ),

    whatsapp: (
      <>
        <path d="M20 11.5a8 8 0 0 1-11.8 7l-4.2 1 1.1-4A8 8 0 1 1 20 11.5Z" />
        <path d="M9 8.5c.5 2.3 2.2 4 4.5 4.8l1.2-1 1.8 1.1c-.3 1.5-1.2 2.2-2.7 2-4-.6-6.8-3.3-7.3-7.2-.2-1.2.5-2.2 1.8-2.6L9 8.5Z" />
      </>
    ),

    check: <path d="m5 12 4 4L19 6" />,
  }

  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  )
}

export function Button({
  children,
  variant = "primary",
  className = "",
  onClick,
  type = "button",
}: {
  children: ReactNode

  variant?: "primary" | "outline" | "dark" | "small"

  className?: string

  onClick?: () => void

  type?: "button" | "submit"
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`button button--${variant} ${className}`}
    >
      {children}
    </button>
  )
}

export function SectionHeading({
  eyebrow,
  children,
  intro,
}: {
  eyebrow: string
  children: ReactNode
  intro?: string
}) {
  return (
    <div className="section-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{children}</h2>
      {intro && <p>{intro}</p>}
    </div>
  )
}
