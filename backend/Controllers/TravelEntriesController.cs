using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TravelEntriesController : ControllerBase
    {
        private readonly AppDbContext _db;
        public TravelEntriesController(AppDbContext db) => _db = db;

        // GET: api/travelentries
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TravelEntry>>> GetAll() =>
            Ok(await _db.TravelEntries.ToListAsync());

        // GET: api/travelentries/{id}
        [HttpGet("{id:int}")]
        public async Task<ActionResult<TravelEntry>> Get(int id)
        {
            var entry = await _db.TravelEntries.FindAsync(id);
            return entry == null ? NotFound() : Ok(entry);
        }

        // POST: api/travelentries
        [HttpPost]
        public async Task<ActionResult<TravelEntry>> Create(TravelEntry entry)
        {
            _db.TravelEntries.Add(entry);
            await _db.SaveChangesAsync();
            return CreatedAtAction(nameof(Get), new { id = entry.ID }, entry);
        }

        // PUT: api/travelentries/{id}
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, TravelEntry entry)
        {
            var existing = await _db.TravelEntries.FindAsync(id);
            if (existing == null) return NotFound();

            existing.Location    = entry.Location;
            existing.Date        = entry.Date;
            existing.Description = entry.Description;
            existing.Photos      = entry.Photos;

            await _db.SaveChangesAsync();
            return NoContent();
        }

        // DELETE: api/travelentries/{id}
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var entry = await _db.TravelEntries.FindAsync(id);
            if (entry == null) return NotFound();

            _db.TravelEntries.Remove(entry);
            await _db.SaveChangesAsync();
            return NoContent();
        }
    }
}
