using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
using API.Models;

namespace API.Data
{
    public interface IProductRepository
    {
        Task<IEnumerable<Product>> GetAllProducts(ProductSeachFacade search);
        Task<Product> GetProduct(int id, bool includeRelated = true);
        Task Add(Product Product);
        Task Update(Product Product);

        void Remove(Product Product);
        void DeleteMany(List<int> ids);
    }
}