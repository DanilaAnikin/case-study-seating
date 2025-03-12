export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
}

export const fetchEventDetails = async () => {
  const res = await fetch(`${API_BASE_URL}/event`);
  if (!res.ok) throw new Error("Failed to fetch event details");
  
  return res.json();
};

export const fetchEventTickets = async (eventId: string) => {
  const res = await fetch(`${API_BASE_URL}/event-tickets?eventId=${eventId}`);
  if (!res.ok) throw new Error("Failed to fetch tickets");
  
  return res.json();
};

export const loginUser = async (email: string, password: string) => {
  const res = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  
  return res.json();
};

export const createOrder = async (orderData: any) => {
  const res = await fetch(`${API_BASE_URL}/order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData)
  });

  return res.json();
};
