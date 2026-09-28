import AdaptiveCheckoutWizardPreview from "../components/previews/AdaptiveCheckoutWizardPreview";
import type { UIComponent } from "../types/component";

export const checkouts: UIComponent[] = [
  {
    id: "adaptive-checkout-wizard",
    name: "Adaptive Checkout Wizard",
    description:
      "Responsive multi-step checkout with validation, promo codes, shipping selection, formatted payment inputs, live totals, progress tracking and simulated order completion.",
    category: "Checkouts",

    preview: (
      <AdaptiveCheckoutWizardPreview />
    ),

    typescript: `import {
  ArrowLeft,
  ArrowRight,
  Check,
  CreditCard,
  Lock,
  Minus,
  Package,
  Plus,
  ShoppingBag,
  Truck,
} from "lucide-react";
import {
  type FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";

type Step =
  | "cart"
  | "delivery"
  | "payment"
  | "review";

type ShippingMethod =
  | "standard"
  | "express";

const PRODUCT_PRICE = 39;

function onlyDigits(
  value: string,
) {
  return value.replace(
    /\\D/g,
    "",
  );
}

function formatCardNumber(
  value: string,
) {
  return onlyDigits(value)
    .slice(0, 16)
    .replace(
      /(\\d{4})(?=\\d)/g,
      "$1 ",
    );
}

function formatExpiry(
  value: string,
) {
  const digits =
    onlyDigits(value).slice(
      0,
      4,
    );

  if (
    digits.length <= 2
  ) {
    return digits;
  }

  return \`\${digits.slice(
    0,
    2,
  )}/\${digits.slice(2)}\`;
}

function Checkout() {
  const containerRef =
    useRef<HTMLDivElement>(null);

  const [step, setStep] =
    useState<Step>("cart");

  const [quantity, setQuantity] =
    useState(1);

  const [shipping, setShipping] =
    useState<ShippingMethod>(
      "standard",
    );

  const [promo, setPromo] =
    useState(false);

  const [card, setCard] =
    useState("");

  const [expiry, setExpiry] =
    useState("");

  const [cvc, setCvc] =
    useState("");

  const [processing, setProcessing] =
    useState(false);

  const [completed, setCompleted] =
    useState(false);

  const subtotal =
    PRODUCT_PRICE *
    quantity;

  const shippingPrice =
    shipping === "express"
      ? 7.95
      : 0;

  const discount =
    promo
      ? subtotal * 0.15
      : 0;

  const total =
    subtotal +
    shippingPrice -
    discount;

  const next = () => {
    if (step === "cart") {
      setStep("delivery");
      return;
    }

    if (step === "delivery") {
      setStep("payment");
      return;
    }

    if (step === "payment") {
      setStep("review");
    }
  };

  const submit = (
    event: FormEvent,
  ) => {
    event.preventDefault();

    setProcessing(true);

    window.setTimeout(() => {
      setProcessing(false);
      setCompleted(true);
    }, 1800);
  };

  return (
    <div
      ref={containerRef}
      className="rounded-[30px] border border-blue-100 bg-white"
    >
      <header>
        <ShoppingBag />

        <div className="h-1 bg-blue-100">
          <div className="h-full bg-blue-300" />
        </div>
      </header>

      {step === "cart" && (
        <section>
          <button
            onClick={() =>
              setQuantity(
                Math.max(
                  1,
                  quantity - 1,
                ),
              )
            }
          >
            <Minus />
          </button>

          {quantity}

          <button
            onClick={() =>
              setQuantity(
                quantity + 1,
              )
            }
          >
            <Plus />
          </button>
        </section>
      )}

      {step === "payment" && (
        <section>
          <CreditCard />

          <input
            value={card}
            onChange={(event) =>
              setCard(
                formatCardNumber(
                  event.target
                    .value,
                ),
              )
            }
          />

          <input
            value={expiry}
            onChange={(event) =>
              setExpiry(
                formatExpiry(
                  event.target
                    .value,
                ),
              )
            }
          />

          <input
            value={cvc}
            onChange={(event) =>
              setCvc(
                onlyDigits(
                  event.target
                    .value,
                ).slice(0, 3),
              )
            }
          />
        </section>
      )}

      {step === "review" && (
        <form onSubmit={submit}>
          <Lock />

          <button
            disabled={processing}
          >
            Place order
          </button>
        </form>
      )}

      {step !== "review" && (
        <button
          onClick={next}
        >
          Continue
          <ArrowRight />
        </button>
      )}

      {completed && (
        <div>
          <Check />
          Order complete
        </div>
      )}

      <strong>
        €{total.toFixed(2)}
      </strong>
    </div>
  );
}

export default Checkout;`,

    tailwind: `Container:
rounded-[30px]
border
border-blue-100
bg-white
shadow-[0_24px_70px_rgba(59,130,246,0.10)]

Header:
bg-gradient-to-r
from-blue-50
via-white
to-blue-50/70

Progress:
bg-blue-100

Progress fill:
bg-blue-300

Active step:
bg-blue-50

Active icon:
bg-blue-300
text-zinc-950

Inputs:
rounded-xl
border-zinc-200
focus:border-blue-300
focus:ring-4
focus:ring-blue-100

Primary:
bg-blue-300
text-zinc-950
hover:bg-blue-400

Summary:
bg-blue-50/40
border-blue-100

Success:
bg-emerald-50
border-emerald-100
text-emerald-700`,

    javascript: `const PRODUCT_PRICE = 39;
const EXPRESS_PRICE = 7.95;
const PROMO_DISCOUNT = 0.15;

const CHECKOUT_STEPS = [
  "cart",
  "delivery",
  "payment",
  "review",
];

function clamp(
  value,
  min,
  max,
) {
  return Math.min(
    max,
    Math.max(
      min,
      value,
    ),
  );
}

function onlyDigits(
  value,
) {
  return String(value).replace(
    /\\D/g,
    "",
  );
}

function formatCardNumber(
  value,
) {
  return onlyDigits(value)
    .slice(0, 16)
    .replace(
      /(\\d{4})(?=\\d)/g,
      "$1 ",
    );
}

function formatExpiry(
  value,
) {
  const digits =
    onlyDigits(value).slice(
      0,
      4,
    );

  if (
    digits.length <= 2
  ) {
    return digits;
  }

  return (
    digits.slice(0, 2) +
    "/" +
    digits.slice(2)
  );
}

function validateEmail(
  email,
) {
  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(
    email,
  );
}

function validateDelivery(
  values,
) {
  const errors = {};

  if (
    !values.name ||
    values.name.trim().length <
      2
  ) {
    errors.name =
      "Enter your full name.";
  }

  if (
    !validateEmail(
      values.email || "",
    )
  ) {
    errors.email =
      "Enter a valid email.";
  }

  if (
    !values.address ||
    values.address.trim().length <
      4
  ) {
    errors.address =
      "Enter your address.";
  }

  if (
    !values.city ||
    values.city.trim().length <
      2
  ) {
    errors.city =
      "Enter your city.";
  }

  if (
    !values.postalCode ||
    values.postalCode.trim()
      .length < 4
  ) {
    errors.postalCode =
      "Enter a postal code.";
  }

  return {
    valid:
      Object.keys(errors)
        .length === 0,
    errors,
  };
}

function validatePayment(
  values,
) {
  const errors = {};

  if (
    onlyDigits(
      values.cardNumber,
    ).length !== 16
  ) {
    errors.cardNumber =
      "Card number must contain 16 digits.";
  }

  if (
    !/^\\d{2}\\/\\d{2}$/.test(
      values.expiry,
    )
  ) {
    errors.expiry =
      "Use MM/YY.";
  }

  if (
    onlyDigits(
      values.cvc,
    ).length !== 3
  ) {
    errors.cvc =
      "CVC must contain 3 digits.";
  }

  return {
    valid:
      Object.keys(errors)
        .length === 0,
    errors,
  };
}

function calculateCheckout({
  quantity,
  shippingMethod,
  promoApplied,
}) {
  const safeQuantity =
    clamp(
      quantity,
      1,
      9,
    );

  const subtotal =
    PRODUCT_PRICE *
    safeQuantity;

  const shipping =
    shippingMethod ===
    "express"
      ? EXPRESS_PRICE
      : 0;

  const discount =
    promoApplied
      ? subtotal *
        PROMO_DISCOUNT
      : 0;

  const total =
    subtotal +
    shipping -
    discount;

  return {
    subtotal,
    shipping,
    discount,
    total,
  };
}

function applyPromoCode(
  code,
) {
  const normalized =
    String(code)
      .trim()
      .toUpperCase();

  if (
    normalized === "BLUE15"
  ) {
    return {
      valid: true,
      discount:
        PROMO_DISCOUNT,
      message:
        "15% discount applied",
    };
  }

  return {
    valid: false,
    discount: 0,
    message:
      "Invalid promo code",
  };
}

function createCheckoutController() {
  let stepIndex = 0;

  let quantity = 1;

  let shippingMethod =
    "standard";

  let promoApplied =
    false;

  let processing = false;

  let completed = false;

  function getStep() {
    return CHECKOUT_STEPS[
      stepIndex
    ];
  }

  function getProgress() {
    return (
      ((stepIndex + 1) /
        CHECKOUT_STEPS.length) *
      100
    );
  }

  function next() {
    stepIndex =
      clamp(
        stepIndex + 1,
        0,
        CHECKOUT_STEPS.length -
          1,
      );

    return getStep();
  }

  function previous() {
    stepIndex =
      clamp(
        stepIndex - 1,
        0,
        CHECKOUT_STEPS.length -
          1,
      );

    return getStep();
  }

  function goToStep(
    step,
  ) {
    const index =
      CHECKOUT_STEPS.indexOf(
        step,
      );

    if (
      index === -1 ||
      index > stepIndex
    ) {
      return false;
    }

    stepIndex = index;

    return true;
  }

  function increaseQuantity() {
    quantity =
      clamp(
        quantity + 1,
        1,
        9,
      );

    return quantity;
  }

  function decreaseQuantity() {
    quantity =
      clamp(
        quantity - 1,
        1,
        9,
      );

    return quantity;
  }

  function selectShipping(
    method,
  ) {
    if (
      method !== "standard" &&
      method !== "express"
    ) {
      return false;
    }

    shippingMethod =
      method;

    return true;
  }

  function setPromoApplied(
    value,
  ) {
    promoApplied =
      Boolean(value);
  }

  function getTotals() {
    return calculateCheckout({
      quantity,
      shippingMethod,
      promoApplied,
    });
  }

  function submitOrder(
    onComplete,
  ) {
    if (processing) {
      return null;
    }

    processing = true;

    const timer =
      window.setTimeout(
        () => {
          processing = false;
          completed = true;

          if (onComplete) {
            onComplete(
              getTotals(),
            );
          }
        },
        1800,
      );

    return timer;
  }

  function reset() {
    stepIndex = 0;
    quantity = 1;
    shippingMethod =
      "standard";
    promoApplied = false;
    processing = false;
    completed = false;
  }

  return {
    getStep,
    getProgress,
    next,
    previous,
    goToStep,
    increaseQuantity,
    decreaseQuantity,
    selectShipping,
    setPromoApplied,
    getTotals,
    submitOrder,
    reset,

    isProcessing() {
      return processing;
    },

    isCompleted() {
      return completed;
    },
  };
}

function createResponsiveObserver(
  element,
  breakpoint,
  onChange,
) {
  const observer =
    new ResizeObserver(
      ([entry]) => {
        onChange(
          entry.contentRect.width <
            breakpoint,
        );
      },
    );

  observer.observe(element);

  return () => {
    observer.disconnect();
  };
}

function createNotificationController(
  callback,
  duration = 1800,
) {
  let timer = null;

  return function notify(
    message,
  ) {
    if (timer) {
      window.clearTimeout(
        timer,
      );
    }

    callback(message);

    timer =
      window.setTimeout(
        () => {
          callback(null);
        },
        duration,
      );
  };
}`,
  },
];