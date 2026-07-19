"use client";

import { useEffect, useState } from "react";
import { QrCanvas } from "@/components/poster/QrCanvas";
import { PAYMENT_CONFIG } from "@/lib/payment-config";
import {
  PERFORMANCE_FORM_URL,
  PREFERRED_DAY_LABELS,
  PREFERRED_TIME_LABELS,
  PREFERRED_TIME_SLOTS,
  type PreferredDay,
  type PreferredTime,
  WAIVER_TEXT,
} from "@/lib/registration";

type RegistrationModalProps = {
  open: boolean;
  onClose: () => void;
};

/** First screen: pick track. Then popup goes to existing form flow. */
type Track = "choose" | "performance" | "popup";

type FormState = {
  childName: string;
  parentGuardianName: string;
  parentEmail: string;
  contactNumber: string;
  childDateOfBirth: string;
  preferredDay: PreferredDay | "";
  preferredTime: PreferredTime | "";
  waiverAccepted: boolean;
};

type Step = 1 | 2 | 3;

const INITIAL: FormState = {
  childName: "",
  parentGuardianName: "",
  parentEmail: "",
  contactNumber: "",
  childDateOfBirth: "",
  preferredDay: "",
  preferredTime: "",
  waiverAccepted: false,
};

function validateStep1(form: FormState): string | null {
  if (!form.childName.trim() || form.childName.trim().length < 2) {
    return "Please enter the child's full name.";
  }
  if (!form.parentGuardianName.trim() || form.parentGuardianName.trim().length < 2) {
    return "Please enter the parent/guardian's full name.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.parentEmail.trim())) {
    return "Please enter a valid email address.";
  }
  if (!form.contactNumber.trim() || form.contactNumber.replace(/\D/g, "").length < 8) {
    return "Please enter a valid contact number.";
  }
  if (!form.childDateOfBirth) {
    return "Please enter the child's date of birth.";
  }
  if (!form.preferredDay) {
    return "Please select a preferred day.";
  }
  if (!form.preferredTime) {
    return "Please select a preferred time.";
  }
  if (!form.waiverAccepted) {
    return "You must accept the waiver before registering.";
  }
  return null;
}

