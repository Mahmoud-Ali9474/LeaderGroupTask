using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Extensions
{
    public static class IQuerableExtension
    {
        public static IQueryable<T> WhereIf<T>(this IQueryable<T> query, bool condition, Func<T, bool> predicate)
        {
            if (!condition)
                return query;
            return query.Where(predicate).AsQueryable();
        }
    }
}