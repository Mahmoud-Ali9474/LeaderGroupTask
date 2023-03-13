using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class SaveProductDto
    {
        public SaveProductDto()
        {
            Tags = new List<int>();
        }

        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public string Desc { get; set; } = null!;
        public double Price { get; set; }
        public int Quantity { get; set; }
        public int CategoryId { get; set; }

        public ICollection<int> Tags { get; set; }
    }
}