function StepIndicator({ step }: { step: Step }) {
  const items = [
    { n: 1, label: "Details" },
    { n: 2, label: "Payment" },
    { n: 3, label: "Ticket" },
  ] as const;

  return (
    <div className="mb-6 flex items-center justify-center gap-2">
      {items.map((item, i) => (
        <div key={item.n} className="flex items-center gap-2">
          <div className="flex flex-col items-center gap-1">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full font-display text-xs font-bold ${
                step === item.n
                  ? "bg-[#ff5c4d] text-white"
                  : step > item.n
                    ? "bg-[#34d399] text-white"
                    : "bg-[#0c1a2e]/8 text-[#0c1a2e]/40"
              }`}
            >
              {step > item.n ? "✓" : item.n}
            </div>
            <span
              className={`text-[0.65rem] font-bold uppercase tracking-wide ${
                step >= item.n ? "text-[#0c1a2e]" : "text-[#0c1a2e]/40"
              }`}
            >
              {item.label}
            </span>
          </div>
          {i < items.length - 1 && (
            <div
              className={`mb-4 h-0.5 w-8 ${step > item.n ? "bg-[#34d399]" : "bg-[#0c1a2e]/10"}`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export function RegistrationModal({ open, onClose }: RegistrationModalProps) {
  const [track, setTrack] = useState<Track>("choose");
  const [form, setForm] = useState<FormState>(INITIAL);
  const [step, setStep] = useState<Step>(1);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [attendeeCode, setAttendeeCode] = useState<string | null>(null);
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [proofPreview, setProofPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      setTrack("choose");
      setForm(INITIAL);
      setStep(1);
      setError(null);
      setAttendeeCode(null);
      setProofFile(null);
      setProofPreview(null);
      setSubmitting(false);
    }
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && open) onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const modalTitle =
    track === "choose"
      ? "What are you signing up for?"
      : track === "performance"
        ? "Performance"
        : step === 1
          ? "Pop-up class"
          : step === 2
            ? "Payment"
            : "Your Ticket";

  const summaryLine =
    form.preferredDay && form.preferredTime
      ? `${PREFERRED_DAY_LABELS[form.preferredDay]} · ${PREFERRED_TIME_LABELS[form.preferredTime]}`
      : "your chosen slot";

  function goToPayment() {
    const err = validateStep1(form);
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    setStep(2);
  }

  function onProofFile(file: File | null) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file.");
      return;
    }
    setProofFile(file);
    setError(null);
    const reader = new FileReader();
    reader.onload = () => setProofPreview(reader.result as string);
    reader.readAsDataURL(file);
  }

  function backToChoose() {
    setTrack("choose");
    setStep(1);
    setError(null);
    setForm(INITIAL);
    setProofFile(null);
    setProofPreview(null);
    setAttendeeCode(null);
  }

  async function submitRegistration() {
    if (!proofFile) {
      setError("Please upload your payment screenshot first.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const payload = new FormData();
      payload.append(
        "payload",
        JSON.stringify({
          childName: form.childName,
          parentGuardianName: form.parentGuardianName,
          parentEmail: form.parentEmail,
          contactNumber: form.contactNumber,
          childDateOfBirth: form.childDateOfBirth,
          preferredDay: form.preferredDay,
          preferredTime: form.preferredTime,
          waiverAccepted: form.waiverAccepted,
        }),
      );
      payload.append("paymentScreenshot", proofFile);

      const res = await fetch("/api/register", {
        method: "POST",
        body: payload,
      });

      const json = (await res.json()) as { error?: string; attendeeCode?: string };

      if (!res.ok) {
        setError(json.error ?? "Registration failed. Please try again.");
        return;
      }

      setAttendeeCode(json.attendeeCode ?? null);
      setStep(3);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="register-title"
    >
      <button
        type="button"
        className="absolute inset-0 bg-[#0c1a2e]/70 backdrop-blur-sm"
        aria-label="Close registration"
        onClick={onClose}
      />

      <div className="relative max-h-[92svh] w-full max-w-lg overflow-y-auto rounded-t-[2rem] bg-[#fff8f0] shadow-2xl sm:rounded-[2rem]">
        <div className="sticky top-0 z-10 h-2 bg-gradient-to-r from-[#ff5c4d] via-[#ffc93c] to-[#3db8ff]" />

        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-[#ff5c4d]">
                BazGym Carnival 2026
              </p>
              <h2 id="register-title" className="font-display mt-1 text-2xl font-bold text-[#0c1a2e]">
                {modalTitle}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0c1a2e]/8 text-[#0c1a2e] transition hover:bg-[#0c1a2e]/15"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          {/* ── CHOOSE TRACK ── */}
          {track === "choose" && (
            <div className="mt-6 space-y-4">
              <p className="text-sm text-[#0c1a2e]/60">
                Pick one path to continue. You can close and register again for the other.
              </p>

              <button
                type="button"
                onClick={() => setTrack("performance")}
                className="group w-full rounded-3xl border-2 border-[#0c1a2e]/10 bg-white p-6 text-left transition hover:border-[#ff5c4d] hover:shadow-lg hover:shadow-[#ff5c4d]/10"
              >
                <span className="text-3xl">⭐</span>
                <p className="font-display mt-3 text-xl font-bold text-[#0c1a2e] group-hover:text-[#ff5c4d]">
                  Performance
                </p>
                <p className="mt-1 text-sm text-[#0c1a2e]/55">
                  Showcase / competitive performance sign-up. External form — link coming soon.
                </p>
                <p className="mt-4 font-display text-sm font-bold text-[#ff5c4d]">Continue →</p>
              </button>

              <button
                type="button"
                onClick={() => {
                  setTrack("popup");
                  setStep(1);
                  setError(null);
                }}
                className="group w-full rounded-3xl border-2 border-[#0c1a2e]/10 bg-white p-6 text-left transition hover:border-[#3db8ff] hover:shadow-lg hover:shadow-[#3db8ff]/10"
              >
                <span className="text-3xl">🤸</span>
                <p className="font-display mt-3 text-xl font-bold text-[#0c1a2e] group-hover:text-[#3db8ff]">
                  Pop-up class
                </p>
                <p className="mt-1 text-sm text-[#0c1a2e]/55">
                  Trial classes on the day — register here, pay, and get logged into our sheet.
                </p>
                <p className="mt-4 font-display text-sm font-bold text-[#3db8ff]">Register →</p>
              </button>
            </div>
          )}

          {/* ── PERFORMANCE PLACEHOLDER ── */}
          {track === "performance" && (
            <div className="mt-6 space-y-5">
              <div className="rounded-3xl border-2 border-[#0c1a2e]/10 bg-white p-6 text-center">
                <p className="text-4xl">⭐</p>
                <p className="font-display mt-3 text-xl font-bold text-[#0c1a2e]">
                  Performance form
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[#0c1a2e]/60">
                  Performance sign-ups will open via an external Google Form. The link is not ready
                  yet — check back soon, or contact BazGym for early enquiries.
                </p>
                {PERFORMANCE_FORM_URL ? (
                  <a
                    href={PERFORMANCE_FORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-[#ff5c4d] py-4 font-display font-bold text-white transition hover:bg-[#ff5c4d]/90"
                  >
                    Open performance form →
                  </a>
                ) : (
                  <p className="mt-6 rounded-2xl bg-[#ffc93c]/25 px-4 py-3 font-display text-sm font-bold text-[#8a6100]">
                    Google Form link coming soon
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={backToChoose}
                className="w-full rounded-2xl border-2 border-[#0c1a2e]/15 py-3 font-display text-sm font-bold text-[#0c1a2e]"
              >
                ← Back to choices
              </button>
            </div>
          )}

          {/* ── POP-UP CLASS FLOW ── */}
          {track === "popup" && (
            <>
              <div className="mt-2 mb-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={backToChoose}
                  className="text-xs font-bold uppercase tracking-wider text-[#0c1a2e]/45 transition hover:text-[#0c1a2e]"
                >
                  ← Change type
                </button>
              </div>

              <StepIndicator step={step} />

              {step === 1 && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    goToPayment();
                  }}
                  className="space-y-5"
                >
                  <Field label="Child's full name" required>
                    <input
                      type="text"
                      required
                      value={form.childName}
                      onChange={(e) => setForm((f) => ({ ...f, childName: e.target.value }))}
                      className="register-input"
                      placeholder="e.g. Emma Tan"
                      autoComplete="name"
                    />
                  </Field>

                  <Field label="Parent / guardian full name" required>
                    <input
                      type="text"
                      required
                      value={form.parentGuardianName}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, parentGuardianName: e.target.value }))
                      }
                      className="register-input"
                      placeholder="e.g. Sarah Tan"
                      autoComplete="name"
                    />
                  </Field>

                  <Field label="Email" required>
                    <input
                      type="email"
                      required
                      value={form.parentEmail}
                      onChange={(e) => setForm((f) => ({ ...f, parentEmail: e.target.value }))}
                      className="register-input"
                      placeholder="e.g. sarah@email.com"
                      autoComplete="email"
                    />
                  </Field>

                  <Field label="Contact number" required>
                    <input
                      type="tel"
                      required
                      value={form.contactNumber}
                      onChange={(e) => setForm((f) => ({ ...f, contactNumber: e.target.value }))}
                      className="register-input"
                      placeholder="e.g. 9123 4567"
                      autoComplete="tel"
                    />
                  </Field>

                  <Field label="Child's date of birth" required>
                    <input
                      type="date"
                      required
                      value={form.childDateOfBirth}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, childDateOfBirth: e.target.value }))
                      }
                      className="register-input"
                      max={new Date().toISOString().split("T")[0]}
                    />
                  </Field>

                  <fieldset>
                    <legend className="mb-3 text-sm font-bold text-[#0c1a2e]">
                      Preferred day <span className="text-[#ff5c4d]">*</span>
                    </legend>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {(["5-sept", "6-sept"] as const).map((day) => (
                        <label
                          key={day}
                          className={`flex cursor-pointer items-center gap-3 rounded-2xl border-2 p-4 transition ${
                            form.preferredDay === day
                              ? "border-[#ff5c4d] bg-[#ff5c4d]/8"
                              : "border-[#0c1a2e]/10 bg-white hover:border-[#0c1a2e]/20"
                          }`}
                        >
                          <input
                            type="radio"
                            name="preferredDay"
                            value={day}
                            checked={form.preferredDay === day}
                            onChange={() => setForm((f) => ({ ...f, preferredDay: day }))}
                            className="h-4 w-4 accent-[#ff5c4d]"
                            required
                          />
                          <span className="font-display text-sm font-bold text-[#0c1a2e]">
                            {PREFERRED_DAY_LABELS[day]}
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend className="mb-3 text-sm font-bold text-[#0c1a2e]">
                      Preferred class time <span className="text-[#ff5c4d]">*</span>
                    </legend>
                    <p className="mb-3 text-xs text-[#0c1a2e]/45">
                      Each hour is a different class — full schedule coming soon.
                    </p>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                      {PREFERRED_TIME_SLOTS.map((slot) => (
                        <label
                          key={slot}
                          className={`flex cursor-pointer items-center justify-center rounded-2xl border-2 px-2 py-3 transition ${
                            form.preferredTime === slot
                              ? "border-[#3db8ff] bg-[#3db8ff]/10"
                              : "border-[#0c1a2e]/10 bg-white hover:border-[#0c1a2e]/20"
                          }`}
                        >
                          <input
                            type="radio"
                            name="preferredTime"
                            value={slot}
                            checked={form.preferredTime === slot}
                            onChange={() => setForm((f) => ({ ...f, preferredTime: slot }))}
                            className="sr-only"
                            required
                          />
                          <span className="font-display text-center text-xs font-bold text-[#0c1a2e] sm:text-sm">
                            {PREFERRED_TIME_LABELS[slot]}
                          </span>
                        </label>
                      ))}
                    </div>
                  </fieldset>

                  <div className="rounded-2xl border-2 border-[#0c1a2e]/10 bg-white p-4">
                    <p className="font-display text-sm font-bold text-[#0c1a2e]">
                      Waiver &amp; release
                    </p>
                    <div className="mt-3 max-h-44 overflow-y-auto rounded-xl bg-[#fff8f0] p-3 text-xs leading-relaxed text-[#0c1a2e]/70 whitespace-pre-line">
                      {WAIVER_TEXT}
                    </div>
                    <label className="mt-4 flex cursor-pointer items-start gap-3">
                      <input
                        type="checkbox"
                        checked={form.waiverAccepted}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, waiverAccepted: e.target.checked }))
                        }
                        className="mt-0.5 h-4 w-4 shrink-0 accent-[#ff5c4d]"
                        required
                      />
                      <span className="text-sm font-semibold text-[#0c1a2e]">
                        I have read and agree to the waiver on behalf of myself and my child.{" "}
                        <span className="text-[#ff5c4d]">*</span>
                      </span>
                    </label>
                  </div>

                  {error && <ErrorBox message={error} />}

                  <button
                    type="submit"
                    disabled={!form.waiverAccepted}
                    className="w-full rounded-2xl bg-[#0c1a2e] py-4 font-display text-base font-bold text-white transition hover:bg-[#0c1a2e]/90 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Continue to Payment →
                  </button>
                </form>
              )}

              {step === 2 && (
                <div className="space-y-5">
                  <div className="rounded-2xl border-2 border-[#0c1a2e]/10 bg-white p-5 text-center">
                    <p className="font-display text-base font-bold text-[#0c1a2e]">
                      Scan to pay with {PAYMENT_CONFIG.paymentMethod}
                    </p>
                    <p className="mt-1 text-sm text-[#0c1a2e]/55">
                      Ticket fee will be confirmed at registration
                    </p>
                    <QrCanvas seed={PAYMENT_CONFIG.paynowQrSeed} size={220} className="mt-4" />
                    <p className="mt-3 inline-block rounded-full bg-[#ffc93c]/25 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-[#8a6100]">
                      Placeholder QR — final PayNow code coming soon
                    </p>
                    <p className="mt-3 text-xs leading-relaxed text-[#0c1a2e]/55">
                      1. Scan the QR with your banking app
                      <br />
                      2. Complete payment and screenshot the receipt
                      <br />
                      3. Upload the screenshot below
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-bold text-[#0c1a2e]">
                      Upload payment screenshot <span className="text-[#ff5c4d]">*</span>
                    </p>
                    {proofPreview ? (
                      <div className="mt-2 overflow-hidden rounded-2xl border-2 border-[#0c1a2e]/10">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={proofPreview}
                          alt="Payment screenshot preview"
                          className="block max-h-60 w-full object-contain bg-white"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setProofFile(null);
                            setProofPreview(null);
                          }}
                          className="w-full border-t border-[#0c1a2e]/10 py-2 text-sm font-semibold text-[#ff5c4d]"
                        >
                          Remove &amp; choose another
                        </button>
                      </div>
                    ) : (
                      <label className="mt-2 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#0c1a2e]/15 bg-white px-4 py-10 transition hover:border-[#ff5c4d]/40">
                        <span className="text-3xl">📷</span>
                        <span className="mt-2 font-display text-sm font-bold text-[#0c1a2e]">
                          Tap to upload screenshot
                        </span>
                        <span className="mt-1 text-xs text-[#0c1a2e]/45">
                          PNG, JPG or WebP · max 4 MB
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          className="sr-only"
                          onChange={(e) => onProofFile(e.target.files?.[0] ?? null)}
                        />
                      </label>
                    )}
                  </div>

                  <p className="text-xs text-[#0c1a2e]/45">
                    Registering for: <strong>{form.childName}</strong> · {summaryLine}
                  </p>

                  {error && <ErrorBox message={error} />}

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setStep(1);
                        setError(null);
                      }}
                      className="rounded-2xl border-2 border-[#0c1a2e]/15 px-4 py-4 font-display text-sm font-bold text-[#0c1a2e]"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={submitRegistration}
                      disabled={submitting || !proofFile}
                      className="flex-1 rounded-2xl bg-[#0c1a2e] py-4 font-display text-base font-bold text-white transition hover:bg-[#0c1a2e]/90 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {submitting ? "Submitting…" : "Confirm & Get My Ticket"}
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && attendeeCode && (
                <div className="text-center">
                  <p className="text-5xl">🎟️</p>
                  <p className="font-display mt-4 text-2xl font-bold text-[#0c1a2e]">
                    Registration received!
                  </p>
                  <p className="mt-2 text-sm text-[#0c1a2e]/65">
                    {summaryLine} · {form.childName}
                  </p>

                  <div className="mt-6 rounded-2xl border-2 border-[#0c1a2e]/10 bg-white p-6">
                    <p className="font-display text-sm font-bold uppercase tracking-wider text-[#0c1a2e]/45">
                      Your ticket code
                    </p>
                    <p className="font-display mt-2 text-4xl font-bold tracking-widest text-[#ff5c4d]">
                      {attendeeCode}
                    </p>
                    <QrCanvas seed={attendeeCode} size={180} className="mt-4" />
                    <p className="mt-4 text-xs leading-relaxed text-[#0c1a2e]/55">
                      Show this code at the door. Once our team verifies your payment, a confirmation
                      email with this code and QR will be sent to{" "}
                      <strong>{form.parentEmail}</strong>.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={onClose}
                    className="mt-6 w-full rounded-2xl bg-[#0c1a2e] py-4 font-display font-bold text-white"
                  >
                    Done
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function ErrorBox({ message }: { message: string }) {
  return (
    <p className="rounded-xl bg-[#ff5c4d]/10 px-4 py-3 text-sm font-semibold text-[#ff5c4d]">
      {message}
    </p>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-[#0c1a2e]">
        {label}
        {required && <span className="text-[#ff5c4d]"> *</span>}
      </span>
      <div className="mt-2">{children}</div>
    </label>
  );
}
