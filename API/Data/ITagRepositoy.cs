using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;

namespace API.Data
{
    public interface ITagRepository
    {
        Task<IEnumerable<Tag>> GetTags();
    }
}