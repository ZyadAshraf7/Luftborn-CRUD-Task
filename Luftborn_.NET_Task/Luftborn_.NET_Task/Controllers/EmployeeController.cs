using AutoMapper;
using Luftborn_.NET_Task.Data;
using Luftborn_.NET_Task.DTO;
using Luftborn_.NET_Task.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Luftborn_.NET_Task.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _hostingEnvironment;
        public EmployeeController(DataContext context, IMapper mapper, IWebHostEnvironment hostingEnvironment)
        {
            _context = context;
            _mapper = mapper;
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpGet]
        [Route("GetEmployees")]
        public IActionResult GetEmployees() {
            var employees = _context.Employees.ToList();
            if(employees.Any())
            {
                foreach (var employee in employees)
                {
                    if (!string.IsNullOrEmpty(employee.Image))
                    {

                        byte[] fileBytes = System.IO.File.ReadAllBytes(employee.Image);
                        string base64String = Convert.ToBase64String(fileBytes);
                        employee.Image = base64String;
                    }
                }
                return Ok(employees);
            }
            else
            {
                return BadRequest(new {message = "No Employees Found"});
            }
        }
        [HttpGet("{Id}")]
        
        public IActionResult GetEmployeeById(int Id)
        {
            var employees = _context.Employees.Where(e=>e.Id == Id);
            if (employees.Any())
            {
                return Ok(employees);
            }
            else
            {
                return NotFound(new { message = "Employee Not Found" });
            }
        }
        [HttpPost]
        [Route("AddEmployee")]
        public async Task<IActionResult> AddEmployee(EmployeeDTO employeeDto)
        {
            try
            {
                var employee = _mapper.Map<Employee>(employeeDto);

                await _context.Employees.AddAsync(employee);
                await _context.SaveChangesAsync();
                if (!string.IsNullOrEmpty(employee.Image))
                {
                    var filePath = Path.Combine(_hostingEnvironment.WebRootPath, "Resources", "Images", employee.Id.ToString());
                    string imagePathInDB = await SaveImageAsync(employee.Image, employee.Id);
                    employee.Image = imagePathInDB;
                    await _context.SaveChangesAsync();
                }
                return Ok(employee);
            }catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }
        [HttpPut]
        [Route("UpdateEmployee")]
        public async Task<IActionResult> UpdateEmployee(Employee employee)
        {
            try
            {
                _context.Employees.Update(employee);
                if (!string.IsNullOrEmpty(employee.Image))
                {
                    var filePath = Path.Combine(_hostingEnvironment.WebRootPath, "Resources", "Images", employee.Id.ToString());
                    string imagePathInDB = await SaveImageAsync(employee.Image, employee.Id);
                    employee.Image = imagePathInDB;
                }
                _context.SaveChanges();
                return Ok(employee);
            }catch (Exception ex) { 
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete]
        [Route("DeleteEmployee")]
        public IActionResult DeleteEmployee(Employee employee) {
            try
            {
                _context.Employees.Remove(employee);
                _context.SaveChanges();
                return Ok("Employee Deleted Successfully");
            }
            catch (Exception ex) {
                return BadRequest(ex.Message);
            }
        }

        private async Task<string> SaveImageAsync(string imageBase64, int userId)
        {

            imageBase64= imageBase64.Substring(imageBase64.LastIndexOf(',') + 1);
            byte[] imageBytes = Convert.FromBase64String(imageBase64);
            var fileName = $"{userId}.jpg";
            var filePath = Path.Combine(_hostingEnvironment.WebRootPath, "Resources","Images", fileName);
            //Directory.CreateDirectory(filePath);

            await System.IO.File.WriteAllBytesAsync(filePath, imageBytes);

            return filePath;
        }

    }
}
