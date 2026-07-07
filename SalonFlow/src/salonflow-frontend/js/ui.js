

const UI = {
  tableBody: document.getElementById("customersTableBody"),
  emptyState: document.getElementById("emptyState"),
  loadingState: document.getElementById("loadingState"),
  formPanel: document.getElementById("customerFormPanel"),
  formTitle: document.getElementById("formTitle"),
  form: document.getElementById("customerForm"),
  toastEl: document.getElementById("toast"),
  confirmOverlay: document.getElementById("confirmOverlay"),
  confirmMessage: document.getElementById("confirmMessage"),
  confirmCancelBtn: document.getElementById("confirmCancelBtn"),
  confirmAcceptBtn: document.getElementById("confirmAcceptBtn"),
  statTotal: document.getElementById("statTotal"),
  statActive: document.getElementById("statActive"),
  statInactive: document.getElementById("statInactive"),

  fields: ["name", "lastname", "email", "phone", "active"],

  svgEdit: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
      <path d="M12 20h9"/>
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>
    </svg>`,

  svgDelete: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
      <path d="M3 6h18"/>
      <path d="M8 6V4.5A1.5 1.5 0 0 1 9.5 3h5A1.5 1.5 0 0 1 16 4.5V6"/>
      <path d="M19 6l-.8 13.2A2 2 0 0 1 16.2 21H7.8a2 2 0 0 1-2-1.8L5 6"/>
      <path d="M10 11v6"/>
      <path d="M14 11v6"/>
    </svg>`,

  
  showLoading() {
    this.loadingState.hidden = false;
    this.emptyState.hidden = true;
  },

  renderCustomers(customers) {
    this.loadingState.hidden = true;
    this.tableBody.innerHTML = "";

    if (!customers || customers.length === 0) {
      this.emptyState.hidden = false;
      return;
    }

    this.emptyState.hidden = true;

    const rows = customers.map((customer) => this.buildRow(customer));
    this.tableBody.append(...rows);
  },
  updateStats(customers) {
    const list = customers || [];
    const total = list.length;
    const active = list.filter((c) => Number(c.active) === 1).length;
    const inactive = total - active;

    if (this.statTotal) this.statTotal.textContent = total;
    if (this.statActive) this.statActive.textContent = active;
    if (this.statInactive) this.statInactive.textContent = inactive;
  },

  buildRow(customer) {
    const tr = document.createElement("tr");
    tr.dataset.id = customer.id;

    const isActive = Number(customer.active) === 1;
    const badgeClass = isActive ? "badge-active" : "badge-inactive";
    const badgeLabel = isActive ? "Active" : "Inactive";

    tr.innerHTML = `
      <td class="cell-id">${customer.id}</td>
      <td>${this.escape(customer.name)}</td>
      <td>${this.escape(customer.lastname)}</td>
      <td>${this.escape(customer.email)}</td>
      <td>${this.escape(customer.phone)}</td>
      <td><span class="badge ${badgeClass}">${badgeLabel}</span></td>
      <td class="cell-actions">
        <button type="button" class="icon-btn edit" title="Edit" data-action="edit">${this.svgEdit}</button>
        <button type="button" class="icon-btn delete" title="Delete" data-action="delete">${this.svgDelete}</button>
      </td>
    `;

    return tr;
  },

  /** Escapa texto para prevenir inyección de HTML en la tabla. */
  escape(value) {
    const div = document.createElement("div");
    div.textContent = value ?? "";
    return div.innerHTML;
  },

  /** Abre el panel del formulario en modo "Add" o "Edit". */
  openForm(mode, customer = null) {
    this.clearErrors();
    this.form.reset();
    document.getElementById("customerId").value = "";

    if (mode === "edit" && customer) {
      this.formTitle.textContent = "Edit Customer";
      document.getElementById("customerId").value = customer.id;
      document.getElementById("name").value = customer.name ?? "";
      document.getElementById("lastname").value = customer.lastname ?? "";
      document.getElementById("email").value = customer.email ?? "";
      document.getElementById("phone").value = customer.phone ?? "";
      document.getElementById("active").value = String(customer.active);
    } else {
      this.formTitle.textContent = "Add Customer";
    }

    this.formPanel.hidden = false;
  },

  /** Cierra y limpia el panel del formulario. */
  closeForm() {
    this.formPanel.hidden = true;
    this.form.reset();
    this.clearErrors();
  },

  /** Limpia todos los mensajes/estilos de error del formulario. */
  clearErrors() {
    this.fields.forEach((field) => {
      const errorEl = document.getElementById(`error-${field}`);
      const groupEl = document.getElementById(field)?.closest(".field-group");
      if (errorEl) errorEl.textContent = "";
      if (groupEl) groupEl.classList.remove("has-error");
    });
  },

  /** Muestra un mensaje de error debajo de un campo específico. */
  showFieldError(field, message) {
    const errorEl = document.getElementById(`error-${field}`);
    const groupEl = document.getElementById(field)?.closest(".field-group");
    if (errorEl) errorEl.textContent = message;
    if (groupEl) groupEl.classList.add("has-error");
  },

  /**
   * Aplica errores de validación provenientes de la API (400) o del
   * validador local. `errors` puede ser:
   *  - { Name: ["..."], Email: ["..."] }  (formato ASP.NET)
   *  - { name: "...", email: "..." }      (formato local, string simple)
   */
  applyValidationErrors(errors) {
    Object.entries(errors).forEach(([key, value]) => {
      const field = key.toLowerCase();
      if (!this.fields.includes(field)) return;
      const message = Array.isArray(value) ? value[0] : value;
      this.showFieldError(field, message);
    });
  },

  /**
   * Reemplazo de window.confirm() con un modal propio (más confiable en
   * entornos embebidos donde los diálogos nativos del navegador no
   * siempre se muestran). Retorna una Promise<boolean>.
   */
  confirm(message) {
    return new Promise((resolve) => {
      this.confirmMessage.textContent = message;
      this.confirmOverlay.hidden = false;

      const cleanup = (result) => {
        this.confirmOverlay.hidden = true;
        this.confirmAcceptBtn.removeEventListener("click", onAccept);
        this.confirmCancelBtn.removeEventListener("click", onCancel);
        this.confirmOverlay.removeEventListener("click", onOverlayClick);
        resolve(result);
      };

      const onAccept = () => cleanup(true);
      const onCancel = () => cleanup(false);
      const onOverlayClick = (event) => {
        if (event.target === this.confirmOverlay) cleanup(false);
      };

      this.confirmAcceptBtn.addEventListener("click", onAccept);
      this.confirmCancelBtn.addEventListener("click", onCancel);
      this.confirmOverlay.addEventListener("click", onOverlayClick);
    });
  },

  /** Muestra un toast temporal. type: "error" (default) o "success". */
  showToast(message, type = "error", duration = 4000) {
    this.toastEl.textContent = message;
    this.toastEl.classList.remove("toast-error", "toast-success");
    this.toastEl.classList.add(type === "success" ? "toast-success" : "toast-error");
    this.toastEl.hidden = false;
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => {
      this.toastEl.hidden = true;
    }, duration);
  },

  /** Habilita/deshabilita el botón Guardar (evita doble envío). */
  setSaving(isSaving) {
    const btn = document.getElementById("btnSave");
    btn.disabled = isSaving;
    btn.textContent = isSaving ? "Saving..." : "Save";
  },
};
