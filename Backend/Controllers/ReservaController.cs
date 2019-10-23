using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    //Definimos nossa rota do controller e dizemos que é um controller de API
    [Route("api/[controller]")]
    [ApiController]
    public class ReservaController : ControllerBase
    {
        bddatempoContext _contexto = new bddatempoContext();

        // GET: api/Reserva
        [HttpGet]
        public async Task<ActionResult<List<Reserva>>> Get()
        {
            var reservas = await _contexto.Reserva.Include("IdUsuarioNavigation").Include("IdOfertaNavigation").ToListAsync();

            if(reservas == null){
                return NotFound();
            }

            return reservas;
        }
        // GET: api/Reserva/2
        [HttpGet("{id}")]
        public async Task<ActionResult<Reserva>> Get(int id)
        {
            var reserva = await _contexto.Reserva.Include("IdUsuarioNavigation").Include("IdOfertaNavigation").FirstOrDefaultAsync(r => r.IdReserva == id);

            if(reserva == null){
                return NotFound();
            }

            return reserva;
        }

        //
        //POST api/Reserva
        [HttpPost]
        public async Task<ActionResult<Reserva>> Post(Reserva reserva){
            try{
                // Tratamos contra ataques de SQL Injection
                await _contexto.AddAsync(reserva);
                // Salvamos efetivamente o nosso objeto no banco
                await _contexto.SaveChangesAsync();
            }catch(DbUpdateConcurrencyException){
                throw;
            }
            return reserva;
        }

        //Update
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, Reserva reserva){
            // Se o Id do objeto não existir, ele retorna erro 400
            if(id != reserva.IdReserva){
                return BadRequest();
            }
            //Comparamos os atributos que foram modificados através do EF
            _contexto.Entry(reserva).State = EntityState.Modified;

            try{
                await _contexto.SaveChangesAsync();
            }catch(DbUpdateConcurrencyException){
                // Verificamos se o objeto inserido realmente existe no banco
                var reserva_valido = await _contexto.Reserva.FindAsync(id);

                if(reserva_valido == null){
                    return NotFound();
                }else{
                    throw;
                }
            }
            // NoContent = Retorna 204, sem nada
            return NoContent();
        }

        //DELETE api/reserva/id
        [HttpDelete("{id}")]
        public async Task<ActionResult<Reserva>> Delete(int id){
            var reserva = await _contexto.Reserva.FindAsync(id);
            if(reserva == null){
                return NotFound();
            }

            _contexto.Reserva.Remove(reserva);
            await _contexto.SaveChangesAsync();

            return reserva;
        }
    }
}