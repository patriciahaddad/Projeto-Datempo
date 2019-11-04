using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Domains;
using Backend.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    //Definimos nossa rota do controller e dizemos que é um controller de API
    [Route("api/[controller]")]
    [ApiController]
    public class EnderecoController : ControllerBase
    {
       // bddatempoContext _repositorio = new bddatempoContext();

        EnderecoRepository _repositorio = new EnderecoRepository();

        // GET: api/Endereco
        /// <summary>
        /// Lista todos Endereços salvos
        /// </summary>
        /// <returns>Endereço salvos</returns>
        [HttpGet]
        public async Task<ActionResult<List<Endereco>>> Get()
        {
            var enderecos = await _repositorio.Listar();

            if(enderecos == null){
                return NotFound();
            }

            return enderecos;
        }
        // GET: api/Endereco/2
        /// <summary>
        /// Lista os Endereco por id
        /// </summary>
        /// <param name="id">Id, número identificador inteiro pré-determinado</param>
        /// <returns>Endereco solicitados</returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<Endereco>> Get(int id)
        {
            var endereco = await _repositorio.BuscarPorID(id);

            if(endereco == null){
                return NotFound();
            }

            return endereco;
        }

        //POST api/Endereco
        /// <summary>
        /// Adiciona endereco
        /// </summary>
        /// <param name="endereco">string endereco</param>
        /// <returns>mensagem de endereco salvo</returns>
        [HttpPost]
        public async Task<ActionResult<Endereco>> Post(Endereco endereco){
            try{
                await _repositorio.Salvar(endereco);
            }catch(DbUpdateConcurrencyException){
                throw;
            }
            return endereco;
        }

        //Update
        /// <summary>
        /// Altera endereco por id
        /// </summary>
        /// <param name="id">Id, número identificador inteiro pré-determinado</param>
        /// <param name="endereco">string endereco</param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, Endereco endereco){
            // Se o Id do objeto não existir, ele retorna erro 400
            if(id != endereco.IdEndereco){
                return BadRequest();
            }
            try{
                await _repositorio.Alterar(endereco);
            }catch(DbUpdateConcurrencyException){
                // Verificamos se o objeto inserido realmente existe no banco
                var endereco_valido = await _repositorio.BuscarPorID(id);

                if(endereco_valido == null){
                    return NotFound();
                }else{
                    throw;
                }
            }
            // NoContent = Retorna 204, sem nada
            return NoContent();
        }

        //DELETE api/endereco/id
        /// <summary>
        /// Deleta endereco por id
        /// </summary>
        /// <param name="id">Id, número identificador inteiro pré-determinado</param>
        /// <returns>Mensagem de exclusão de endereco</returns>
        [HttpDelete("{id}")]
        public async Task<ActionResult<Endereco>> Delete(int id){
            var endereco = await _repositorio.BuscarPorID(id);
            if(endereco == null){
                return NotFound();
            }
            await _repositorio.Excluir(endereco);

            return endereco;
        }
    }
}