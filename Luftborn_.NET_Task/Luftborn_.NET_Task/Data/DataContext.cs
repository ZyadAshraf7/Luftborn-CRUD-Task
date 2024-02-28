using Luftborn_.NET_Task.Models;
using Microsoft.EntityFrameworkCore;

namespace Luftborn_.NET_Task.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
        public DbSet<Employee> Employees{ get; set; }
    }
}
