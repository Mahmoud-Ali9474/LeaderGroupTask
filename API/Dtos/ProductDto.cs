using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class ProductDto
    {
        public ProductDto()
        {
            Tags = new List<KeyValuePairDto>();
        }

        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public string Desc { get; set; } = null!;
        public double Price { get; set; }
        public DateTime AddedDate { get; set; }
        public int Quantity { get; set; }

        public KeyValuePairDto Category { get; set; } = null!;

        public ICollection<KeyValuePairDto> Tags { get; set; }
    }
}