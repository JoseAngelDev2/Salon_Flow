using Microsoft.EntityFrameworkCore;
using src.Data;
using FluentValidation;
using WebApplication1.FluentValidation;

var builder = WebApplication.CreateBuilder(args);




builder.Services.AddValidatorsFromAssemblyContaining<CustomerCreateDtoValidator>();
builder.Services.AddControllers();
builder.Services.AddSwaggerGen();

var MyConnectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

builder.Services.AddDbContext<CustomerDbContext>(x =>
{
    x.UseNpgsql(MyConnectionString);
});


var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
};

app.UseCors("AllowAll");  
app.UseAuthorization();

app.MapControllers();


//app.UseAuthorization();

app.Run();
