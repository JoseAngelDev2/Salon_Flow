using Microsoft.EntityFrameworkCore;
using src.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var MyConnectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<CustomerDbContext>(x =>
{
    x.UseNpgsql(MyConnectionString);
});

var app = builder.Build();


app.UseHttpsRedirection();
app.MapControllers();

app.UseCors("AllowAll");  
app.UseAuthorization();

app.Run();
