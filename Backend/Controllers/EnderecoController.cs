using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Domains;
using Backend.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers {
    //Definimos nossa rota do controller e dizemos que é um controller de API
    [Route ("api/[controller]")]
    [ApiController]
    public class EnderecoController : ControllerBase {
        EnderecoRepository _repositorio = new EnderecoRepository ();

        /// <summary>
        /// Pegamos todos os endereços cadastrados
        /// </summary>
        /// <returns>Lista de endereços</returns>
        [HttpGet]
        public async Task<ActionResult<List<Endereco>>> Get () {
            var enderecos = await _repositorio.Listar ();

            if (enderecos == null) {
                return NotFound (new { mensagem = "Endereco não encontrado", Erro = true });
            }
            return enderecos;
        }

        /// <summary>
        /// Pegamos um endereço de acordo com o ID
        /// </summary>
        /// <param name="id">Passar ID</param>
        /// <returns>Buscar endereço por ID</returns>
        [HttpGet ("{id}")]
        public async Task<ActionResult<Endereco>> Get (int id) {
            var endereco = await _repositorio.BuscarPorID (id);

            if (endereco == null) {
                return NotFound (new { mensagem = "Id do Endereco não encontrado", Erro = true });
            }

            return endereco;
        }

        /// <summary>
        /// Cadastramos um novo endereço
        /// </summary>
        /// <param name="endereco">Passar objeto endereço</param>
        /// <returns>Cadastro de endereço</returns>
        [HttpPost]
        public async Task<ActionResult<Endereco>> Post (Endereco endereco) {
            try {
                await _repositorio.Salvar (endereco);
            } catch (DbUpdateConcurrencyException) {
                return BadRequest (new { mensagem = "Não foi possivel realizar o cadastro", Erro = true });
            }
            return endereco;
        }

        /// <summary>
        /// Alteramos o endereço de acordo com o ID
        /// </summary>
        /// <param name="id">Passar ID</param>
        /// <param name="endereco">Passar objeto endereço</param>
        /// <returns>Alterar um endereço</returns>
        [HttpPut ("{id}")]
        public async Task<ActionResult> Put (int id, Endereco endereco) {

            if (id != endereco.IdEndereco) {
                return BadRequest (new{mensagem = "Id do Endereco não encontrado", Erro = true});
            }
            try {
                await _repositorio.Alterar (endereco);
            } catch (DbUpdateConcurrencyException) {
                var endereco_valido = await _repositorio.BuscarPorID (id);

                if (endereco_valido == null) {
                    return NotFound (new{mensagem = "Endereco não valido", Erro = true});
                } else {
                    throw;
                }
            }
            return Ok("Endereco Atualizado com sucesso");
        }

        /// <summary>
        /// Deletamos um endereço de acordo com o ID
        /// </summary>
        /// <param name="id">Passar ID</param>
        /// <returns>Deletar endereço</returns>
        [HttpDelete ("{id}")]
        public async Task<ActionResult<Endereco>> Delete (int id) {
            var endereco = await _repositorio.BuscarPorID (id);
            if (endereco == null) {
                return NotFound (new{mensagem = "Endereco não encontrado", Erro = true});
            }
            await _repositorio.Excluir (endereco);

            return endereco;
        }
    }
}