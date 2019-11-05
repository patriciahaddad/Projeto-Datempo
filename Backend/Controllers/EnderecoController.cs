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
        [HttpGet]
        public async Task<ActionResult<List<Endereco>>> Get () {
            var enderecos = await _repositorio.Listar ();

            if (enderecos == null) {
                return NotFound ();
            }

            return enderecos;
        }
        // GET: api/Endereco/2
        [HttpGet ("{id}")]
        public async Task<ActionResult<Endereco>> Get (int id) {
            var endereco = await _repositorio.BuscarPorID (id);

            if (endereco == null) {
                return NotFound ();
            }

            return endereco;
        }

        //
        //POST api/Endereco
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