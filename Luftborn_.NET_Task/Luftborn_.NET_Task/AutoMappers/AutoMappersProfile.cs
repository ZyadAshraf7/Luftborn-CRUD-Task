using AutoMapper;
using Luftborn_.NET_Task.DTO;
using Luftborn_.NET_Task.Models;

namespace Luftborn_.NET_Task.AutoMappers
{
    public class AutoMappersProfile : Profile
    {
        public AutoMappersProfile()
        {
            CreateMap<Employee, EmployeeDTO>().ReverseMap();
        }
    }
}
