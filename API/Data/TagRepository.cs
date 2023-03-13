using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class TagRepository : ITagRepository
    {
        private readonly LeaderGroupTaskDBContext _context;
        public TagRepository(LeaderGroupTaskDBContext context)
        {
            _context = context;

        }
        public async Task<IEnumerable<Tag>> GetTags()
        {
            return await _context.Tags.ToListAsync();
        }
    }
}