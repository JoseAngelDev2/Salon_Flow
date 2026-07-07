
function initNavigation() {
  const navItems = document.querySelectorAll(".nav-item[data-view]");
  const views = document.querySelectorAll(".view");

  navItems.forEach((item) => {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      const target = item.dataset.view;

      views.forEach((view) => {
        view.hidden = view.id !== `view-${target}`;
      });

      navItems.forEach((nav) => nav.classList.remove("active"));
      item.classList.add("active");
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();

  Customers.loadAll();


  document.getElementById("btnAddCustomer").addEventListener("click", () => {
    UI.openForm("add");
  });


  document.getElementById("btnCancel").addEventListener("click", () => {
    UI.closeForm();
  });

  document.getElementById("customerForm").addEventListener("submit", (event) => {
    event.preventDefault();
    Customers.submitForm();
  });


  document.getElementById("searchInput").addEventListener("input", (event) => {
    Customers.search(event.target.value);
  });

  document.getElementById("customersTableBody").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;

    const row = button.closest("tr");
    const id = row?.dataset.id;
    if (!id) return;

    if (button.dataset.action === "edit") {
      const customer = Customers.findById(id);
      if (customer) UI.openForm("edit", customer);
    }

    if (button.dataset.action === "delete") {
      Customers.delete(id);
    }
  });
});
