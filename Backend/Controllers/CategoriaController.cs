using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Domains;
using Backend.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    //Definimos nossa rota do controller e dizemos que é um controller de API
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriaController : ControllerBase
    {
        //bdgufosContext _contexto = new bdgufosContext();
        CategoriaRepository _repositorio = new CategoriaRepository();

        // GET: api/Categoria
        /// <summary>
        /// Pegamos todas as categorias cadastradas
        /// </summary>
        /// <returns>Lista de categorias</returns>
        [HttpGet]
        public async Task<ActionResult<List<Categoria>>> Get()
        {
            var categorias = await _repositorio.Listar();

            if(categorias == null){
                return NotFound();
            }

            return categorias;
        }

        // GET: api/Categoria/2
        /// <summary>
        /// Pegamos uma categoria de acordo com o ID
        /// </summary>
        /// <param name="id">Passar ID</param>
        /// <returns>Buscar categoria por ID</returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<Categoria>> Get(int id)
        {
            var categoria = await _repositorio.BuscarPorID(id);

            if(categoria == null){
                return NotFound();
            }

            return categoria;
        }

        //POST api/Categoria
        /// <summary>
        /// Cadastramos uma nova categoria
        /// </summary>
        /// <param name="categoria">Passar objeto categoria</param>
        /// <returns>Cadastro de categoria</returns>
        [HttpPost]
        public async Task<ActionResult<Categoria>> Post(Categoria categoria){
            try{
                await _repositorio.Salvar(categoria);
            }catch(DbUpdateConcurrencyException){
                throw;
            }
            return categoria;
        }

        //Update
        /// <summary>
        /// Alteramos a categoria de acordo com o ID
        /// </summary>
        /// <param name="id">Passar ID</param>
        /// <param name="categoria">Passar objeto categoria</param>
        /// <returns>Alterar uma categoria</returns>
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, Categoria categoria){
            // Se o Id do objeto não existir, ele retorna erro 400
            if(id != categoria.IdCategoria){
                return BadRequest();
            }
            try{
                await _repositorio.Alterar(categoria);
            }catch(DbUpdateConcurrencyException){
                // Verificamos se o objeto inserido realmente existe no banco
                var categoria_valido = await _repositorio.BuscarPorID(id);

                if(categoria_valido == null){
                    return NotFound();
                }else{
                    throw;
                }
            }
            // NoContent = Retorna 204, sem nada
            return NoContent();
        }

        //DELETE api/categoria/id
        /// <summary>
        /// Deletamos uma categoria de acordo com o ID
        /// </summary>
        /// <param name="id">Passar ID</param>
        /// <returns>Deletar categoria</returns>
        [HttpDelete("{id}")]
        public async Task<ActionResult<Categoria>> Delete(int id){
            var categoria = await _repositorio.BuscarPorID(id);
            if(categoria == null){
                return NotFound();
            }

            await _repositorio.Excluir(categoria);

            return categoria;
        }
    }
}