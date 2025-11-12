using Microsoft.EntityFrameworkCore;
using RestApiClass7to9TTS.Model;

namespace RestApiClass7to9TTS.Data
{
    public class ApplicationDbContext :DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        public DbSet<Department> Departments { get; set; }

        public DbSet<Employeee> Employeees { get; set; }

    }
}
