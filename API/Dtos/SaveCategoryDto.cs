using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class SaveCategoryDto
    {
        public SaveCategoryDto()
        {
            Tags = new List<int>();
        }

        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public virtual ICollection<int> Tags { get; set; }
    }
}