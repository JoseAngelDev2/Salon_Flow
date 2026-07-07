using FluentValidation;
using WebApplication1.DTO;

namespace WebApplication1.FluentValidation
{
    public class CustomerValidation : AbstractValidator<CreateCustomerDTOs>
    {
        public CustomerValidation()
        {
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Name is required")
                .Length(2, 25).WithMessage("The name must be between 2 and 25 characters long");

            RuleFor(x => x.Lastname)
                .NotEmpty().WithMessage("LastName is required")
                .Length(2, 25).WithMessage("The lastname must be between 2 and 25 characters long");

            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Email is required")
                .EmailAddress().WithMessage("The format is not valid");

            RuleFor(x => x.Phone)
                .NotEmpty().WithMessage("Phone number is not valid")
                .Length(10, 15).WithMessage("Phone number must be between 11 and 15 characters long");

            RuleFor(x => x.Active)
                .NotEmpty().WithMessage("Status is required")
                .Must(val => val == 0 || val == 1)
                .WithMessage("The state only accepts the values ​​0 or 1");                
                        
    }
}}
