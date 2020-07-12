using System.Threading.Tasks;
using vega.Core.Models;


namespace vega.Core
{
    public interface IVehicleRepository
    {
        Task<Vehicle> GetVehicle(int id, bool includeRelated = true);
        Task<Vehicle> GetVehicleWithFeatures(int id);
        void Add(Vehicle vehicle);
        void Remove(Vehicle vehicle);
        
    }
}