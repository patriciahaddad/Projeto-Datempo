using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Domains;
using Backend.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers {
    [Route ("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase {
        UsuarioRepository _repositorio = new UsuarioRepository ();
        UploadRepository _uploadRepo = new UploadRepository ();
        IdentificadorRepository _identificador = new IdentificadorRepository ();

        /// <summary>
        /// Pegamos os usuário cadastrados
        /// </summary>
        /// <returns>Lista de usuários cadastrados</returns>
        [HttpGet]
        public async Task<ActionResult<List<Usuario>>> Get () {
            var usuarios = await _repositorio.Listar ();

            if (usuarios == null) {
                return NotFound ();
            }
            return usuarios;
        }

        /// <summary>
        /// Pegamos os usuários de acordo com o ID
        /// </summary>
        /// <param name="id">Passar ID</param>
        /// <returns>Buscar usuário por ID</returns>
        [HttpGet ("{id}")]
        public async Task<ActionResult<Usuario>> Get (int id) {
            var usuario = await _repositorio.BuscarPorID (id);

            if (usuario == null) {
                return NotFound ();
            }
            return usuario;
        }

        /// <summary>
        /// Cadastramos um novo usuário
        /// </summary>
        /// <param name="usuario">Passar objeto usuário</param>
        /// <returns>Cadastrar usuário</returns>
        [HttpPost]
        public async Task<ActionResult<Usuario>> Post (Usuario usuario) {
            try {

                usuario.Identificador = usuario.Identificador.Replace (" ", "");
                usuario.Identificador = usuario.Identificador.Replace ("-", "");
                usuario.Identificador = usuario.Identificador.Replace (".", "");
                usuario.Identificador = usuario.Identificador.Replace ("/", "");

                //Teste no Backend
                if (usuario.Identificador.Length == 11) {
                    if (_identificador.ValidaCPF (usuario.Identificador) == true) {
                        usuario.IdTipoUsuario = 3;
                        await _repositorio.Salvar (usuario);
                    } else {
                        return BadRequest ();
                    }
                } else if (usuario.Identificador.Length == 14) {
                    if (_identificador.ValidaCNPJ (usuario.Identificador) == true) {
                        usuario.IdTipoUsuario = 2;
                        await _repositorio.Salvar (usuario);
                    } else {
                        return BadRequest ();
                    }
                }
            } catch (DbUpdateConcurrencyException) {
                throw;
            }
            return usuario;
        }

        /// <summary>
        /// Alteramos usuário de acordo com o ID
        /// </summary>
        /// <param name="id">Passar ID</param>
        /// <param name="usuario">Passar objeto usuário</param>
        /// <returns>Alterar usuário</returns>
        [HttpPut ("{id}")]
        public async Task<ActionResult> Put (int id, [FromForm] Usuario usuario) {
            // Se o Id do objeto não existir, ele retorna erro 400
            if (id != usuario.IdUsuario) {
                return BadRequest ();
            }
            try {
                var arquivo = Request.Form.Files[0];
                usuario.imgusuario = _uploadRepo.Upload (arquivo, "imgPerfil");
                await _repositorio.Alterar (usuario);
            } catch (DbUpdateConcurrencyException) {
                // Verificamos se o objeto inserido realmente existe no banco
                var usuario_valido = await _repositorio.BuscarPorID (id);

                if (usuario_valido == null) {
                    return NotFound ();
                } else {
                    throw;
                }
            }
            // NoContent = Retorna 204, sem nada
            return NoContent ();
        }

        /// <summary>
        /// Deletamos um usuário de acordo com o ID
        /// </summary>
        /// <param name="id">Passar ID</param>
        /// <returns>Deletar usuário</returns>
        [HttpDelete ("{id}")]
        public async Task<ActionResult<Usuario>> Delete (int id) {
            var usuario = await _repositorio.BuscarPorID (id);
            if (usuario == null) {
                return NotFound ();
            }
            await _repositorio.Excluir (usuario);

            return usuario;
        }
    }
}