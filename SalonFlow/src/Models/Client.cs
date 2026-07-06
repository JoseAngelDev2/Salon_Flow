using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace SalonFlow.Models
{
    public class Client
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Lastname { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public int Active { get; set; } = 1;
    }
    }
