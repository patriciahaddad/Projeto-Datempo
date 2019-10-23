using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers {

    //DEFININDO ROTA do controller e dizendo que é um controller para api
    [Route ("api/[controller]")]
    [ApiController]
    public class TipoUsuarioController : ControllerBase {
        bddatempoContext _contexto = new bddatempoContext ();

        //GET: api/TipoUsuario
        [HttpGet]
        public async Task<ActionResult<List<Tipousuario>>> Get () {
            var tipoUsuarios = await _contexto.Tipousuario.ToListAsync ();

            if (tipoUsuarios == null) {
                return NotFound ();
            }
            return tipoUsuarios;
        }
        //api TipoUsuario 2 metodo para buscar uma TipoUsuario só
        //SELECT * FROM TipoUsuario WHERE ID=2
        [HttpGet ("{id}")]
        public async Task<ActionResult<Tipousuario>> Get (int id) {
            var tipoUsuario = await _contexto.Tipousuario.FindAsync (id);

            if (tipoUsuario == null) {
                return NotFound ();
            }
            return tipoUsuario;
        }
        //fim get
    }
}