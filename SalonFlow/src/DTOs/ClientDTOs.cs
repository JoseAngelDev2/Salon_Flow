using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;


namespace DTOs
{
    public class ClientDTOs
    {
        [Required]
        public int Id { get; set; }

        [Required]
        [MaxLength(25)]
        public string? Name { get; set; }

        [Required]
        [MaxLength(25)]

        public string? Lastname { get; set; }

        [Required]
        [MaxLength(40)]
        public string? Email { get; set; }
        [MaxLength(15)]
        public string? Phone { get; set; }

        [Required]
        [MaxLength(1)]
        public int Active { get; set; } = 1;

    }
}
