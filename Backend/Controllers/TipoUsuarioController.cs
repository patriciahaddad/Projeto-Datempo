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
    public class TipousuarioController : ControllerBase
    {
        //bddatempoContext _repositorio = new bddatempoContext();

        TipousuarioRepository _repositorio = new TipousuarioRepository();

        // GET: api/Tipousuario
        /// <summary>
        /// Lista todos tipos de usuarios salvos
        /// </summary>
        /// <returns>Tipos de usuarios salvos</returns>
        [HttpGet]
        public async Task<ActionResult<List<Tipousuario>>> Get()
        {
            var tipousuarios = await _repositorio.Listar();

            if(tipousuarios == null){
                return NotFound();
            }

            return tipousuarios;
        }
        
        
        // GET: api/Tipousuario/2
        /// <summary>
        /// Lista os tipos de usuarios por id
        /// </summary>
        /// <param name="id">Id, número identificador inteiro pré-determinado</param>
        /// <returns>Tipos de usuarios solicitados</returns>
        [HttpGet("{id}")]
        public async Task<ActionResult<Tipousuario>> Get(int id)
        {
            var tipousuario = await _repositorio.BuscarPorID(id);

            if(tipousuario == null){
                return NotFound();
            }

            return tipousuario;
        }

        //POST api/Tipousuario
        /// <summary>
        /// Adiciona tipos de usuarios
        /// </summary>
        /// <param name="tipousuario">string tipousuario</param>
        /// <returns>mensagem de tipo de usuarios salvo</returns>
        [HttpPost]
        public async Task<ActionResult<Tipousuario>> Post(Tipousuario tipousuario){
            try{
                await _repositorio.Salvar(tipousuario);
            }catch(DbUpdateConcurrencyException){
                throw;
            }
            return tipousuario;
        }

        //Update
        /// <summary>
        /// Altera tipos de usuarios por id
        /// </summary>
        /// <param name="id">Id, número identificador inteiro pré-determinado</param>
        /// <param name="tipousuario">string tipousuario</param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, Tipousuario tipousuario){
            // Se o Id do objeto não existir, ele retorna erro 400
            if(id != tipousuario.IdTipoUsuario){
                return BadRequest();
            }
            try{
                await _repositorio.Alterar(tipousuario);
            }catch(DbUpdateConcurrencyException){
                // Verificamos se o objeto inserido realmente existe no banco
                var tipousuario_valido = await _repositorio.BuscarPorID(id);

                if(tipousuario_valido == null){
                    return NotFound();
                }else{
                    throw;
                }
            }
            // NoContent = Retorna 204, sem nada
            return NoContent();
        }

        //DELETE api/tipousuario/id
        /// <summary>
        /// Deleta tipos de usuarios por id
        /// </summary>
        /// <param name="id">Id, número identificador inteiro pré-determinado</param>
        /// <returns>Mensagem de exclusão de tipo de usuario</returns>
        [HttpDelete("{id}")]
        public async Task<ActionResult<Tipousuario>> Delete(int id){
            var tipousuario = await _repositorio.BuscarPorID(id);
            if(tipousuario == null){
                return NotFound();
            }
            await _repositorio.Excluir(tipousuario);

            return tipousuario;
        }
    }
}