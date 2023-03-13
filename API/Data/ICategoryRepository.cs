using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
namespace API.Data
{
    public interface ICategoryRepository
    {
        Task<IEnumerable<Category>> GetAllCategories(string? name);
        Task<Category> GetCategory(int id, bool includeRelated = true);
        Task Add(Category Category);
        Task Update(Category Category);
        void Remove(Category Category);
    }
}