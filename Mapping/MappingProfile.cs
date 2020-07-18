using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using vega.Controllers.Resources;
using vega.Core.Models;

namespace vega.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Domain to API Resource
            CreateMap<Make, MakeResource>();
            CreateMap<Make, KeyValuePairResource>();
            CreateMap<Model, KeyValuePairResource>();
            CreateMap<Feature, KeyValuePairResource>();
            CreateMap<Vehicle,SaveVehicleResource>()
                .ForMember(vr => vr.Contact, opt => opt.MapFrom(v => new ContactResource { Name = v.ContactName, Email = v.ContactEmail, Phone = v.ContactPhone} ))
                .ForMember(vr => vr.Features, opt => opt.MapFrom(v => v.Features.Select(vf => vf.FeatureId)));
            
            CreateMap<Vehicle,VehicleResource>()
                .ForMember(vr => vr.Make, opt => opt.MapFrom(v => v.Model.Make))
                .ForMember(vr => vr.Contact, opt => opt.MapFrom(v => new ContactResource { Name = v.ContactName, Email = v.ContactEmail, Phone = v.ContactPhone} ))
                .ForMember(vr => vr.Features, opt => opt.MapFrom(v => v.Features.Select(vf => new KeyValuePairResource { Id = vf.Feature.Id, Name = vf.Feature.Name })));
            // API Resource to Domain
            CreateMap<FilterResource, Filter>();
            CreateMap<SaveVehicleResource,Vehicle>()
                .ForMember(v => v.Id, opt => opt.Ignore())
                .ForMember(v => v.ContactName, opt => opt.MapFrom(vr => vr.Contact.Name))
                .ForMember(v => v.ContactEmail, opt => opt.MapFrom(vr => vr.Contact.Email))
                .ForMember(v => v.ContactPhone, opt => opt.MapFrom(vr => vr.Contact.Phone))
                .ForMember(v => v.Features, opt => opt.Ignore())
                .AfterMap((vr, v) => {
                    // Remove unselected features. Way1.
                    //var removedFeatures = new List<VehicleFeature>();
                    //foreach(var f in v.Features)
                    //    if(!vr.Features.Contains(f.FeatureId))
                    //        removedFeatures.Add(f);

                    // Remove unselected features. LINQ Way.
                    var removedFeatures = v.Features.Where(f => !vr.Features.Contains(f.FeatureId));
                    foreach(var f in removedFeatures.ToList())
                        v.Features.Remove(f);

                    /*
                        -> Collection was modified; enumeration operation may not execute -< 
                        What's likely happening is that removedFeatures is indirectly changing the removedFeatures 
                        under the hood during the loop and leading to that message. You can verify this by changing
                        foreach(var f in removedFeatures.ToList()).
                        That copies the values of removedFeatures to a separate list at the start of the foreach. 
                        Nothing else has access to this list (it doesn't even have a variable name!), so nothing can modify it inside the loop.
                    */    

                    // Add new features. Way1
                    // foreach(var id in vr.Features)
                    //     if(!v.Features.Any(f => f.FeatureId == id))
                    //         v.Features.Add(new VehicleFeature { FeatureId = id});


                    // Add new features. LINQ Way.
                    var addedFeatures = vr.Features.Where(id => !v.Features.Any(f => f.FeatureId == id)).Select(id => new VehicleFeature { FeatureId = id });
                    foreach(var f in addedFeatures)
                        v.Features.Add(f);
                
                });
        }
    }
}