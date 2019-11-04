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
    public class UsuarioController : ControllerBase
    {
        //bddatempoContext _repositorio = new bddatempoContext();
        UsuarioRepository _repositorio = new UsuarioRepository();
        
        UploadRepository _uploadRepo = new UploadRepository();

        // GET: api/Usuario
        [HttpGet]
        public async Task<ActionResult<List<Usuario>>> Get()
        {
            var usuarios = await _repositorio.Listar();

            if(usuarios == null){
                return NotFound();
            }

            return usuarios;
        }
        // GET: api/Usuario/2
        [HttpGet("{id}")]
        public async Task<ActionResult<Usuario>> Get(int id)
        {
            var usuario = await _repositorio.BuscarPorID(id);

            if(usuario == null){
                return NotFound();
            }

            return usuario;
        }

        //POST api/Usuario
        [HttpPost]
        public async Task<ActionResult<Usuario>> Post([FromForm]Usuario usuario){
            try{
                var arquivo = Request.Form.Files[0];
                usuario.imgusuario = _uploadRepo.Upload(arquivo, "imgPerfil");

                await _repositorio.Salvar(usuario);
            }catch(DbUpdateConcurrencyException){
                throw;
            }
            return usuario;
        }

        //Update
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id,[FromForm]Usuario usuario){
            // Se o Id do objeto não existir, ele retorna erro 400
            if(id != usuario.IdUsuario){
                return BadRequest();
            }
            try{
                var arquivo = Request.Form.Files[0];
                usuario.imgusuario = _uploadRepo.Upload(arquivo, "imgPerfil");
                await _repositorio.Alterar(usuario);
            }catch(DbUpdateConcurrencyException){
                // Verificamos se o objeto inserido realmente existe no banco
                var usuario_valido = await _repositorio.BuscarPorID(id);

                if(usuario_valido == null){
                    return NotFound();
                }else{
                    throw;
                }
            }
            // NoContent = Retorna 204, sem nada
            return NoContent();
        }

        //DELETE api/usuario/id
        [HttpDelete("{id}")]
        public async Task<ActionResult<Usuario>> Delete(int id){
            var usuario = await _repositorio.BuscarPorID(id);
            if(usuario == null){
                return NotFound();
            }
            await _repositorio.Excluir(usuario);

            return usuario;
        }
    }
}