import { useMemo, useState } from "react"
import type { FormEvent } from "react"
import { OrderDrawer } from "./components/OrderDrawer"
import { BookingSection, ServicesSection } from "./components/booking-sections"
import {
  Announcement,
  BookingSteps,
  HeroSection,
  HighlightsSection,
  PortfolioSection,
  SiteFooter,
  SiteHeader,
  SpecialtiesMarquee,
} from "./components/marketing-sections"
import { services, type PricingTier, type Service } from "./data/site"

const whatsappNumber = "27661954176"

export default function App() {
  const [filter, setFilter] = useState<"All" | "Dreadlocks" | "Makeup">("All")
  const [pricingTier, setPricingTier] = useState<PricingTier>("standard")
  const [activeHighlight, setActiveHighlight] = useState(0)
  const [order, setOrder] = useState<Service[]>([])
  const [orderOpen, setOrderOpen] = useState(false)
  const filteredServices = useMemo(
    () =>
      services.filter(
        (service) => filter === "All" || service.category === filter,
      ),
    [filter],
  )

  const addToOrder = (service: Service) => {
    setOrder((current) =>
      current.some((item) => item.id === service.id)
        ? current
        : [...current, service],
    )
    setOrderOpen(true)
  }

  const removeFromOrder = (id: number) => {
    setOrder((current) => current.filter((item) => item.id !== id))
  }

  const toggleOrderService = (service: Service, selected: boolean) => {
    setOrder((current) => {
      if (selected) {
        return current.some((item) => item.id === service.id)
          ? current
          : [...current, service]
      }

      return current.filter((item) => item.id !== service.id)
    })
  }

  const openWhatsApp = (message: string) => {
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    )
  }

  const submitBooking = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const selected = order.map((item) => item.name).join(", ")
    const selectedServices = order
    const makeupRate = selectedServices.some(
      (service) => service.category === "Makeup",
    )
      ? `\nMakeup rate: ${
          pricingTier === "student"
            ? "Student (verify current student card at appointment)"
            : "Standard"
        }`
      : ""
    openWhatsApp(
      `Hello Elegance by Yola! I'd love to request an appointment.\n\nName: ${data.get("name")}\nService: ${selected}${makeupRate}\nPreferred date: ${data.get("date")}\nLocation: ${data.get("location")}\nNotes: ${data.get("notes") || "None"}`,
    )
  }

  return (
    <div className="site-shell">
      <Announcement />
      <SiteHeader
        orderCount={order.length}
        onOpenOrder={() => setOrderOpen(true)}
      />

      <main id="top">
        <HeroSection />
        <SpecialtiesMarquee />

        <ServicesSection
          filter={filter}
          onFilterChange={setFilter}
          pricingTier={pricingTier}
          onPricingTierChange={setPricingTier}
          services={filteredServices}
          onAdd={addToOrder}
        />

        <PortfolioSection />

        <HighlightsSection
          activeHighlight={activeHighlight}
          onSelect={setActiveHighlight}
        />
        <BookingSteps />

        <BookingSection
          order={order}
          services={services}
          pricingTier={pricingTier}
          onToggleService={toggleOrderService}
          onSubmit={submitBooking}
        />
      </main>

      <SiteFooter onWhatsApp={openWhatsApp} />

      <OrderDrawer
        open={orderOpen}
        order={order}
        pricingTier={pricingTier}
        onClose={() => setOrderOpen(false)}
        onRemove={removeFromOrder}
      />
    </div>
  )
}
