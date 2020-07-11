using Microsoft.EntityFrameworkCore;
using vega.Models;

namespace vega.Persistance
{
    public class VegaDbContext : DbContext
    {
        public DbSet<Make> Makes { get; set; }
        public DbSet<Feature> Features { get; set; }
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
        
        // Fluent API
        protected override void OnModelCreating(ModelBuilder modelBuilder){
            modelBuilder.Entity<VehicleFeature>().HasKey(vf =>
                new { vf.VehicleId, vf.FeatureId });
        }
        
    }
}