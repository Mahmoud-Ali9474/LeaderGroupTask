using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly LeaderGroupTaskDBContext _context;

        public AuthRepository(LeaderGroupTaskDBContext context)
        {
            _context = context;
        }
        public async Task<User?> Login(string username, string password)
        {
            var user = await _context.Users.Include(u => u.Roles).FirstOrDefaultAsync(u => u.UserName == username);
            if (user == null)
                return null!;

            if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSault))
                return null!;

            return user;
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSault)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSault))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != passwordHash[i])
                        return false;
                }
            }
            return true;
        }

        public async Task<User> Register(User user, string password)
        {
            byte[] passwordHash, passwordSault;
            CreatePasswordHash(password, out passwordHash, out passwordSault);
            user.PasswordHash = passwordHash;
            user.PasswordSault = passwordSault;
            await _context.AddAsync(user);
            await _context.SaveChangesAsync();
            return user;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSault)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSault = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public async Task<bool> UserExists(string username)
        {
            return await _context.Users.AnyAsync(u => u.UserName == username);
        }
    }
}