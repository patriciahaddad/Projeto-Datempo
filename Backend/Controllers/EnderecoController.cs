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
        // bddatempoContext _repositorio = new bddatempoContext();

        EnderecoRepository _repositorio = new EnderecoRepository ();

        // GET: api/Endereco
        // GET: api/Endereco
        /// <summary>
        /// Pegamos todos os endereços cadastrados
        /// </summary>
        /// <returns>Lista de endereços</returns>
        [HttpGet]
        public async Task<ActionResult<List<Endereco>>> Get () {
            var enderecos = await _repositorio.Listar ();

            if (enderecos == null) {
                return NotFound ();
            }

            return enderecos;
        }

        // GET: api/Endereco/2

        /// <summary>
        /// Pegamos um endereço de acordo com o ID
        /// </summary>
        /// <param name="id">Passar ID</param>
        /// <returns>Buscar endereço por ID</returns>
        [HttpGet ("{id}")]
        public async Task<ActionResult<Endereco>> Get (int id) {
            var endereco = await _repositorio.BuscarPorID (id);

            if (endereco == null) {
                return NotFound ();
            }

            return endereco;
        }

        //POST api/Endereco
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
                throw;
            }
            return endereco;
        }

        //Update
        /// <summary>
        /// Alteramos o endereço de acordo com o ID
        /// </summary>
        /// <param name="id">Passar ID</param>
        /// <param name="endereco">Passar objeto endereço</param>
        /// <returns>Alterar um endereço</returns>
        [HttpPut ("{id}")]
        public async Task<ActionResult> Put (int id, Endereco endereco) {

            // Se o Id do objeto não existir, ele retorna erro 400
            if (id != endereco.IdEndereco) {
                return BadRequest ();
            }
            try {
                await _repositorio.Alterar (endereco);
            } catch (DbUpdateConcurrencyException) {
                // Verificamos se o objeto inserido realmente existe no banco
                var endereco_valido = await _repositorio.BuscarPorID (id);

                if (endereco_valido == null) {
                    return NotFound ();
                } else {
                    throw;
                }
            }
            // NoContent = Retorna 204, sem nada
            return NoContent ();
        }

        //DELETE api/endereco/id
        /// <summary>
        /// Deletamos um endereço de acordo com o ID
        /// </summary>
        /// <param name="id">Passar ID</param>
        /// <returns>Deletar endereço</returns>
        [HttpDelete ("{id}")]
        public async Task<ActionResult<Endereco>> Delete (int id) {
            var endereco = await _repositorio.BuscarPorID (id);
            if (endereco == null) {
                return NotFound ();

            }
            await _repositorio.Excluir (endereco);

            return endereco;
        }
    }
}