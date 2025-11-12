using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestApiClass7to9TTS.Data;
using RestApiClass7to9TTS.Model;

namespace RestApiClass7to9TTS.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public EmployeeesController(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employeee>>> GetEmployeee()
        {
            return await _context.Employeees.ToListAsync();
        }
        [HttpPost]
        public async Task<ActionResult<Employeee>> PostEmployeee(Employeee employeee)
        {
            _context.Employeees.Add(employeee);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEmployeee", new { id = employeee.ID }, employeee);
        }
        [HttpPut("{id}")] 
        public async Task<IActionResult> PutEmployee(int id, Employeee employeee)
        {
            if (id != employeee.ID)
            {
                return BadRequest();
            }

            _context.Entry(employeee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Employeees.Any(e => e.ID == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var emp = await _context.Employeees.FindAsync(id);
            if(emp == null)
            {
                return NotFound();
            }

            _context.Employeees.Remove(emp);
            await _context.SaveChangesAsync();

            return NoContent();

        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Employeee>> GetByid(int id)
        {
            var emp = await _context.Employeees.FindAsync(id);

            if(emp == null)
            {
                return NotFound();

            }
            return emp;
        }
        private bool EmployeeeExist(int id)
        {
            throw new NotImplementedException();
        }
    }
}
