using AutoMapper;
using System.Linq;
using API.Models;
using API.Dtos;

namespace API.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Domain to API Resource
            // CreateMap<Make, MakeResource>();
            CreateMap<Category, KeyValuePairDto>();
            CreateMap<Tag, KeyValuePairDto>();
            CreateMap<Product, SaveProductDto>()
              .ForMember(pr => pr.Tags, opt => opt.MapFrom(p => p.Tags.Select(pt => pt.Id)));
            CreateMap<Product, ProductDto>()
              .ForMember(pr => pr.Tags, opt => opt.MapFrom(p => p.Tags.Select(pt => new KeyValuePairDto { Id = pt.Id, Name = pt.Name })));
            CreateMap<Category, SaveCategoryDto>()
              .ForMember(cr => cr.Tags, opt => opt.MapFrom(c => c.Tags.Select(ct => ct.Id)));
            CreateMap<Category, CategoryDto>()
              .ForMember(cr => cr.Tags, opt => opt.MapFrom(c => c.Tags.Select(ct => new KeyValuePairDto { Id = ct.Id, Name = ct.Name })));

            // API Resource to Domain
            CreateMap<SaveProductDto, Product>()
              .ForMember(p => p.Id, opt => opt.Ignore())
              .ForMember(p => p.Tags, opt => opt.Ignore())
              .AfterMap((pr, p) =>
              {
                  // Remove unselected tags
                  var removedTages = p.Tags.Where(t => !pr.Tags.Contains(t.Id)).ToList();
                  foreach (var t in removedTages)
                      p.Tags.Remove(t);

                  // Add new tags
                  var addedTags = pr.Tags.Where(id => !p.Tags.Any(t => t.Id == id)).Select(id => new Tag { Id = id }).ToList();
                  foreach (var t in addedTags)
                      p.Tags.Add(t);
              });
            CreateMap<SaveCategoryDto, Category>()
            .ForMember(c => c.Id, opt => opt.Ignore())
            .ForMember(c => c.Tags, opt => opt.Ignore())
            .AfterMap((cr, c) =>
            {
                // Remove unselected tags
                var removedTages = c.Tags.Where(t => !cr.Tags.Contains(t.Id)).ToList();
                foreach (var t in removedTages)
                    c.Tags.Remove(t);

                // Add new tags
                var addedTags = cr.Tags.Where(id => !c.Tags.Any(t => t.Id == id)).Select(id => new Tag { Id = id }).ToList();
                foreach (var t in addedTags)
                    c.Tags.Add(t);
            });

        }
    }
}