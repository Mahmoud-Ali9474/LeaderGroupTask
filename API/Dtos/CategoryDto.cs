using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class CategoryDto
    {
        public CategoryDto()
        {
            Tags = new List<KeyValuePairDto>();
        }

        public int Id { get; set; }
        public string Name { get; set; } = null!;


        public ICollection<KeyValuePairDto> Tags { get; set; }
    }
}