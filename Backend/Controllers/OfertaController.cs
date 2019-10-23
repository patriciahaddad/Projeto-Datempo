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
    public class OfertaController : ControllerBase
    {
        bddatempoContext _contexto = new bddatempoContext();

        // GET: api/Oferta
        [HttpGet]
        public async Task<ActionResult<List<Oferta>>> Get()
        {
            var ofertas = await _contexto.Oferta.Include("IdUsuarioNavigation").Include("IdProdutoNavigation").ToListAsync();

            if(ofertas == null){
                return NotFound();
            }

            return ofertas;
        }
        // GET: api/Oferta/2
        [HttpGet("{id}")]
        public async Task<ActionResult<Oferta>> Get(int id)
        {
            var oferta = await _contexto.Oferta.Include("IdUsuarioNavigation").Include("IdProdutoNavigation").FirstOrDefaultAsync(o => o.IdOferta == id);

            if(oferta == null){
                return NotFound();
            }

            return oferta;
        }

        //
        //POST api/Oferta
        [HttpPost]
        public async Task<ActionResult<Oferta>> Post(Oferta oferta){
            try{
                // Tratamos contra ataques de SQL Injection
                await _contexto.AddAsync(oferta);
                // Salvamos efetivamente o nosso objeto no banco
                await _contexto.SaveChangesAsync();
            }catch(DbUpdateConcurrencyException){
                throw;
            }
            return oferta;
        }

        //Update
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, Oferta oferta){
            // Se o Id do objeto não existir, ele retorna erro 400
            if(id != oferta.IdOferta){
                return BadRequest();
            }
            //Comparamos os atributos que foram modificados através do EF
            _contexto.Entry(oferta).State = EntityState.Modified;

            try{
                await _contexto.SaveChangesAsync();
            }catch(DbUpdateConcurrencyException){
                // Verificamos se o objeto inserido realmente existe no banco
                var oferta_valido = await _contexto.Oferta.FindAsync(id);

                if(oferta_valido == null){
                    return NotFound();
                }else{
                    throw;
                }
            }
            // NoContent = Retorna 204, sem nada
            return NoContent();
        }

        //DELETE api/oferta/id
        [HttpDelete("{id}")]
        public async Task<ActionResult<Oferta>> Delete(int id){
            var oferta = await _contexto.Oferta.FindAsync(id);
            if(oferta == null){
                return NotFound();
            }

            _contexto.Oferta.Remove(oferta);
            await _contexto.SaveChangesAsync();

            return oferta;
        }
    }
}