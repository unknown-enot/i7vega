using Microsoft.EntityFrameworkCore;

namespace vega.Persistance
{
    public class VegaDbContext : DbContext
    {
       /*  public VegaDbContext(string connectionString)
            :base(connectionString)
        {
            // EF Core decoupled from System.Configuration.ConfigurationManager
            // instead we have to explicitly pass a connectionSting to it
        } */

        public VegaDbContext(DbContextOptions<VegaDbContext> options)
            : base(options)
        {
            
        }
    }
}