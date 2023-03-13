using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        [StringLength(maximumLength: 8, MinimumLength = 3, ErrorMessage = "Password must be between 3 and 8 characters")]
        public string Password { get; set; }
    }
}