using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class ProductSeachFacade
    {
        public string? Name { get; set; } = null;
        public DateTime? AddedDate { get; set; } = null;
        public string? Tag { get; set; } = null;
    }
}