const ENDPOINT = "https://api.web3forms.com/submit";

const MAX_GUESTS = 20;

export function validateRsvp({
  name,
  attendance,
  guestCount = 0,
  guests = [],
} = {}) {
  const errors = {};

  const trimmedName = typeof name === "string" ? name.trim() : "";
  if (trimmedName.length < 2) {
    errors.name = true;
  }

  if (attendance !== "yes" && attendance !== "no") {
    errors.attendance = true;
  }

  if (attendance === "yes") {
    const count = typeof guestCount === "number" ? guestCount : Number(guestCount);
    const validCount = Number.isInteger(count) && count >= 0 && count <= MAX_GUESTS;

    if (!validCount) {
      errors.guestCount = true;
    } else {
      const guestErrors = [];
      for (let i = 0; i < count; i += 1) {
        const guest = guests[i] || {};
        const trimmedGuestName = typeof guest.name === "string" ? guest.name.trim() : "";
        const guestFieldErrors = {};
        if (trimmedGuestName.length < 2) {
          guestFieldErrors.name = true;
        }
        if (guest.type !== "adult" && guest.type !== "child") {
          guestFieldErrors.type = true;
        }
        guestErrors.push(
          Object.keys(guestFieldErrors).length > 0 ? guestFieldErrors : null,
        );
      }
      if (guestErrors.some((item) => item !== null)) {
        errors.guests = guestErrors;
      }
    }
  }

  return { valid: Object.keys(errors).length === 0, errors };
}

function attendanceLabel(value) {
  return value === "yes" ? "Sim, estarei presente" : "Não poderei comparecer";
}

function guestLabel(type) {
  return type === "child" ? "Criança" : "Adulto(a)";
}

function formatGuests(guests) {
  return (Array.isArray(guests) ? guests : [])
    .filter((guest) => guest && String(guest.name || "").trim())
    .map((guest) => `${String(guest.name).trim()} — ${guestLabel(guest.type)}`)
    .join("\n");
}

export async function submitRsvp(
  { name, attendance, guests, message = "", botcheck = "" },
  accessKey,
) {
  if (botcheck) {
    return { success: true, skipped: true };
  }

  const key = accessKey || import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
  const formattedGuests = formatGuests(guests);
  const body = {
    access_key: key,
    subject: `RSVP - ${String(name).trim()}`,
    from_name: "Convite de Casamento",
    _template: "table",
    name: String(name).trim(),
    attendance: attendanceLabel(attendance),
    acompanhantes: formattedGuests || "—",
    message: String(message).trim() || "—",
    botcheck,
  };

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.success) {
    throw new Error(data.message || "Não foi possível enviar sua confirmação.");
  }

  return data;
}