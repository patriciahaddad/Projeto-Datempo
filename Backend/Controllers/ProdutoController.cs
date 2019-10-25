using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    //Definimos nossa rota do controller e dizemos que é um controller de API
    [Route("api/[controller]")]
    [ApiController]
    public class ProdutoController : ControllerBase
    {
        bddatempoContext _contexto = new bddatempoContext();

        // GET: api/Produto
        [HttpGet]
        public async Task<ActionResult<List<Produto>>> Get()
        {
            var produtos = await _contexto.Produto.Include("IdCategoriaNavigation").ToListAsync();

            if(produtos == null){
                return NotFound();
            }

            return produtos;
        }
        // GET: api/Produto/2
        [HttpGet("{id}")]
        public async Task<ActionResult<Produto>> Get(int id)
        {
            var produto = await _contexto.Produto.Include("IdCategoriaNavigation").FirstOrDefaultAsync(p => p.IdProduto == id);

            if(produto == null){
                return NotFound();
            }

            return produto;
        }

        //
        //POST api/Produto
        [Authorize(Roles = "Administrador")]
        [HttpPost]
        public async Task<ActionResult<Produto>> Post(Produto produto){
            try{
                // Tratamos contra ataques de SQL Injection
                await _contexto.AddAsync(produto);
                // Salvamos efetivamente o nosso objeto no banco
                await _contexto.SaveChangesAsync();
            }catch(DbUpdateConcurrencyException){
                throw;
            }
            return produto;
        }

        //Update
        [Authorize(Roles = "Administrador")]
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, Produto produto){
            // Se o Id do objeto não existir, ele retorna erro 400
            if(id != produto.IdProduto){
                return BadRequest();
            }
            //Comparamos os atributos que foram modificados através do EF
            _contexto.Entry(produto).State = EntityState.Modified;

            try{
                await _contexto.SaveChangesAsync();
            }catch(DbUpdateConcurrencyException){
                // Verificamos se o objeto inserido realmente existe no banco
                var produto_valido = await _contexto.Produto.FindAsync(id);

                if(produto_valido == null){
                    return NotFound();
                }else{
                    throw;
                }
            }
            // NoContent = Retorna 204, sem nada
            return NoContent();
        }

        //DELETE api/produto/id
        [Authorize(Roles = "Administrador")]
        [HttpDelete("{id}")]
        public async Task<ActionResult<Produto>> Delete(int id){
            var produto = await _contexto.Produto.FindAsync(id);
            if(produto == null){
                return NotFound();
            }

            _contexto.Produto.Remove(produto);
            await _contexto.SaveChangesAsync();

            return produto;
        }
    }
}