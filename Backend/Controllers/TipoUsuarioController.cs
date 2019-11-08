using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Domains;
using Backend.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers {
    [Route ("api/[controller]")]
    [ApiController]
    public class TipousuarioController : ControllerBase {
        TipousuarioRepository _repositorio = new TipousuarioRepository ();

        /// <summary>
        /// Pegamos os tipos de usuário cadastrados
        /// </summary>
        /// <returns>Lista de tipos de usuário cadastrados</returns>
        [HttpGet]
        public async Task<ActionResult<List<Tipousuario>>> Get () {
            var tipousuarios = await _repositorio.Listar ();

            if (tipousuarios == null) {
                return NotFound (new { mensagem = "Tipo de usuario não encontrada", Erro = true });
            }

            return tipousuarios;
        }

        /// <summary>
        /// Pegamos os tipos de usuário de acordo com o ID
        /// </summary>
        /// <param name="id">Passar ID</param>
        /// <returns>Buscar tipo de usuário por ID</returns>
        [HttpGet ("{id}")]
        public async Task<ActionResult<Tipousuario>> Get (int id) {
            var tipousuario = await _repositorio.BuscarPorID (id);

            if (tipousuario == null) {
                return NotFound (new { mensagem = "Id do Tipo usuario não encontrada", Erro = true });
            }

            return tipousuario;
        }

        /// <summary>
        /// Cadastramos um novo tipo de usuário
        /// </summary>
        /// <param name="tipousuario">Passar objeto tipousuario</param>
        /// <returns>Cadastrar tipo de usuário</returns>
        [HttpPost]
        public async Task<ActionResult<Tipousuario>> Post (Tipousuario tipousuario) {
            try {
                await _repositorio.Salvar (tipousuario);
            } catch (DbUpdateConcurrencyException) {
                return BadRequest (new { mensagem = "Não foi possivel realizar o cadastro de tipo de usuario", Erro = true });
            }
            return tipousuario;
        }

        /// <summary>
        /// Alteramos um tipo de usuário de acordo com o ID
        /// </summary>
        /// <param name="id">Passar ID</param>
        /// <param name="tipousuario">Passar objeto tipousuario</param>
        /// <returns>Alterar tipo usuário</returns>
        [HttpPut ("{id}")]
        public async Task<ActionResult> Put (int id, Tipousuario tipousuario) {
            if (id != tipousuario.IdTipoUsuario) {
                return BadRequest (new { mensagem = "Tipo de usuario não encontrado", Erro = true });
            }
            try {
                await _repositorio.Alterar (tipousuario);
            } catch (DbUpdateConcurrencyException) {
                var tipousuario_valido = await _repositorio.BuscarPorID (id);

                if (tipousuario_valido == null) {
                    return NotFound (new { mensagem = "tipo de usuario não valido", Erro = true });
                } else {
                    throw;
                }
            }
            return Ok ("Tipo de usuario cadastrado com sucesso");
        }

        /// <summary>
        /// Deletamos um tipo de usuário de acordo com o ID
        /// </summary>
        /// <param name="id">Passar ID</param>
        /// <returns>Deletar tipo de usuário</returns>
        [HttpDelete ("{id}")]
        public async Task<ActionResult<Tipousuario>> Delete (int id) {
            var tipousuario = await _repositorio.BuscarPorID (id);
            if (tipousuario == null) {
                return NotFound (new { mensagem = "tipo de usuario invalido", Erro = true });
            }
            await _repositorio.Excluir (tipousuario);

            return tipousuario;
        }
    }
}