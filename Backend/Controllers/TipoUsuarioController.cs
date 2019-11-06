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
        /// Pegamos os tipos de usuário cadastrados
        /// </summary>
        /// <returns>Lista de tipos de usuário cadastrados</returns>
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
        /// Pegamos os tipos de usuário de acordo com o ID
        /// </summary>
        /// <param name="id">Passar ID</param>
        /// <returns>Buscar tipo de usuário por ID</returns>
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
        /// Cadastramos um novo tipo de usuário
        /// </summary>
        /// <param name="tipousuario">Passar objeto tipousuario</param>
        /// <returns>Cadastrar tipo de usuário</returns>
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
        /// Alteramos um tipo de usuário de acordo com o ID
        /// </summary>
        /// <param name="id">Passar ID</param>
        /// <param name="tipousuario">Passar objeto tipousuario</param>
        /// <returns>Alterar tipo usuário</returns>
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
        /// Deletamos um tipo de usuário de acordo com o ID
        /// </summary>
        /// <param name="id">Passar ID</param>
        /// <returns>Deletar tipo de usuário</returns>
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