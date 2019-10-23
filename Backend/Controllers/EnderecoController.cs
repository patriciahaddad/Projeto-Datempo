using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers {

    [Route ("api/[controller]")]
    [ApiController]
    public class EnderecoController : ControllerBase {
        bddatempoContext _contexto = new bddatempoContext ();

        [HttpGet]
        public async Task<ActionResult<List<Endereco>>> Get () {
            var enderecos = await _contexto.Endereco.ToListAsync ();

            if (enderecos == null) {
                return NotFound ();
            }
            return enderecos;
        }

        [HttpGet ("{id}")]
        public async Task<ActionResult<Endereco>> Get (int id) {
            var endereco = await _contexto.Endereco.Include ("Usuario").FirstAsync ();

            if (endereco == null) {
                return NotFound ();
            }
            return endereco;
        }
        //fim get

        //POST INSERT API/Endereco
        [HttpPost]
        public async Task<ActionResult<Endereco>> Post (Endereco endereco) {
            try {
                //Tratamos contra ataques de SQL INJECTION
                await _contexto.AddAsync (endereco);
                await _contexto.SaveChangesAsync ();
            } catch (DbUpdateConcurrencyException) {
                //Mostra erro
                throw;
            }
            return endereco;
        }
        //fim Post

        //PUT
        [HttpPut ("{id}")]
        public async Task<ActionResult> Put (int id, Endereco endereco) {
            if (id != endereco.IdEndereco) {
                return BadRequest ();
            }
            _contexto.Entry (endereco).State = EntityState.Modified;

            try {
                await _contexto.SaveChangesAsync ();
            } catch (DbUpdateConcurrencyException) {
                var endereco_valido = await _contexto.Endereco.FindAsync (id);

                if (endereco_valido == null) {
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
        public async Task<ActionResult<Endereco>> Delete (int id) {
            var endereco = await _contexto.Endereco.FindAsync (id);

            if (endereco == null) {
                return NotFound ();
            }

            //Removendo objeto e salva as mudanças
            _contexto.Endereco.Remove (endereco);
            await _contexto.SaveChangesAsync ();

            return endereco;
        }
    }
}