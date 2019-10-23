using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers {

    [Route ("api/[controller]")]
    [ApiController]
    public class ProdutoController : ControllerBase {
        bddatempoContext _contexto = new bddatempoContext ();

        [HttpGet]
        public async Task<ActionResult<List<Produto>>> Get () {
            var produtos = await _contexto.Produto.ToListAsync ();

            if (produtos == null) {
                return NotFound ();
            }
            return produtos;
        }

        [HttpGet ("{id}")]
        public async Task<ActionResult<Produto>> Get (int id) {
            var produto = await _contexto.Produto.Include ("Categoria").FirstAsync ();

            if (produto == null) {
                return NotFound ();
            }
            return produto;
        }
        //fim get

        //POST INSERT API/Produto
        [HttpPost]
        public async Task<ActionResult<Produto>> Post (Produto produto) {
            try {
                //Tratamos contra ataques de SQL INJECTION
                await _contexto.AddAsync (produto);
                await _contexto.SaveChangesAsync ();
            } catch (DbUpdateConcurrencyException) {
                //Mostra erro
                throw;
            }
            return produto;
        }
        //fim Post

        //PUT
        [HttpPut ("{id}")]
        public async Task<ActionResult> Put (int id, Produto produto) {
            if (id != produto.IdProduto) {
                return BadRequest ();
            }
            _contexto.Entry (produto).State = EntityState.Modified;

            try {
                await _contexto.SaveChangesAsync ();
            } catch (DbUpdateConcurrencyException) {
                var produto_valido = await _contexto.Produto.FindAsync (id);

                if (produto_valido == null) {
                    return NotFound ();
                } else {
                    throw;
                }
            }
            //retorna erro 204
            return NoContent ();
        }

        //DELETE API
        [HttpDelete ("{id}")]
        public async Task<ActionResult<Produto>> Delete (int id) {
            var produto = await _contexto.Produto.FindAsync (id);

            if (produto == null) {
                return NotFound ();
            }

            //Removendo objeto e salva as mudanças
            _contexto.Produto.Remove (produto);
            await _contexto.SaveChangesAsync ();

            return produto;
        }
    }
}