using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Domains;
using Backend.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProdutoController : ControllerBase
    {
        ProdutoRepository _repositorio = new ProdutoRepository();

        /// <summary>
        /// Pegamos os produtos cadastrados
        /// </summary>
        /// <returns>Lista de produtos cadastrados</returns>
        [HttpGet]
        public async Task<ActionResult<List<Produto>>> Get()
        {
            var produtos = await _repositorio.Listar();

            if(produtos == null){
                return NotFound(new { mensagem = "Produto não encontrado", Erro = true });
            }

            return produtos;
        }

        /// <summary>
        /// Pegamos um produto de acordo com o ID
        /// </summary>
        /// <param name="id">Passar ID</param>
        /// <returns>Buscar produto por ID</returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<Produto>> Get(int id)
        {
            var produto = await _repositorio.BuscarPorID(id);

            if(produto == null){
                return NotFound(new { mensagem = "Id do Produto não encontrado", Erro = true });
            }
            return produto;
        }

        /// <summary>
        /// Cadastramos um novo produto
        /// </summary>
        /// <param name="produto"></param>
        /// <returns>Cadastro de produto</returns>
        [Authorize(Roles = "Administrador")]
        [HttpPost]
        public async Task<ActionResult<Produto>> Post(Produto produto){
            try{
                await _repositorio.Salvar(produto);
            }catch(DbUpdateConcurrencyException){
                return BadRequest(new { mensagem = "Não foi possivel realizar o cadastro", Erro = true });
            }
            return produto;
        }

        /// <summary>
        /// Alteramos um produto de acordo com o ID
        /// </summary>
        /// <param name="id">Passar ID</param>
        /// <param name="produto">Passar objeto produto</param>
        /// <returns>Alterar produto</returns>
        [Authorize(Roles = "Administrador")]
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, Produto produto){
            if(id != produto.IdProduto){
                return BadRequest();
            }
            try{
                await _repositorio.Alterar(produto);
            }catch(DbUpdateConcurrencyException){
                var produto_valido = await _repositorio.BuscarPorID(id);

                if(produto_valido == null){
                    return NotFound(new { mensagem = "Produto não valido", Erro = true });
                }else{
                    throw;
                }
            }
            return Ok("Não foi possivel realizar o cadastro");
        }

        /// <summary>
        /// Deletamos o produto de acordo com o ID
        /// </summary>
        /// <param name="id">Passar ID</param>
        /// <returns>Deletar produto</returns>
        [Authorize(Roles = "Administrador")]
        [HttpDelete("{id}")]
        public async Task<ActionResult<Produto>> Delete(int id){
            var produto = await _repositorio.BuscarPorID(id);
            if(produto == null){
                return NotFound(new { mensagem = "Produto não encontrado", Erro = true });
            }
            await _repositorio.Excluir(produto);

            return produto;
        }
    }
}