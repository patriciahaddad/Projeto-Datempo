using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers {

    [Route ("api/[controller]")]
    [ApiController]
    public class OfertaController : ControllerBase {
        bddatempoContext _contexto = new bddatempoContext ();

        [HttpGet]
        public async Task<ActionResult<List<Oferta>>> Get () {
            var ofertas = await _contexto.Oferta.ToListAsync ();

            if (ofertas == null) {
                return NotFound ();
            }
            return ofertas;
        }

        [HttpGet ("{id}")]
        public async Task<ActionResult<Oferta>> Get (int id) {
            var oferta = await _contexto.Oferta.Include ("Usuario").Include ("Produto").FirstOrDefaultAsync (e => e.IdOferta == id);

            if (oferta == null) {
                return NotFound ();
            }
            return oferta;
        }
        //fim get

        //POST INSERT API/Oferta
        [HttpPost]
        public async Task<ActionResult<Oferta>> Post (Oferta oferta) {
            try {
                //Tratamos contra ataques de SQL INJECTION
                await _contexto.AddAsync (oferta);
                await _contexto.SaveChangesAsync ();
            } catch (DbUpdateConcurrencyException) {
                //Mostra erro
                throw;
            }
            return oferta;
        }
        //fim Post

        //PUT
        [HttpPut ("{id}")]
        public async Task<ActionResult> Put (int id, Oferta oferta) {
            if (id != oferta.IdOferta) {
                return BadRequest ();
            }
            _contexto.Entry (oferta).State = EntityState.Modified;

            try {
                await _contexto.SaveChangesAsync ();
            } catch (DbUpdateConcurrencyException) {
                var oferta_valido = await _contexto.Oferta.FindAsync (id);

                if (oferta_valido == null) {
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
        public async Task<ActionResult<Oferta>> Delete (int id) {
            var oferta = await _contexto.Oferta.FindAsync (id);

            if (oferta == null) {
                return NotFound ();
            }

            //Removendo objeto e salva as mudanças
            _contexto.Oferta.Remove (oferta);
            await _contexto.SaveChangesAsync ();

            return oferta;
        }
    }
}