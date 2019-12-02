using System.Collections.Generic;
using System.Linq;
using Backend.Domains;
using Backend.Repositories;
using Backend.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers {
    [Route ("api/[controller]")]
    [ApiController]
    public class FiltroController : ControllerBase {

        FiltroRepository _repositorio = new FiltroRepository ();

        /// <summary>
        /// Filtramos as ofertas por pesquisa
        /// </summary>
        /// <param name="filtro">Passar objeto filtro</param>
        /// <returns>Filtro por pesquisa</returns>
        [HttpGet ("FiltrarPalavra")]
        public ActionResult<List<Oferta>> GetFiltrar (FiltroViewModel filtro) {
            List<Oferta> ofertas = _repositorio.GetFiltrar (filtro);
            if (ofertas == null) {
                return NotFound (new { Mensagem = "Produto não encontrado", Erro = true });
            }
            return ofertas;
        }

        /// <summary>
        /// Filtramos as ofertas por categoria
        /// </summary>
        /// <param name="filtrocategoria">Passamos o objeto filtrocategoria</param>
        /// <returns>Filtro por categoria</returns>
        [HttpGet ("filtrarcategoria/{filtrocategoria}")]
        public ActionResult<List<Oferta>> GetFiltrarCategoria ([FromBody] string filtrocategoria) {
            
            List<Oferta> ofertas = _repositorio.GetFiltrarCategoria (filtrocategoria);
            if (ofertas == null) {
                return NotFound (
                    new { Mensagem = "Produto não encontrado", Erro = true });
            }
            return ofertas;
        }

        /// <summary>
        /// Ordenamos as ofertas de A-Z
        /// </summary>
        /// <returns>Ordem de A-Z</returns>
        [HttpGet ("Ordenar")]
        public ActionResult<List<Oferta>> GetOrdernar () {
            List<Oferta> ofertas = _repositorio.GetOrdernar ();
            return ofertas;
        }

        /// <summary>
        /// Ordenamos as ofertas por preço
        /// </summary>
        /// <param name="ordempreco">Passar ordem</param>
        /// <returns>Ordem de Maior e Menor preço</returns>
        [HttpGet ("OrdenarPreco/{ordempreco}")]
        public ActionResult<List<Oferta>> GetOrdernarPreco (string ordempreco) {
            List<Oferta> ofertas = _repositorio.GetOrdenarPreco (ordempreco);
            return ofertas;
        }
    }
}