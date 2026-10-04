import { useState } from "react"

import {
  bookingSteps,
  highlightCategories,
  highlightImages,
  highlightVideos,
  navigationLinks,
  photos,
  portfolioItems,
} from "../data/site"

import { Icon, SectionHeading } from "./ui"

export function Announcement() {
  return (
    <div className="announcement">
      <span>Student-owned · Est. 2023</span>
      <p>Makeup and dreadlock bookings in Gauteng and the Eastern Cape</p>
      <span className="announcement-dot">Appointments open</span>
    </div>
  )
}

export function SiteHeader({
  orderCount,
  onOpenOrder,
}: {
  orderCount: number
  onOpenOrder: () => void
}) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="nav">
      <a className="logo" href="#top" aria-label="Elegance by Yola home">
        Elegance <span>by Yola</span>
      </a>
      <nav
        className={menuOpen ? "nav-links nav-links--open" : "nav-links"}
        aria-label="Main navigation"
      >
        {navigationLinks.map(([label, href]) => (
          <a key={label} href={href} onClick={() => setMenuOpen(false)}>
            {label}
          </a>
        ))}
      </nav>
      <div className="nav-actions">
        <button
          className="icon-button menu-button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <Icon name={menuOpen ? "close" : "menu"} />
        </button>
        <button className="bag-button" onClick={onOpenOrder}>
          <Icon name="bag" size={18} />
          <span>Order</span>
          <b>{orderCount}</b>
        </button>
      </div>
    </header>
  )
}

export function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <div className="eyebrow-row">
          <span className="eyebrow">Where Elegance Meets You</span>
          <span className="fine-line" />
        </div>
        <h1>
          Makeup &amp; locs,
          <br />
          <em>made personal.</em>
        </h1>
        <p>
          Affordable makeup and dreadlock artistry, shaped around your style,
          your roots and the moments that matter.
        </p>
        <div className="hero-actions">
          <a href="#book" className="button button--primary">
            Book appointment <Icon name="arrow" />
          </a>
          <a href="#work" className="button button--outline">
            See my work
          </a>
        </div>
      </div>
      <div className="hero-visual">
        <div className="hero-arch">
          <img
            src={photos.hero}
            alt="Woman with beautifully styled locs and polished makeup"
          />
        </div>
        <div className="hero-stamp">
          <span>Y</span>
          <small>Elevated beauty</small>
        </div>
        <div className="hero-note">
          <span>01</span>
          <p>
            Your signature look,
            <br />
            refined by Yola.
          </p>
        </div>
      </div>
    </section>
  )
}

export function SpecialtiesMarquee() {
  return (
    <section className="marquee" aria-label="Our specialties">
      <div>
        <span>Dreadlock artistry</span>
        <i>✦</i>
        <span>Makeup artistry</span>
        <i>✦</i>
        <span>Occasion looks</span>
        <i>✦</i>
        <span>House calls</span>
      </div>
    </section>
  )
}

export function PortfolioSection() {
  return (
    <section className="work section" id="work">
      <div className="work-heading">
        <SectionHeading eyebrow="The portfolio">
          My work, <em>your moment</em>
        </SectionHeading>
        <p>Every look is created to feel distinctly, confidently you.</p>
      </div>
      <div className="masonry">
        {portfolioItems.map(([image, alt, title, category]) => (
          <figure className="work-item" key={image}>
            <img src={image} alt={alt} />
            <figcaption>
              <span>{category}</span>
              <h3>{title}</h3>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}

export function HighlightsSection({
  activeHighlight,
  onSelect,
}: {
  activeHighlight: number
  onSelect: (index: number) => void
}) {
  const [playingVideo, setPlayingVideo] = useState<number | null>(null)

  return (
    <section className="highlights section" id="videos">
      <SectionHeading
        eyebrow="Style highlights"
        intro="Fresh transformations, signature finishes and a little behind the scenes."
      >
        See beauty <em>in motion</em>
      </SectionHeading>
      <div
        className="highlight-tabs"
        role="tablist"
        aria-label="Video categories"
      >
        {highlightCategories.map((category, index) => (
          <button
            role="tab"
            aria-selected={activeHighlight === index}
            className={
              activeHighlight === index
                ? "highlight-tab active"
                : "highlight-tab"
            }
            onClick={() => onSelect(index)}
            key={category}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="story-row">
        {highlightImages.map((image, index) => (
          <button
            className={activeHighlight === index ? "story active" : "story"}
            key={image}
            onClick={() => {
              onSelect(index)
              setPlayingVideo(index)
            }}
            aria-label={`Play ${highlightCategories[index]} video`}
          >
            <img src={image} alt="" />
            <span className="story-gradient" />
            <span className="story-count">0{index + 1}</span>
            <span className="play">
              <Icon name="play" size={22} />
            </span>
            <span className="story-label">{highlightCategories[index]}</span>
          </button>
        ))}
      </div>
      {playingVideo !== null && (
        <div
          className="video-backdrop"
          onClick={() => setPlayingVideo(null)}
          onKeyDown={(event) => {
            if (event.key === "Escape") setPlayingVideo(null)
          }}
        >
          <section
            className="video-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="active-video-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="video-dialog-header">
              <h3 id="active-video-title">{highlightCategories[playingVideo]}</h3>
              <button
                className="icon-button"
                aria-label="Close video"
                autoFocus
                onClick={() => setPlayingVideo(null)}
              >
                <Icon name="close" />
              </button>
            </div>
            <video
              key={highlightVideos[playingVideo]}
              controls
              autoPlay
              playsInline
              poster={highlightImages[playingVideo]}
            >
              <source src={highlightVideos[playingVideo]} type="video/mp4" />
              Your browser does not support video playback.
            </video>
          </section>
        </div>
      )}
    </section>
  )
}

export function BookingSteps() {
  return (
    <section className="booking-steps">
      <div className="steps-intro">
        <span className="eyebrow light">Booking made easy</span>
        <h2>
          From idea to <em>appointment</em>
        </h2>
      </div>
      <div className="steps">
        {bookingSteps.map(([number, title, text]) => (
          <article key={number}>
            <span>{number}</span>
            <div>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export function SiteFooter({
  onWhatsApp,
}: {
  onWhatsApp: (message: string) => void
}) {
  return (
    <footer>
      <div className="footer-main">
        <div>
          <a className="logo footer-logo" href="#top">
            Elegance <span>by Yola</span>
          </a>
          <p>
            Affordable makeup and dreadlock services, created with care and
            tailored to every client.
          </p>
        </div>
        <div className="footer-links">
          <span>Explore</span>
          <a href="#services">Services</a>
          <a href="#work">My Work</a>
          <a href="#videos">Videos</a>
          <a href="#book">Book now</a>
        </div>
        <div className="footer-socials">
          <span>Stay close</span>
          <a
            href="https://www.instagram.com/elegancebyyola/"
            target="_blank"
            rel="noreferrer"
          >
            <Icon name="instagram" /> Instagram
          </a>
          <button
            onClick={() =>
              onWhatsApp(
                "Hello Elegance by Yola! I'd like to enquire about an appointment.",
              )
            }
          >
            <Icon name="whatsapp" /> WhatsApp
          </button>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2025 Elegance by Yola</span>
        <span>Beauty with intention.</span>
      </div>
    </footer>
  )
}
