using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using src.Data;
using src.DTOs;
using src.Models;
using FluentValidation;
using DTOs;
namespace src.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomerController : ControllerBase
    {
        private readonly CustomerDbContext db;
        private readonly IValidator<CreateCustomerDTOs> _validator;
        public CustomerController(CustomerDbContext _db, IValidator<CreateCustomerDTOs> validator)
        {
            db = _db;
            _validator = validator;
        }

        [HttpGet]

        public async Task<ActionResult<IEnumerable<ReadCustomerDTOs>>> GetAllCustomer()
        {

            var customers = await db.Customers.AsNoTracking().ToListAsync();

            if (customers is null) { return NoContent(); }
            return Ok(customers);
        }

        [HttpPost]

        public async Task<ActionResult> CreateCustomer(CreateCustomerDTOs customer)
        {
            var validationResult = await _validator.ValidateAsync(customer);
            Console.WriteLine(validationResult);
            if (!validationResult.IsValid)
            {
                var modelState = new Microsoft.AspNetCore.Mvc.ModelBinding.ModelStateDictionary();
                foreach (var error in validationResult.Errors)
                {
                    modelState.AddModelError(error.PropertyName, error.ErrorMessage);
                }

                return ValidationProblem(modelState);
            }

            var NewCustomer = new Customer
            {
                Name = customer.Name,
                Lastname = customer.Lastname,
                Email = customer.Email,
                Phone = customer.Phone,
                Active = customer.Active
            };

            await db.Customers.AddAsync(NewCustomer);
            await db.SaveChangesAsync();
            return NoContent();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateCustomer(int id, CreateCustomerDTOs customer)
        {
            var validationResult = await _validator.ValidateAsync(customer);

            if (!validationResult.IsValid)
            {
                var modelState = new Microsoft.AspNetCore.Mvc.ModelBinding.ModelStateDictionary();

                foreach (var error in validationResult.Errors)
                {
                    modelState.AddModelError(error.PropertyName, error.ErrorMessage);
                }

                return ValidationProblem(modelState);
            }

            var customerDb = await db.Customers.FindAsync(id);

            if (customerDb is null)
            {
                return NotFound();
            }

            customerDb.Name = customer.Name;
            customerDb.Lastname = customer.Lastname;
            customerDb.Email = customer.Email;
            customerDb.Phone = customer.Phone;
            customerDb.Active = customer.Active;

            await db.SaveChangesAsync();

            return NoContent();
        }


        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCustomer(int id)
        {
            var customer = await db.Customers.FindAsync(id);

            if (customer is null)
            {
                return NotFound();
            }

            db.Customers.Remove(customer);

            await db.SaveChangesAsync();

            return NoContent();
        }

    }


}