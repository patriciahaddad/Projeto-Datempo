using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Domains;
using Backend.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers {
    [Route ("api/[controller]")]
    [ApiController]
    public class CategoriaController : ControllerBase {
        CategoriaRepository _repositorio = new CategoriaRepository ();

        /// <summary>
        /// Pegamos todas as categorias cadastradas
        /// </summary>
        /// <returns>Lista de categorias</returns>
        [HttpGet]
        public async Task<ActionResult<List<Categoria>>> Get () {
            var categorias = await _repositorio.Listar ();

            if (categorias == null) {
                return NotFound (new { mensagem = "Categoria não encontrada", Erro = true });
            }

            return categorias;
        }

        /// <summary>
        /// Pegamos uma categoria de acordo com o ID
        /// </summary>
        /// <param name="id">Passar ID</param>
        /// <returns>Buscar categoria por ID</returns>
        [HttpGet ("{id}")]
        public async Task<ActionResult<Categoria>> Get (int id) {
            var categoria = await _repositorio.BuscarPorID (id);

            if (categoria == null) {
                return NotFound (new { mensagem = "Id da Categoria não encontrada", Erro = true });
            }

            return categoria;
        }

        /// <summary>
        /// Cadastramos uma nova categoria
        /// </summary>
        /// <param name="categoria">Passar objeto categoria</param>
        /// <returns>Cadastro de categoria</returns>
        [HttpPost]
        public async Task<ActionResult<Categoria>> Post (Categoria categoria) {
            try {
                await _repositorio.Salvar (categoria);
            } catch (DbUpdateConcurrencyException) {
                return BadRequest (new { mensagem = "Não foi possivel realizar o cadastro", Erro = true });
            }
            return categoria;
        }

        /// <summary>
        /// Alteramos a categoria de acordo com o ID
        /// </summary>
        /// <param name="id">Passar ID</param>
        /// <param name="categoria">Passar objeto categoria</param>
        /// <returns>Alterar uma categoria</returns>
        [HttpPut ("{id}")]
        public async Task<ActionResult> Put (int id, Categoria categoria) {
            if (id != categoria.IdCategoria) {
                return BadRequest (new { mensagem = "Categoria não encontrada", Erro = true });
            }
            try {
                await _repositorio.Alterar (categoria);
            } catch (DbUpdateConcurrencyException) {
                var categoria_valido = await _repositorio.BuscarPorID (id);

                if (categoria_valido == null) {
                    return NotFound (new { mensagem = "Categoria não valida", Erro = true });
                } else {
                    throw;
                }
            }
            return Ok ("Categoria Atualizado com sucesso");
        }

        /// <summary>
        /// Deletamos uma categoria de acordo com o ID
        /// </summary>
        /// <param name="id">Passar ID</param>
        /// <returns>Deletar categoria</returns>
        [HttpDelete ("{id}")]
        public async Task<ActionResult<Categoria>> Delete (int id) {
            var categoria = await _repositorio.BuscarPorID (id);
            if (categoria == null) {
                return NotFound (new { mensagem = "Categoria não encontrada", Erro = true });
            }

            await _repositorio.Excluir (categoria);

            return categoria;
        }
    }
}