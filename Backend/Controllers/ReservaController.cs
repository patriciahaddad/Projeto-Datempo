using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers {
   
    [Route ("api/[controller]")]
    [ApiController]
    public class ReservaController : ControllerBase {
        bddatempoContext _contexto = new bddatempoContext ();

        [HttpGet]
        public async Task<ActionResult<List<Reserva>>> Get () {
            var reservas = await _contexto.Reserva.ToListAsync ();

            if (reservas == null) {
                return NotFound ();
            }
            return reservas;
        }
        [HttpGet ("{id}")]
        public async Task<ActionResult<Reserva>> Get (int id) {
            var reserva = await _contexto.Reserva.Include("Usuario").Include("Oferta").FirstOrDefaultAsync(e => e.IdReserva ==id);

            if (reserva == null) {
                return NotFound ();
            }
            return reserva;
        }
        //fim get

        //POST INSERT API/Reserva
        [HttpPost]
        public async Task<ActionResult<Reserva>> Post (Reserva reserva) {
            try {
                //Tratamos contra ataques de SQL INJECTION
                await _contexto.AddAsync (reserva);
                await _contexto.SaveChangesAsync ();
            } catch (DbUpdateConcurrencyException) {
                //Mostra erro
                throw;
            }
            return reserva;
        }
        //fim Post

        //PUT
        [HttpPut ("{id}")]
        public async Task<ActionResult> Put (int id,Reserva reserva) {
            if (id !=reserva.IdReserva) {
                return BadRequest ();
            }
            _contexto.Entry (reserva).State = EntityState.Modified;

            try {
                await _contexto.SaveChangesAsync ();
            } catch (DbUpdateConcurrencyException) {
                var reserva_valido = await _contexto.Reserva.FindAsync (id);

                if (reserva_valido == null) {
                    return NotFound ();
                } else {
                    throw;
                }
            }
            //retorna erro 204
            return NoContent ();
        }

        //DELETE API/Usuario
        [HttpDelete ("{id}")]
        public async Task<ActionResult<Reserva>> Delete (int id) {
            var reserva = await _contexto.Reserva.FindAsync (id);

            if (reserva == null) {
                return NotFound ();
            }

            //Removendo objeto e salva as mudanças
            _contexto.Reserva.Remove (reserva);
            await _contexto.SaveChangesAsync ();

            return reserva;
        }
    }
}