using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly LeaderGroupTaskDBContext _context;
        public UnitOfWork(LeaderGroupTaskDBContext context)
        {
            _context = context;

        }

        public async Task CompleteAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}