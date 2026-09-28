import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronDown,
  CreditCard,
  Lock,
  Minus,
  Package,
  Plus,
  RotateCcw,
  ShoppingBag,
  Sparkles,
  Truck,
  X,
} from "lucide-react";
import { type FormEvent, useEffect, useMemo, useRef, useState } from "react";

type Step = "cart" | "delivery" | "payment" | "review";

type ShippingMethod = "standard" | "express";

type FormErrors = {
  name?: string;
  email?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  cardNumber?: string;
  expiry?: string;
  cvc?: string;
};

const steps: {
  id: Step;
  label: string;
  icon: typeof ShoppingBag;
}[] = [
  {
    id: "cart",
    label: "Cart",
    icon: ShoppingBag,
  },
  {
    id: "delivery",
    label: "Delivery",
    icon: Truck,
  },
  {
    id: "payment",
    label: "Payment",
    icon: CreditCard,
  },
  {
    id: "review",
    label: "Review",
    icon: CheckCircle2,
  },
];

const prices = {
  product: 39,
  standard: 0,
  express: 7.95,
};

function formatPrice(value: number) {
  return new Intl.NumberFormat("en-NL", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

function onlyDigits(value: string) {
  return value.replace(/\D/g, "");
}

function formatCardNumber(value: string) {
  return onlyDigits(value)
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, "$1 ");
}

function formatExpiry(value: string) {
  const digits = onlyDigits(value).slice(0, 4);

  if (digits.length <= 2) {
    return digits;
  }

  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

function validateEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function AdaptiveCheckoutWizardPreview() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [currentStep, setCurrentStep] = useState<Step>("cart");

  const [compact, setCompact] = useState(false);

  const [quantity, setQuantity] = useState(1);

  const [shippingMethod, setShippingMethod] =
    useState<ShippingMethod>("standard");

  const [promoOpen, setPromoOpen] = useState(false);

  const [promoCode, setPromoCode] = useState("");

  const [promoApplied, setPromoApplied] = useState(false);

  const [promoMessage, setPromoMessage] = useState("");

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [address, setAddress] = useState("");

  const [city, setCity] = useState("");

  const [postalCode, setPostalCode] = useState("");

  const [cardNumber, setCardNumber] = useState("");

  const [expiry, setExpiry] = useState("");

  const [cvc, setCvc] = useState("");

  const [saveCard, setSaveCard] = useState(true);

  const [errors, setErrors] = useState<FormErrors>({});

  const [processing, setProcessing] = useState(false);

  const [completed, setCompleted] = useState(false);

  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    const element = containerRef.current;

    if (!element) {
      return;
    }

    const observer = new ResizeObserver(([entry]) => {
      setCompact(entry.contentRect.width < 620);
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  const stepIndex = steps.findIndex((step) => step.id === currentStep);

  const subtotal = prices.product * quantity;

  const shipping =
    shippingMethod === "express" ? prices.express : prices.standard;

  const discount = promoApplied ? subtotal * 0.15 : 0;

  const total = subtotal + shipping - discount;

  const progress = ((stepIndex + 1) / steps.length) * 100;

  const showNotification = (message: string) => {
    setNotification(message);

    window.setTimeout(() => {
      setNotification(null);
    }, 1800);
  };

  const validateDelivery = () => {
    const nextErrors: FormErrors = {};

    if (name.trim().length < 2) {
      nextErrors.name = "Enter your full name.";
    }

    if (!validateEmail(email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (address.trim().length < 4) {
      nextErrors.address = "Enter your street address.";
    }

    if (city.trim().length < 2) {
      nextErrors.city = "Enter your city.";
    }

    if (postalCode.trim().length < 4) {
      nextErrors.postalCode = "Enter a valid postal code.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const validatePayment = () => {
    const nextErrors: FormErrors = {};

    if (onlyDigits(cardNumber).length !== 16) {
      nextErrors.cardNumber = "Enter a 16 digit card number.";
    }

    if (expiry.length !== 5) {
      nextErrors.expiry = "Use MM/YY.";
    }

    if (onlyDigits(cvc).length !== 3) {
      nextErrors.cvc = "Enter a 3 digit CVC.";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const goNext = () => {
    if (currentStep === "cart") {
      setCurrentStep("delivery");

      return;
    }

    if (currentStep === "delivery") {
      if (!validateDelivery()) {
        showNotification("Check your delivery details");

        return;
      }

      setCurrentStep("payment");

      return;
    }

    if (currentStep === "payment") {
      if (!validatePayment()) {
        showNotification("Check your payment details");

        return;
      }

      setCurrentStep("review");
    }
  };

  const goBack = () => {
    if (currentStep === "delivery") {
      setCurrentStep("cart");
    }

    if (currentStep === "payment") {
      setCurrentStep("delivery");
    }

    if (currentStep === "review") {
      setCurrentStep("payment");
    }
  };

  const applyPromo = () => {
    const normalized = promoCode.trim().toUpperCase();

    if (normalized === "BLUE15") {
      setPromoApplied(true);

      setPromoMessage("15% discount applied");

      showNotification("Promo code applied");

      return;
    }

    setPromoApplied(false);

    setPromoMessage("Try BLUE15");
  };

  const removePromo = () => {
    setPromoApplied(false);
    setPromoCode("");
    setPromoMessage("");
  };

  const completeOrder = (event: FormEvent) => {
    event.preventDefault();

    if (processing) {
      return;
    }

    setProcessing(true);

    window.setTimeout(() => {
      setProcessing(false);
      setCompleted(true);
    }, 1800);
  };

  const resetCheckout = () => {
    setCurrentStep("cart");
    setQuantity(1);
    setShippingMethod("standard");
    setPromoOpen(false);
    setPromoCode("");
    setPromoApplied(false);
    setPromoMessage("");
    setName("");
    setEmail("");
    setAddress("");
    setCity("");
    setPostalCode("");
    setCardNumber("");
    setExpiry("");
    setCvc("");
    setSaveCard(true);
    setErrors({});
    setProcessing(false);
    setCompleted(false);
  };

  const deliveryComplete =
    name && validateEmail(email) && address && city && postalCode;

  const paymentComplete =
    onlyDigits(cardNumber).length === 16 &&
    expiry.length === 5 &&
    onlyDigits(cvc).length === 3;

  if (completed) {
    return (
      <div
        ref={containerRef}
        className="flex min-h-[520px] w-full max-w-[780px] items-center justify-center overflow-hidden rounded-[30px] border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-blue-100/50 p-6 shadow-[0_24px_70px_rgba(59,130,246,0.10)]"
      >
        <div className="w-full max-w-sm text-center">
          <div className="relative mx-auto flex h-20 w-20 items-center justify-center">
            <div className="absolute inset-0 animate-ping rounded-full bg-blue-200 opacity-40" />

            <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-blue-300 text-zinc-950 shadow-[0_15px_35px_rgba(147,197,253,0.45)]">
              <Check size={27} strokeWidth={3} />
            </div>
          </div>

          <p className="mt-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-500">
            Order confirmed
          </p>

          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950">
            You're all set
          </h3>

          <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-zinc-500">
            Your order has been created successfully and is being prepared.
          </p>

          <div className="mt-6 rounded-2xl border border-blue-100 bg-white p-4 text-left shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-wide text-zinc-400">
                  Order number
                </p>

                <p className="mt-1 text-sm font-semibold text-zinc-900">
                  #UIX-2408
                </p>
              </div>

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Package size={17} />
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-4">
              <span className="text-xs text-zinc-500">Total</span>

              <span className="text-base font-bold text-blue-700">
                {formatPrice(total)}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={resetCheckout}
            className="mt-5 flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-blue-300 text-sm font-semibold text-zinc-950 transition hover:bg-blue-400"
          >
            <RotateCcw size={14} />
            Start again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[780px] overflow-hidden rounded-[30px] border border-blue-100 bg-white shadow-[0_24px_70px_rgba(59,130,246,0.10)]"
    >
      <div className="border-b border-blue-100 bg-gradient-to-r from-blue-50 via-white to-blue-50/70 px-5 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-300 text-zinc-950">
              <ShoppingBag size={16} />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-zinc-950">
                Secure checkout
              </h3>

              <p className="text-[9px] text-zinc-400">Fast and protected</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 rounded-full border border-blue-100 bg-white px-2.5 py-1.5 text-[9px] font-medium text-blue-600">
            <Lock size={10} />
            Secure
          </div>
        </div>

        <div className="mt-4">
          <div
            className={`grid gap-1 ${
              compact ? "grid-cols-4" : "grid-cols-4 gap-2"
            }`}
          >
            {steps.map((step, index) => {
              const Icon = step.icon;

              const active = step.id === currentStep;

              const complete = index < stepIndex;

              return (
                <button
                  key={step.id}
                  type="button"
                  disabled={index > stepIndex}
                  onClick={() => {
                    if (index <= stepIndex) {
                      setCurrentStep(step.id);
                    }
                  }}
                  className={`group flex items-center rounded-xl p-2 text-left transition ${
                    active
                      ? "bg-blue-50"
                      : complete
                        ? "hover:bg-blue-50/60"
                        : ""
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition ${
                      active
                        ? "bg-blue-300 text-zinc-950"
                        : complete
                          ? "bg-blue-100 text-blue-600"
                          : "bg-zinc-100 text-zinc-400"
                    }`}
                  >
                    {complete ? <Check size={12} /> : <Icon size={12} />}
                  </span>

                  {!compact && (
                    <span className="ml-2 min-w-0">
                      <span
                        className={`block text-[9px] font-semibold ${
                          active ? "text-blue-700" : "text-zinc-500"
                        }`}
                      >
                        {step.label}
                      </span>

                      <span className="mt-0.5 block text-[7px] text-zinc-400">
                        Step {index + 1}
                      </span>
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-3 h-1 overflow-hidden rounded-full bg-blue-100">
            <div
              className="h-full rounded-full bg-blue-300 transition-[width] duration-500 ease-out"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>
      </div>

      <div
        className={`grid ${
          compact ? "grid-cols-1" : "grid-cols-[minmax(0,1fr)_230px]"
        }`}
      >
        <div className="min-h-[410px] p-5">
          {currentStep === "cart" && (
            <div>
              <div className="mb-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-500">
                  Your cart
                </p>

                <h4 className="mt-1 text-lg font-semibold text-zinc-950">
                  Review your item
                </h4>
              </div>

              <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/70 to-white p-4">
                <div className="flex gap-4">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-blue-300 text-lg font-black text-zinc-950 shadow-sm">
                    UI
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h5 className="text-sm font-semibold text-zinc-900">
                          Motion UI Pack
                        </h5>

                        <p className="mt-1 text-[9px] leading-4 text-zinc-400">
                          Interactive React components with advanced motion.
                        </p>
                      </div>

                      <span className="text-sm font-bold text-blue-700">
                        {formatPrice(prices.product)}
                      </span>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center rounded-xl border border-zinc-200 bg-white p-1">
                        <button
                          type="button"
                          onClick={() =>
                            setQuantity((current) => Math.max(1, current - 1))
                          }
                          disabled={quantity === 1}
                          className="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-blue-50 hover:text-blue-600 disabled:opacity-30"
                        >
                          <Minus size={12} />
                        </button>

                        <span className="w-7 text-center text-[10px] font-semibold text-zinc-700">
                          {quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            setQuantity((current) => Math.min(9, current + 1))
                          }
                          className="flex h-7 w-7 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-blue-50 hover:text-blue-600"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <span className="text-[9px] text-zinc-400">
                        Digital delivery
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <button
                  type="button"
                  onClick={() => setPromoOpen((current) => !current)}
                  className="flex w-full items-center justify-between rounded-xl border border-zinc-200 px-3 py-2.5 text-left text-[10px] font-medium text-zinc-600 transition hover:border-blue-200 hover:bg-blue-50/50"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles size={12} className="text-blue-500" />
                    Promo code
                  </span>

                  <ChevronDown
                    size={13}
                    className={`transition-transform ${
                      promoOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {promoOpen && (
                  <div className="mt-2 rounded-xl border border-blue-100 bg-blue-50/40 p-3">
                    <div className="flex gap-2">
                      <input
                        value={promoCode}
                        onChange={(event) => setPromoCode(event.target.value)}
                        disabled={promoApplied}
                        placeholder="Enter code"
                        className="h-9 min-w-0 flex-1 rounded-lg border border-blue-100 bg-white px-3 text-[10px] uppercase outline-none focus:border-blue-300"
                      />

                      {promoApplied ? (
                        <button
                          type="button"
                          onClick={removePromo}
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-rose-100 bg-rose-50 text-rose-500"
                        >
                          <X size={12} />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={applyPromo}
                          className="h-9 rounded-lg bg-blue-300 px-3 text-[9px] font-semibold text-zinc-950 transition hover:bg-blue-400"
                        >
                          Apply
                        </button>
                      )}
                    </div>

                    {promoMessage && (
                      <p
                        className={`mt-2 text-[8px] ${
                          promoApplied ? "text-emerald-600" : "text-zinc-400"
                        }`}
                      >
                        {promoMessage}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {currentStep === "delivery" && (
            <div>
              <div className="mb-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-500">
                  Delivery
                </p>

                <h4 className="mt-1 text-lg font-semibold text-zinc-950">
                  Where should we send it?
                </h4>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block">
                  <span className="text-[9px] font-medium text-zinc-600">
                    Full name
                  </span>

                  <input
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);

                      setErrors((current) => ({
                        ...current,
                        name: undefined,
                      }));
                    }}
                    placeholder="Alex Morgan"
                    className={`mt-1.5 h-10 w-full rounded-xl border bg-white px-3 text-[10px] outline-none transition focus:ring-4 focus:ring-blue-100 ${
                      errors.name
                        ? "border-rose-300"
                        : "border-zinc-200 focus:border-blue-300"
                    }`}
                  />

                  {errors.name && (
                    <p className="mt-1 text-[8px] text-rose-500">
                      {errors.name}
                    </p>
                  )}
                </label>

                <label className="block">
                  <span className="text-[9px] font-medium text-zinc-600">
                    Email
                  </span>

                  <input
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);

                      setErrors((current) => ({
                        ...current,
                        email: undefined,
                      }));
                    }}
                    placeholder="alex@email.com"
                    className={`mt-1.5 h-10 w-full rounded-xl border bg-white px-3 text-[10px] outline-none transition focus:ring-4 focus:ring-blue-100 ${
                      errors.email
                        ? "border-rose-300"
                        : "border-zinc-200 focus:border-blue-300"
                    }`}
                  />

                  {errors.email && (
                    <p className="mt-1 text-[8px] text-rose-500">
                      {errors.email}
                    </p>
                  )}
                </label>
              </div>

              <label className="mt-3 block">
                <span className="text-[9px] font-medium text-zinc-600">
                  Address
                </span>

                <input
                  value={address}
                  onChange={(event) => {
                    setAddress(event.target.value);

                    setErrors((current) => ({
                      ...current,
                      address: undefined,
                    }));
                  }}
                  placeholder="123 Interface Street"
                  className={`mt-1.5 h-10 w-full rounded-xl border bg-white px-3 text-[10px] outline-none transition focus:ring-4 focus:ring-blue-100 ${
                    errors.address
                      ? "border-rose-300"
                      : "border-zinc-200 focus:border-blue-300"
                  }`}
                />
              </label>

              <div className="mt-3 grid grid-cols-2 gap-3">
                <label>
                  <span className="text-[9px] font-medium text-zinc-600">
                    City
                  </span>

                  <input
                    value={city}
                    onChange={(event) => {
                      setCity(event.target.value);

                      setErrors((current) => ({
                        ...current,
                        city: undefined,
                      }));
                    }}
                    placeholder="Amsterdam"
                    className="mt-1.5 h-10 w-full rounded-xl border border-zinc-200 px-3 text-[10px] outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                  />
                </label>

                <label>
                  <span className="text-[9px] font-medium text-zinc-600">
                    Postal code
                  </span>

                  <input
                    value={postalCode}
                    onChange={(event) => {
                      setPostalCode(event.target.value);

                      setErrors((current) => ({
                        ...current,
                        postalCode: undefined,
                      }));
                    }}
                    placeholder="1234 AB"
                    className="mt-1.5 h-10 w-full rounded-xl border border-zinc-200 px-3 text-[10px] outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                  />
                </label>
              </div>

              <div className="mt-5">
                <p className="text-[9px] font-medium text-zinc-600">
                  Shipping method
                </p>

                <div className="mt-2 grid grid-cols-2 gap-2">
                  {[
                    {
                      id: "standard" as const,
                      label: "Standard",
                      detail: "3–5 days",
                      price: "Free",
                    },
                    {
                      id: "express" as const,
                      label: "Express",
                      detail: "Next day",
                      price: formatPrice(prices.express),
                    },
                  ].map((option) => {
                    const active = shippingMethod === option.id;

                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setShippingMethod(option.id)}
                        className={`rounded-xl border p-3 text-left transition ${
                          active
                            ? "border-blue-300 bg-blue-50"
                            : "border-zinc-200 hover:border-blue-200"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-[10px] font-semibold ${
                              active ? "text-blue-700" : "text-zinc-700"
                            }`}
                          >
                            {option.label}
                          </span>

                          {active && (
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-300 text-zinc-950">
                              <Check size={10} />
                            </span>
                          )}
                        </div>

                        <p className="mt-1 text-[8px] text-zinc-400">
                          {option.detail}
                        </p>

                        <p className="mt-2 text-[9px] font-semibold text-zinc-700">
                          {option.price}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {currentStep === "payment" && (
            <div>
              <div className="mb-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-500">
                  Payment
                </p>

                <h4 className="mt-1 text-lg font-semibold text-zinc-950">
                  Secure payment
                </h4>
              </div>

              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-300 via-blue-400 to-blue-500 p-5 text-zinc-950 shadow-[0_18px_40px_rgba(96,165,250,0.3)]">
                <div className="absolute -right-10 -top-12 h-32 w-32 rounded-full bg-white/20 blur-xl" />

                <div className="relative">
                  <div className="flex items-center justify-between">
                    <CreditCard size={20} />

                    <Sparkles size={16} />
                  </div>

                  <p className="mt-8 font-mono text-sm font-semibold tracking-[0.15em]">
                    {cardNumber || "•••• •••• •••• ••••"}
                  </p>

                  <div className="mt-4 flex justify-between text-[8px] font-medium">
                    <span>{name || "CARD HOLDER"}</span>

                    <span>{expiry || "MM/YY"}</span>
                  </div>
                </div>
              </div>

              <label className="mt-5 block">
                <span className="text-[9px] font-medium text-zinc-600">
                  Card number
                </span>

                <input
                  value={cardNumber}
                  inputMode="numeric"
                  onChange={(event) => {
                    setCardNumber(formatCardNumber(event.target.value));

                    setErrors((current) => ({
                      ...current,
                      cardNumber: undefined,
                    }));
                  }}
                  placeholder="4242 4242 4242 4242"
                  className={`mt-1.5 h-10 w-full rounded-xl border px-3 font-mono text-[10px] outline-none transition focus:ring-4 focus:ring-blue-100 ${
                    errors.cardNumber
                      ? "border-rose-300"
                      : "border-zinc-200 focus:border-blue-300"
                  }`}
                />
              </label>

              <div className="mt-3 grid grid-cols-2 gap-3">
                <label>
                  <span className="text-[9px] font-medium text-zinc-600">
                    Expiry
                  </span>

                  <input
                    value={expiry}
                    inputMode="numeric"
                    onChange={(event) => {
                      setExpiry(formatExpiry(event.target.value));

                      setErrors((current) => ({
                        ...current,
                        expiry: undefined,
                      }));
                    }}
                    placeholder="MM/YY"
                    className="mt-1.5 h-10 w-full rounded-xl border border-zinc-200 px-3 text-[10px] outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                  />
                </label>

                <label>
                  <span className="text-[9px] font-medium text-zinc-600">
                    CVC
                  </span>

                  <input
                    value={cvc}
                    inputMode="numeric"
                    onChange={(event) => {
                      setCvc(onlyDigits(event.target.value).slice(0, 3));

                      setErrors((current) => ({
                        ...current,
                        cvc: undefined,
                      }));
                    }}
                    placeholder="123"
                    className="mt-1.5 h-10 w-full rounded-xl border border-zinc-200 px-3 text-[10px] outline-none transition focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
                  />
                </label>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={saveCard}
                onClick={() => setSaveCard((current) => !current)}
                className="mt-4 flex w-full items-center justify-between rounded-xl border border-zinc-200 p-3 text-left"
              >
                <div>
                  <p className="text-[10px] font-medium text-zinc-700">
                    Save card
                  </p>

                  <p className="mt-0.5 text-[8px] text-zinc-400">
                    For faster checkout next time
                  </p>
                </div>

                <span
                  className={`relative h-6 w-11 rounded-full transition ${
                    saveCard ? "bg-blue-300" : "bg-zinc-200"
                  }`}
                >
                  <span
                    className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                      saveCard ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </span>
              </button>
            </div>
          )}

          {currentStep === "review" && (
            <form onSubmit={completeOrder}>
              <div className="mb-5">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-blue-500">
                  Review
                </p>

                <h4 className="mt-1 text-lg font-semibold text-zinc-950">
                  Ready to order
                </h4>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between rounded-xl border border-zinc-200 p-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <Package size={14} />
                    </span>

                    <div>
                      <p className="text-[10px] font-semibold text-zinc-700">
                        Motion UI Pack
                      </p>

                      <p className="text-[8px] text-zinc-400">
                        Quantity {quantity}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setCurrentStep("cart")}
                    className="text-[8px] font-medium text-blue-600 hover:text-blue-700"
                  >
                    Edit
                  </button>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-zinc-200 p-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <Truck size={14} />
                    </span>

                    <div>
                      <p className="text-[10px] font-semibold text-zinc-700">
                        {shippingMethod === "express"
                          ? "Express delivery"
                          : "Standard delivery"}
                      </p>

                      <p className="text-[8px] text-zinc-400">
                        {city}, {postalCode}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setCurrentStep("delivery")}
                    className="text-[8px] font-medium text-blue-600"
                  >
                    Edit
                  </button>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-zinc-200 p-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                      <CreditCard size={14} />
                    </span>

                    <div>
                      <p className="text-[10px] font-semibold text-zinc-700">
                        Card ending {onlyDigits(cardNumber).slice(-4)}
                      </p>

                      <p className="text-[8px] text-zinc-400">
                        Secure card payment
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setCurrentStep("payment")}
                    className="text-[8px] font-medium text-blue-600"
                  >
                    Edit
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={processing}
                className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-blue-300 text-[10px] font-semibold text-zinc-950 shadow-[0_10px_25px_rgba(147,197,253,0.35)] transition hover:bg-blue-400 disabled:cursor-wait"
              >
                {processing ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-950/20 border-t-zinc-950" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock size={12} />
                    Place order · {formatPrice(total)}
                  </>
                )}
              </button>
            </form>
          )}

          {currentStep !== "review" && (
            <div className="mt-6 flex items-center justify-between">
              {currentStep !== "cart" ? (
                <button
                  type="button"
                  onClick={goBack}
                  className="flex h-10 items-center gap-2 rounded-xl px-3 text-[10px] font-medium text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-800"
                >
                  <ArrowLeft size={13} />
                  Back
                </button>
              ) : (
                <span />
              )}

              <button
                type="button"
                onClick={goNext}
                className="flex h-10 items-center gap-2 rounded-xl bg-blue-300 px-4 text-[10px] font-semibold text-zinc-950 shadow-sm transition hover:bg-blue-400"
              >
                Continue
                <ArrowRight size={13} />
              </button>
            </div>
          )}
        </div>

        <aside
          className={`border-blue-100 bg-blue-50/40 p-5 ${
            compact ? "border-t" : "border-l"
          }`}
        >
          <p className="text-[9px] font-semibold uppercase tracking-[0.15em] text-blue-500">
            Order summary
          </p>

          <div className="mt-4 space-y-3">
            <div className="flex justify-between text-[9px]">
              <span className="text-zinc-500">Subtotal</span>

              <span className="font-medium text-zinc-700">
                {formatPrice(subtotal)}
              </span>
            </div>

            <div className="flex justify-between text-[9px]">
              <span className="text-zinc-500">Shipping</span>

              <span className="font-medium text-zinc-700">
                {shipping === 0 ? "Free" : formatPrice(shipping)}
              </span>
            </div>

            {promoApplied && (
              <div className="flex justify-between text-[9px]">
                <span className="text-emerald-600">BLUE15</span>

                <span className="font-medium text-emerald-600">
                  -{formatPrice(discount)}
                </span>
              </div>
            )}
          </div>

          <div className="my-4 h-px bg-blue-100" />

          <div className="flex items-end justify-between">
            <div>
              <p className="text-[8px] text-zinc-400">Total</p>

              <p className="mt-1 text-xl font-bold tracking-tight text-zinc-950">
                {formatPrice(total)}
              </p>
            </div>

            <span className="rounded-lg bg-blue-100 px-2 py-1 text-[8px] font-medium text-blue-700">
              EUR
            </span>
          </div>

          <div className="mt-5 rounded-xl border border-blue-100 bg-white p-3">
            <div className="flex items-start gap-2">
              <Lock size={12} className="mt-0.5 shrink-0 text-blue-500" />

              <div>
                <p className="text-[9px] font-semibold text-zinc-700">
                  Secure checkout
                </p>

                <p className="mt-1 text-[8px] leading-4 text-zinc-400">
                  Your payment details are protected.
                </p>
              </div>
            </div>
          </div>

          {deliveryComplete && (
            <div className="mt-2 flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 p-2.5">
              <Check size={11} className="text-emerald-600" />

              <span className="text-[8px] font-medium text-emerald-700">
                Delivery details complete
              </span>
            </div>
          )}

          {paymentComplete && (
            <div className="mt-2 flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 p-2.5">
              <Check size={11} className="text-emerald-600" />

              <span className="text-[8px] font-medium text-emerald-700">
                Payment ready
              </span>
            </div>
          )}
        </aside>
      </div>

      {notification && (
        <div className="absolute bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-blue-100 bg-white px-3 py-2 text-[9px] font-medium text-blue-700 shadow-xl">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-300 text-zinc-950">
            <Check size={10} />
          </span>

          {notification}
        </div>
      )}
    </div>
  );
}
