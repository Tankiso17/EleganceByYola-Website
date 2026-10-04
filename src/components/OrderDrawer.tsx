import type { PricingTier, Service } from "../data/site"

import { Button, Icon } from "./ui"

export function OrderDrawer({
  open,
  order,
  pricingTier,
  onClose,
  onRemove,
}: {
  open: boolean

  order: Service[]

  pricingTier: PricingTier

  onClose: () => void

  onRemove: (id: number) => void
}) {
  return (
    <>
      {open && (
        <button
          className="drawer-backdrop"
          aria-label="Close order"
          onClick={onClose}
        />
      )}
      <aside
        className={open ? "order-drawer open" : "order-drawer"}
        aria-hidden={!open}
      >
        <div className="drawer-header">
          <div>
            <span className="eyebrow">Your selection</span>
            <h2>Appointment order</h2>
          </div>
          <button
            className="icon-button"
            onClick={onClose}
            aria-label="Close order panel"
          >
            <Icon name="close" />
          </button>
        </div>
        <div className="drawer-items">
          {order.length === 0 ? (
            <div className="empty-order">
              <span>
                <Icon name="bag" size={26} />
              </span>
              <h3>Your order is waiting</h3>
              <p>
                Add a service and we'll help you request the perfect
                appointment.
              </p>
              <Button variant="outline" onClick={onClose}>
                Browse services
              </Button>
            </div>
          ) : (
            order.map((item) => {
              const price =
                pricingTier === "student"
                  ? (item.studentPrice ?? item.price)
                  : item.price

              return (
                <article className="order-item" key={item.id}>
                  <img src={item.image} alt="" />
                  <div>
                    <span>{item.category}</span>
                    <h3>{item.name}</h3>
                    <p>
                      {price !== undefined
                        ? `R${price}`
                        : "Pricing confirmed on enquiry"}
                    </p>
                  </div>
                  <button
                    onClick={() => onRemove(item.id)}
                    aria-label={`Remove ${item.name}`}
                  >
                    <Icon name="close" size={17} />
                  </button>
                </article>
              )
            })
          )}
        </div>
        {order.length > 0 && (
          <div className="drawer-footer">
            {order.some((item) => item.category === "Makeup") && (
              <div>
                <span>Makeup rate</span>
                <strong>
                  {pricingTier === "student" ? "Student" : "Standard"}
                </strong>
              </div>
            )}
            <a
              href="#book"
              className="button button--primary"
              onClick={onClose}
            >
              Continue to booking <Icon name="arrow" />
            </a>
            <small>
              Dreadlock prices are unchanged. Payment is in person on the
              appointment day.
            </small>
          </div>
        )}
      </aside>
    </>
  )
}
