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
    public class EnderecoController : ControllerBase
    {
        bddatempoContext _contexto = new bddatempoContext();

        // GET: api/Endereco
        [HttpGet]
        public async Task<ActionResult<List<Endereco>>> Get()
        {
            var enderecos = await _contexto.Endereco.Include("IdUsuarioNavigation").ToListAsync();

            if(enderecos == null){
                return NotFound();
            }

            return enderecos;
        }
        // GET: api/Endereco/2
        [HttpGet("{id}")]
        public async Task<ActionResult<Endereco>> Get(int id)
        {
            var endereco = await _contexto.Endereco.Include("IdUsuarioNavigation").FirstOrDefaultAsync(u => u.IdUsuario == id);

            if(endereco == null){
                return NotFound();
            }

            return endereco;
        }

        //
        //POST api/Endereco
        [HttpPost]
        public async Task<ActionResult<Endereco>> Post(Endereco endereco){
            try{
                // Tratamos contra ataques de SQL Injection
                await _contexto.AddAsync(endereco);
                // Salvamos efetivamente o nosso objeto no banco
                await _contexto.SaveChangesAsync();
            }catch(DbUpdateConcurrencyException){
                throw;
            }
            return endereco;
        }

        //Update
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, Endereco endereco){
            // Se o Id do objeto não existir, ele retorna erro 400
            if(id != endereco.IdEndereco){
                return BadRequest();
            }
            //Comparamos os atributos que foram modificados através do EF
            _contexto.Entry(endereco).State = EntityState.Modified;

            try{
                await _contexto.SaveChangesAsync();
            }catch(DbUpdateConcurrencyException){
                // Verificamos se o objeto inserido realmente existe no banco
                var endereco_valido = await _contexto.Endereco.FindAsync(id);

                if(endereco_valido == null){
                    return NotFound();
                }else{
                    throw;
                }
            }
            // NoContent = Retorna 204, sem nada
            return NoContent();
        }

        //DELETE api/endereco/id
        [HttpDelete("{id}")]
        public async Task<ActionResult<Endereco>> Delete(int id){
            var endereco = await _contexto.Endereco.FindAsync(id);
            if(endereco == null){
                return NotFound();
            }

            _contexto.Endereco.Remove(endereco);
            await _contexto.SaveChangesAsync();

            return endereco;
        }
    }
}