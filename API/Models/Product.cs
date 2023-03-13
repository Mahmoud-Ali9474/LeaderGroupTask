using System;
using System.Collections.Generic;

namespace API.Models
{
    public partial class Product
    {
        public Product()
        {
            Tags = new HashSet<Tag>();
        }

        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public string Desc { get; set; } = null!;
        public double Price { get; set; }
        public DateTime AddedDate { get; set; }
        public int Quantity { get; set; }
        public int CategoryId { get; set; }
        public bool IsDeleted { get; set; }

        public virtual Category Category { get; set; } = null!;

        public virtual ICollection<Tag> Tags { get; set; }
    }
}
