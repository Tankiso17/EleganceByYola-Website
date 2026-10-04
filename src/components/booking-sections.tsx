import { useState } from "react"
import type { FormEvent } from "react"

import { photos, type PricingTier, type Service } from "../data/site"

import { Button, Icon, SectionHeading } from "./ui"

type ServiceFilter = "All" | Service["category"]

export function ServicesSection({
  filter,
  onFilterChange,
  pricingTier,
  onPricingTierChange,
  services,
  onAdd,
}: {
  filter: ServiceFilter

  onFilterChange: (filter: ServiceFilter) => void

  pricingTier: PricingTier

  onPricingTierChange: (tier: PricingTier) => void

  services: Service[]

  onAdd: (service: Service) => void
}) {
  return (
    <section className="services section" id="services">
      <SectionHeading
        eyebrow="Our services"
        intro="Affordable makeup and dreadlock services, personalised for your style and occasion."
      >
        Choose your <em>signature look</em>
      </SectionHeading>
      <div className="pricing-controls">
        <div
          className="pricing-toggle"
          role="group"
          aria-label="Makeup pricing tier"
        >
          <span>Makeup rates</span>
          {(["standard", "student"] as const).map((tier) => (
            <button
              key={tier}
              className={
                pricingTier === tier
                  ? "pricing-option active"
                  : "pricing-option"
              }
              aria-pressed={pricingTier === tier}
              onClick={() => onPricingTierChange(tier)}
            >
              {tier === "standard" ? "Standard" : "Student"}
            </button>
          ))}
        </div>
        <a
          className="price-list-link"
          href={photos.priceList}
          target="_blank"
          rel="noreferrer"
        >
          View full price list
        </a>
      </div>
      <p className="pricing-note">
        Student makeup rates are confirmed at your appointment with a current
        student card. Please do not send card photos. Dreadlock rates are the
        same for both groups.
      </p>
      <div className="filters" role="group" aria-label="Filter services">
        {(["All", "Dreadlocks", "Makeup"] as const).map((item) => (
          <button
            key={item}
            className={filter === item ? "filter active" : "filter"}
            onClick={() => onFilterChange(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="service-grid">
        {services.map((service) => (
          <article className="service-card" key={service.id}>
            <div className="service-image">
              <img src={service.image} alt={`${service.name} beauty service`} />
              <span>{service.category}</span>
            </div>
            <div className="service-content">
              <div className="service-title">
                <h3>{service.name}</h3>
                <p>
                  {service.price !== undefined ? (
                    <strong>
                      R
                      {pricingTier === "student"
                        ? (service.studentPrice ?? service.price)
                        : service.price}
                    </strong>
                  ) : (
                    <strong>Enquire for pricing</strong>
                  )}
                </p>
              </div>
              <p>{service.description}</p>
              <Button variant="small" onClick={() => onAdd(service)}>
                Add to order <span>+</span>
              </Button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export function BookingSection({
  order,
  services,
  pricingTier,
  onToggleService,
  onSubmit,
}: {
  order: Service[]

  services: Service[]

  pricingTier: PricingTier

  onToggleService: (service: Service, selected: boolean) => void

  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}) {
  const [serviceError, setServiceError] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (order.length === 0) {
      event.preventDefault()
      setServiceError(true)
      return
    }

    setServiceError(false)
    onSubmit(event)
  }

  return (
    <section className="booking section" id="book">
      <div className="booking-copy">
        <span className="eyebrow">Reserve your moment</span>
        <h2>
          Ready to feel
          <br />
          <em>absolutely beautiful?</em>
        </h2>
        <p>
          Tell us what you're dreaming of. We'll continue the conversation and
          confirm availability on WhatsApp.
        </p>
        <div className="booking-detail">
          <Icon name="check" />
          <span>
            <strong>Personal service</strong> tailored to your preferences
          </span>
        </div>
        <div className="booking-detail">
          <Icon name="check" />
          <span>
            <strong>House calls</strong> in Gauteng and the Eastern Cape
          </span>
        </div>
      </div>
      <form className="booking-form" onSubmit={handleSubmit}>
        <div className="field-row">
          <label>
            Your name
            <input name="name" placeholder="Full name" required />
          </label>
          <label>
            Preferred date
            <input name="date" type="date" required />
          </label>
        </div>
        <label>
          Your area
          <input
            name="location"
            placeholder="City or area in Gauteng or Eastern Cape"
            required
          />
        </label>
        <fieldset className="service-picker">
          <legend>Services</legend>
          <div className="service-options">
            {services.map((service) => {
              const price =
                pricingTier === "student"
                  ? (service.studentPrice ?? service.price)
                  : service.price

              return (
                <label className="service-choice" key={service.id}>
                  <input
                    type="checkbox"
                    name="serviceIds"
                    value={service.id}
                    checked={order.some((item) => item.id === service.id)}
                    onChange={(event) => {
                      onToggleService(service, event.currentTarget.checked)
                      setServiceError(false)
                    }}
                  />
                  <span>{service.name}</span>
                  <small>{price !== undefined ? `R${price}` : "Enquire"}</small>
                </label>
              )
            })}
          </div>
          {serviceError && (
            <p className="service-error" role="alert">
              Select at least one service to send your request.
            </p>
          )}
        </fieldset>
        <label>
          Anything we should know?
          <textarea
            name="notes"
            placeholder="Tell us about your hair, occasion or ideal look..."
            rows={4}
          />
        </label>
        {order.length > 0 && (
          <div className="selected-services">
            <span>Selected:</span> {order.map((item) => item.name).join(" · ")}
          </div>
        )}
        <Button type="submit" className="submit-button">
          Send request on WhatsApp <Icon name="whatsapp" />
        </Button>
        <small>
          Student makeup rates require a current student card at your
          appointment. Payment is made in person on the appointment day.
        </small>
      </form>
    </section>
  )
}
