
const API_BASE_URL = "http://localhost:5244/api/Customer";

class ApiError extends Error {
  constructor(message, status, validationErrors = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.validationErrors = validationErrors; 
  }
}


async function request(url, options = {}) {
  let response;

  try {
    response = await fetch(url, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });
  } catch (networkError) {

    throw new ApiError("No fue posible conectar con la API.", null);
  }


  if (response.status === 204) {
    return null;
  }

  let data = null;
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    data = await response.json().catch(() => null);
  }

  if (!response.ok) {
    if (response.status === 400 && data && data.errors) {

      throw new ApiError("Errores de validación", 400, data.errors);
    }
    throw new ApiError(
      (data && (data.title || data.message)) || `Error HTTP ${response.status}`,
      response.status
    );
  }

  return data;
}

const CustomerApi = {
  getAll() {
    return request(API_BASE_URL, { method: "GET" });
  },

  create(customer) {
    return request(API_BASE_URL, {
      method: "POST",
      body: JSON.stringify(customer),
    });
  },
  update(id, customer) {
    return request(`${API_BASE_URL}/${id}`, {
      method: "PUT",
      body: JSON.stringify(customer),
    });
  },
  remove(id) {
    return request(`${API_BASE_URL}/${id}`, { method: "DELETE" });
  },
};
