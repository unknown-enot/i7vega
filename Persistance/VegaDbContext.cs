using Microsoft.EntityFrameworkCore;
using vega.Core.Models;

namespace vega.Persistance
{
    public class VegaDbContext : DbContext
    {
        public DbSet<Vehicle> Vehicles { get; set; }
        public DbSet<Make> Makes { get; set; }
        public DbSet<Model> Models { get; set; }
        public DbSet<Feature> Features { get; set; }
        public DbSet<Photo> Photos { get; set; }
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