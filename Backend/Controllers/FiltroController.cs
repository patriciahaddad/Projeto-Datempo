using System.Collections.Generic;
using System.Linq;
using Backend.Domains;
using Backend.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FiltroController : ControllerBase
    {
        [HttpGet("FiltrarPalavra")]
        public ActionResult<List<Oferta>> GetFiltrar(FiltroViewModel filtro){
            using(bddatempoContext _contexto = new bddatempoContext()){
                List<Oferta> ofertas = _contexto.Oferta.Where(o => o.NomeOferta.Contains(filtro.Palavra)).ToList();

                return ofertas;
            }
        }
        [HttpGet("Ordenar")]
        public ActionResult<List<Oferta>> GetOrdernar(){
            List<Oferta> ofertas;
            using(bddatempoContext _contexto = new bddatempoContext()){
                ofertas = _contexto.Oferta.OrderBy(o => o.Preco).ToList();
            }
            return ofertas;
        }
    }
}