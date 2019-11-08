using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Domains;
using Backend.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers {
    [Route ("api/[controller]")]
    [ApiController]
    public class ApagarOfertaController : ControllerBase {
        bddatempoContext _contexto = new bddatempoContext ();
        OfertaRepository _repositorio = new OfertaRepository ();

        [HttpGet]
        public async Task<ActionResult<List<Oferta>>> ExibirOferta (Oferta oferta) {

            List<Oferta> ofertas;
            if (oferta.Validade >= DateTime.Now.AddDays (10)) {
                ofertas = await _contexto.Oferta.ToListAsync ();
            } else {
                await _repositorio.Excluir (oferta);
            }
            return oferta;
        }
    }
}