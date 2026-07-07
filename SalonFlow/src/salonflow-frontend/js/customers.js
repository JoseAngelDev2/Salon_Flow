
const Customers = {
  currentList: [],


  async loadAll() {
    UI.showLoading();
    try {
      const data = await CustomerApi.getAll();
      this.currentList = Array.isArray(data) ? data : [];
      UI.renderCustomers(this.currentList);
      UI.updateStats(this.currentList);
    } catch (error) {
      UI.renderCustomers([]);
      UI.updateStats([]);
      this.handleApiError(error);
    }
  },


  findById(id) {
    return this.currentList.find((c) => String(c.id) === String(id));
  },

  search(query) {
    const term = query.trim().toLowerCase();

    if (!term) {
      UI.renderCustomers(this.currentList);
      return;
    }

    const filtered = this.currentList.filter((customer) => {
      const fullName = `${customer.name} ${customer.lastname}`.toLowerCase();
      const phone = String(customer.phone ?? "").toLowerCase();
      return fullName.includes(term) || phone.includes(term);
    });

    UI.renderCustomers(filtered);
  },


  validate({ name, lastname, email, phone, active }) {
    const errors = {};

    if (!name || !name.trim()) {
      errors.name = "El nombre es obligatorio.";
    }

    if (!lastname || !lastname.trim()) {
      errors.lastname = "El apellido es obligatorio.";
    }

    if (!email || !email.trim()) {
      errors.email = "El email es obligatorio.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = "Ingresa un email válido.";
    }

    if (!phone || !phone.trim()) {
      errors.phone = "El teléfono es obligatorio.";
    }

    if (active === "" || active === null || active === undefined) {
      errors.active = "El estado es obligatorio.";
    }

    return errors;
  },


  readForm() {
    return {
      id: document.getElementById("customerId").value,
      name: document.getElementById("name").value,
      lastname: document.getElementById("lastname").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      active: document.getElementById("active").value,
    };
  },


  async submitForm() {
    const values = this.readForm();
    const errors = this.validate(values);

    UI.clearErrors();

    if (Object.keys(errors).length > 0) {
      UI.applyValidationErrors(errors);
      return;
    }

    const payload = {
      name: values.name.trim(),
      lastname: values.lastname.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
      active: Number(values.active),
    };

    const isEditing = Boolean(values.id);

    if (isEditing) {
      const confirmed = await UI.confirm(
        "¿Deseas actualizar los datos de este cliente?"
      );
      if (!confirmed) return;
    }

    UI.setSaving(true);

    try {
      if (isEditing) {
        payload.id = Number(values.id);
        await CustomerApi.update(values.id, payload);
        UI.showToast("Cliente actualizado correctamente.", "success");
      } else {
        await CustomerApi.create(payload);
        UI.showToast("Cliente creado correctamente.", "success");
      }

      UI.closeForm();
      await this.loadAll();
    } catch (error) {
      this.handleApiError(error);
    } finally {
      UI.setSaving(false);
    }
  },

 
  async delete(id) {
    const confirmed = await UI.confirm(
      "¿Estás seguro de que deseas eliminar este cliente? Esta acción no se puede deshacer."
    );
    if (!confirmed) return;

    try {
      await CustomerApi.remove(id);
      UI.showToast("Cliente eliminado correctamente.", "success");
      await this.loadAll();
    } catch (error) {
      this.handleApiError(error);
    }
  },

 
  handleApiError(error) {
    if (error instanceof ApiError && error.status === 400 && error.validationErrors) {
      UI.applyValidationErrors(error.validationErrors);
      return;
    }

    if (error instanceof ApiError && error.status === null) {
      UI.showToast("No fue posible conectar con la API.");
      return;
    }

    UI.showToast(error.message || "Ocurrió un error inesperado.");
  },
};
