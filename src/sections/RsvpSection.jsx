import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { RevealOnScroll } from "../components/RevealOnScroll";
import { OrnamentDivider } from "../components/OrnamentDivider";
import { validateRsvp, submitRsvp } from "../lib/rsvp";
import { weddingConfig } from "../config/wedding.config";

const { rsvp } = weddingConfig;

const EMPTY = {
  name: "",
  attendance: "",
  guestCount: 0,
  guests: [],
  message: "",
  botcheck: "",
};

export function RsvpSection() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [submitError, setSubmitError] = useState(false);

  const update = (field) => (event) => {
    const value = event.target.value;
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: false }));
    }
  };

  const updateGuestCount = (event) => {
    const count = Number(event.target.value);
    setValues((prev) => {
      const current = prev.guests;
      let nextGuests = current;
      if (count > current.length) {
        nextGuests = [
          ...current,
          ...Array.from({ length: count - current.length }, () => ({
            name: "",
            type: "",
          })),
        ];
      } else if (count < current.length) {
        nextGuests = current.slice(0, count);
      }
      return { ...prev, guestCount: count, guests: nextGuests };
    });
    if (errors.guestCount || errors.guests) {
      setErrors((prev) => ({ ...prev, guestCount: false, guests: false }));
    }
  };

  const clearGuestFieldError = (index, field) => {
    if (!errors.guests) {
      return;
    }
    setErrors((prev) => ({
      ...prev,
      guests: prev.guests.map((guest, i) =>
        i === index && guest ? { ...guest, [field]: false } : guest,
      ),
    }));
  };

  const updateGuest = (index) => (field) => (event) => {
    const value = event.target.value;
    setValues((prev) => ({
      ...prev,
      guests: prev.guests.map((guest, i) =>
        i === index ? { ...guest, [field]: value } : guest,
      ),
    }));
    clearGuestFieldError(index, field);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const result = validateRsvp(values);
    if (!result.valid) {
      setErrors(result.errors);
      return;
    }
    setErrors({});
    setSubmitError(false);
    setStatus("submitting");
    try {
      await submitRsvp(values);
      setStatus("success");
    } catch {
      setSubmitError(true);
      setStatus("idle");
    }
  };

  const submitting = status === "submitting";

  return (
    <section id="rsvp" className="scroll-mt-4 bg-ivory-deep/60 px-6 py-24">
      <div className="mx-auto max-w-2xl">
        <RevealOnScroll className="text-center">
          <h2 className="font-serif text-4xl text-charcoal sm:text-5xl">{rsvp.title}</h2>
          <OrnamentDivider className="my-6" />
          <p className="font-sans text-sm tracking-[0.2em] text-charcoal-soft uppercase">
            {rsvp.subtitle}
          </p>
        </RevealOnScroll>

        <RevealOnScroll delay={0.15}>
          <div className="mt-12 rounded-sm border border-gold/30 bg-ivory px-8 py-10 shadow-[0_30px_60px_-45px_rgba(47,42,38,0.9)]">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  className="text-center"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="font-serif text-5xl text-gold">&#10003;</span>
                  <h3 className="mt-4 font-serif text-3xl text-charcoal">{rsvp.success.title}</h3>
                  <p className="mx-auto mt-4 max-w-md font-sans text-sm text-charcoal-soft">
                    {rsvp.success.message}
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  noValidate
                  className="relative flex flex-col gap-7"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="text-center font-sans text-xs tracking-[0.2em] text-gold-deep uppercase">
                    {rsvp.deadline}
                  </p>

                  <div
                    aria-hidden="true"
                    className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden"
                  >
                    <label htmlFor="rsvp-botcheck">Não preencha este campo</label>
                    <input
                      id="rsvp-botcheck"
                      name="botcheck"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={values.botcheck}
                      onChange={update("botcheck")}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="rsvp-name"
                      className="font-sans text-xs tracking-[0.25em] text-charcoal-soft uppercase"
                    >
                      {rsvp.nameLabel}
                    </label>
                    <input
                      id="rsvp-name"
                      name="name"
                      type="text"
                      value={values.name}
                      onChange={update("name")}
                      placeholder={rsvp.namePlaceholder}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "rsvp-name-error" : undefined}
                      className="rounded-sm border border-gold/30 bg-ivory px-4 py-3 font-sans text-charcoal outline-none transition-colors focus:border-gold"
                    />
                    {errors.name && (
                      <span id="rsvp-name-error" role="alert" className="font-sans text-xs text-red-700">
                        {rsvp.errors.name}
                      </span>
                    )}
                  </div>

                  <fieldset className="flex flex-col gap-3">
                    <legend className="mb-1 font-sans text-xs tracking-[0.25em] text-charcoal-soft uppercase">
                      {rsvp.attendanceLabel}
                    </legend>
                    {[
                      { value: "yes", label: rsvp.attendanceYes },
                      { value: "no", label: rsvp.attendanceNo },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className="flex cursor-pointer items-center gap-3 rounded-sm border border-gold/20 px-4 py-3 font-sans text-sm text-charcoal transition-colors hover:border-gold/50 has-[:checked]:border-gold has-[:checked]:bg-gold/5"
                      >
                        <input
                          type="radio"
                          name="attendance"
                          value={option.value}
                          checked={values.attendance === option.value}
                          onChange={update("attendance")}
                          className="h-4 w-4 accent-[#6f8a63]"
                          aria-invalid={Boolean(errors.attendance)}
                          aria-describedby={errors.attendance ? "rsvp-attendance-error" : undefined}
                        />
                        {option.label}
                      </label>
                    ))}
                    {errors.attendance && (
                      <span
                        id="rsvp-attendance-error"
                        role="alert"
                        className="font-sans text-xs text-red-700"
                      >
                        {rsvp.errors.attendance}
                      </span>
                    )}
                  </fieldset>

                  {values.attendance === "yes" && (
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="rsvp-guest-count"
                        className="font-sans text-xs tracking-[0.25em] text-charcoal-soft uppercase"
                      >
                        {rsvp.guestCountLabel}
                      </label>
                      <input
                        id="rsvp-guest-count"
                        name="guestCount"
                        type="number"
                        min={0}
                        max={20}
                        value={values.guestCount}
                        onChange={updateGuestCount}
                        aria-invalid={Boolean(errors.guestCount)}
                        aria-describedby={errors.guestCount ? "rsvp-guest-count-error" : undefined}
                        className="rounded-sm border border-gold/30 bg-ivory px-4 py-3 font-sans text-charcoal outline-none transition-colors focus:border-gold"
                      />
                      {errors.guestCount && (
                        <span
                          id="rsvp-guest-count-error"
                          role="alert"
                          className="font-sans text-xs text-red-700"
                        >
                          {rsvp.errors.guestCount}
                        </span>
                      )}
                    </div>
                  )}

                  {values.attendance === "yes" &&
                    values.guestCount > 0 &&
                    values.guests.map((guest, index) => {
                      const guestErrors = errors.guests?.[index] || {};
                      return (
                        <div
                          key={index}
                          className="flex flex-col gap-4 rounded-sm border border-gold/20 bg-ivory-deep/40 px-4 py-5"
                        >
                          <p className="font-serif text-xl text-charcoal">
                            {rsvp.guestBlockLabel} {index + 1}
                          </p>

                          <div className="flex flex-col gap-2">
                            <label
                              htmlFor={`rsvp-guest-name-${index}`}
                              className="font-sans text-xs tracking-[0.25em] text-charcoal-soft uppercase"
                            >
                              {rsvp.guestNameLabel}
                            </label>
                            <input
                              id={`rsvp-guest-name-${index}`}
                              name={`guest-name-${index}`}
                              type="text"
                              value={guest.name}
                              onChange={updateGuest(index)("name")}
                              placeholder={rsvp.guestNamePlaceholder}
                              aria-invalid={Boolean(guestErrors.name)}
                              aria-describedby={
                                guestErrors.name
                                  ? `rsvp-guest-name-${index}-error`
                                  : undefined
                              }
                              className="rounded-sm border border-gold/30 bg-ivory px-4 py-3 font-sans text-charcoal outline-none transition-colors focus:border-gold"
                            />
                            {guestErrors.name && (
                              <span
                                id={`rsvp-guest-name-${index}-error`}
                                role="alert"
                                className="font-sans text-xs text-red-700"
                              >
                                {rsvp.errors.guestName}
                              </span>
                            )}
                          </div>

                          <div className="flex flex-col gap-3">
                            <p className="mb-1 font-sans text-xs tracking-[0.25em] text-charcoal-soft uppercase">
                              {rsvp.guestTypeLabel}
                            </p>
                            <div className="flex flex-wrap gap-3">
                              {[
                                { value: "adult", label: rsvp.guestTypeAdult },
                                { value: "child", label: rsvp.guestTypeChild },
                              ].map((option) => (
                                <label
                                  key={option.value}
                                  className="flex cursor-pointer items-center gap-3 rounded-sm border border-gold/20 px-4 py-3 font-sans text-sm text-charcoal transition-colors hover:border-gold/50 has-[:checked]:border-gold has-[:checked]:bg-gold/5"
                                >
                                  <input
                                    type="radio"
                                    name={`guest-type-${index}`}
                                    value={option.value}
                                    checked={guest.type === option.value}
                                    onChange={updateGuest(index)("type")}
                                    className="h-4 w-4 accent-[#6f8a63]"
                                    aria-invalid={Boolean(guestErrors.type)}
                                    aria-describedby={
                                      guestErrors.type
                                        ? `rsvp-guest-type-${index}-error`
                                        : undefined
                                    }
                                  />
                                  {option.label}
                                </label>
                              ))}
                            </div>
                            {guestErrors.type && (
                              <span
                                id={`rsvp-guest-type-${index}-error`}
                                role="alert"
                                className="font-sans text-xs text-red-700"
                              >
                                {rsvp.errors.guestType}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="rsvp-message"
                      className="font-sans text-xs tracking-[0.25em] text-charcoal-soft uppercase"
                    >
                      {rsvp.messageLabel}
                    </label>
                    <textarea
                      id="rsvp-message"
                      name="message"
                      rows={4}
                      value={values.message}
                      onChange={update("message")}
                      placeholder={rsvp.messagePlaceholder}
                      className="resize-none rounded-sm border border-gold/30 bg-ivory px-4 py-3 font-sans text-charcoal outline-none transition-colors focus:border-gold"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="mt-2 rounded-full bg-gold px-8 py-4 font-sans text-xs tracking-[0.3em] text-ivory uppercase transition-colors hover:bg-gold-deep disabled:cursor-wait disabled:opacity-70"
                  >
                    {submitting ? rsvp.submittingLabel : rsvp.submitLabel}
                  </button>

                  {submitError && (
                    <span
                      role="alert"
                      className="text-center font-sans text-xs text-red-700"
                    >
                      {rsvp.errors.send}
                    </span>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
