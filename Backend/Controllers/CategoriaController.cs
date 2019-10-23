using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers {
   
    [Route ("api/[controller]")]
    [ApiController]
    public class CategoriaController : ControllerBase {
        bddatempoContext _contexto = new bddatempoContext ();

        [HttpGet]
        public async Task<ActionResult<List<Categoria>>> Get () {
            var categorias = await _contexto.Categoria.ToListAsync ();

            if (categorias == null) {
                return NotFound ();
            }
            return categorias;
        }
        [HttpGet ("{id}")]
        public async Task<ActionResult<Categoria>> Get (int id) {
            var categoria = await _contexto.Categoria.FindAsync(id);

            if (categoria == null) {
                return NotFound ();
            }
            return categoria;
        }
        //fim get

        //POST INSERT API/Categoria
        [HttpPost]
        public async Task<ActionResult<Categoria>> Post (Categoria categoria) {
            try {
                //Tratamos contra ataques de SQL INJECTION
                await _contexto.AddAsync (categoria);
                await _contexto.SaveChangesAsync ();
            } catch (DbUpdateConcurrencyException) {
                //Mostra erro
                throw;
            }
            return categoria;
        }
        //fim Post

        //PUT
        [HttpPut ("{id}")]
        public async Task<ActionResult> Put (int id,Categoria categoria) {
            if (id !=categoria.IdCategoria) {
                return BadRequest ();
            }
            _contexto.Entry (categoria).State = EntityState.Modified;

            try {
                await _contexto.SaveChangesAsync ();
            } catch (DbUpdateConcurrencyException) {
                var categoria_valido = await _contexto.Categoria.FindAsync (id);

                if (categoria_valido == null) {
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
        public async Task<ActionResult<Usuario>> Delete (int id) {
            var categoria = await _contexto.Usuario.FindAsync (id);

            if (categoria == null) {
                return NotFound ();
            }

            //Removendo objeto e salva as mudanças
            _contexto.Usuario.Remove (categoria);
            await _contexto.SaveChangesAsync ();

            return categoria;
        }
    }
}