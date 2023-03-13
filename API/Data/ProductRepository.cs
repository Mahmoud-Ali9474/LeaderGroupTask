using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using API.Extensions;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ProductRepository : IProductRepository
    {
        private readonly LeaderGroupTaskDBContext _context;
        public ProductRepository(LeaderGroupTaskDBContext context)
        {
            _context = context;
        }

        public async Task Add(Product product)
        {

            var selectedTags = product.Tags.Select(fr => fr.Id);
            product.Tags = await _context.Tags
                .Where(f => selectedTags.Contains(f.Id))
                .ToListAsync();
            _context.Add(product);
        }
        public async Task Update(Product product)
        {
            var selectedTags = product.Tags.Select(fr => fr.Id);
            product.Tags = await _context.Tags
                    .Where(f => selectedTags.Contains(f.Id))
                    .ToListAsync();
        }
        public async Task<IEnumerable<Product>> GetAllProducts(ProductSeachFacade search)
        {
            return _context
                .Products
                .Include(p => p.Category)
                .Include(p => p.Tags)
                .WhereIf(!string.IsNullOrEmpty(search.Tag), p => p.Tags.Any(t => t.Name.Contains(search.Tag!)))
                .WhereIf(search.AddedDate.HasValue
                    , p => search.AddedDate.Value.Date == p.AddedDate.Date)
                .WhereIf(!string.IsNullOrEmpty(search.Name?.Trim()), p => p.Title.Contains(search.Name!))
                .ToList();
        }

        public async Task<Product> GetProduct(int id, bool includeRelated = true)
        {
            if (!includeRelated)
                return await _context.Products.FindAsync(id);

            return await _context
                            .Products
                            .Include(p => p.Category)
                            .Include(p => p.Tags)
                            .SingleOrDefaultAsync(p => p.Id == id);
        }

        public void Remove(Product product)
        {
            product.IsDeleted = true;
        }

        public void DeleteMany(List<int> ids)
        {
            var entitiesToDelete = _context.Products.Where(p => ids.Contains(p.Id));
            foreach (var item in entitiesToDelete)
            {
                item.IsDeleted = true;
            }
        }
    }
}