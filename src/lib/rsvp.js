const ENDPOINT = "https://api.web3forms.com/submit";

export function validateRsvp({ name, attendance } = {}) {
  const errors = {};

  const trimmedName = typeof name === "string" ? name.trim() : "";
  if (trimmedName.length < 2) {
    errors.name = true;
  }

  if (attendance !== "yes" && attendance !== "no") {
    errors.attendance = true;
  }

  return { valid: Object.keys(errors).length === 0, errors };
}

function attendanceLabel(value) {
  return value === "yes" ? "Sim, estarei presente" : "Não poderei comparecer";
}

export async function submitRsvp({ name, attendance, message = "", botcheck = "" }, accessKey) {
  if (botcheck) {
    return { success: true, skipped: true };
  }

  const key = accessKey || import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
  const body = {
    access_key: key,
    subject: `RSVP - ${String(name).trim()}`,
    from_name: "Convite de Casamento",
    _template: "table",
    name: String(name).trim(),
    attendance: attendanceLabel(attendance),
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