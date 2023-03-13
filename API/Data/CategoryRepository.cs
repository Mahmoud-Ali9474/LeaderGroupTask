using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Extensions;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly LeaderGroupTaskDBContext _context;
        public CategoryRepository(LeaderGroupTaskDBContext context)
        {
            _context = context;
        }

        public async Task Add(Category category)
        {
            var selectedTags = category.Tags.Select(fr => fr.Id);
            category.Tags = await _context.Tags
                    .Where(f => selectedTags.Contains(f.Id))
                    .ToListAsync();
            _context.Add(category);
        }
        public async Task Update(Category category)
        {
            var selectedTags = category.Tags.Select(fr => fr.Id);
            category.Tags = await _context.Tags
                    .Where(f => selectedTags.Contains(f.Id))
                    .ToListAsync();
        }
        public async Task<IEnumerable<Category>> GetAllCategories(string? name)
        {
            return _context
                    .Categories
                    .Include(c => c.Tags)
                    .WhereIf(!string.IsNullOrEmpty(name), c => c.Name == name)
                    .ToList();
        }

        public async Task<Category> GetCategory(int id, bool includeRelated = true)
        {
            if (!includeRelated)
                return await _context.Categories.FindAsync(id);

            return await _context
                            .Categories
                            .Include(p => p.Tags)
                            .SingleOrDefaultAsync(p => p.Id == id);
        }

        public void Remove(Category Category)
        {
            Category.IsDeleted = true;
        }
    }
}