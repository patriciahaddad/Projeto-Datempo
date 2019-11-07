using System.Collections.Generic;
using System.Linq;
using Backend.Domains;
using Backend.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers {
    [Route ("api/[controller]")]
    [ApiController]
    public class FiltroController : ControllerBase {

        /// <summary>
        /// Filtramos as ofertas por pesquisa
        /// </summary>
        /// <param name="filtro">Passar objeto filtro</param>
        /// <returns>Filtro por pesquisa</returns>
        [HttpGet ("FiltrarPalavra")]
        public ActionResult<List<Oferta>> GetFiltrar (FiltroViewModel filtro) {
            using (bddatempoContext _contexto = new bddatempoContext ()) {
                List<Oferta> ofertas = _contexto.Oferta.Where (o => o.NomeOferta.Contains (filtro.Palavra)).ToList ();
                if (ofertas == null) {
                    return NotFound (new {
                        Mensagem = "Produto não encontrado", Erro = true
                    });
                }
                return ofertas;
            }
        }

        /// <summary>
        /// Filtramos as ofertas por categoria
        /// </summary>
        /// <param name="filtrocategoria">Passamos o objeto filtrocategoria</param>
        /// <returns>Filtro por categoria</returns>
        [HttpGet ("filtrarcategoria/{filtrocategoria}")]
        public ActionResult<List<Oferta>> GetFiltrarCategoria (string filtrocategoria) {
            using (bddatempoContext _contexto = new bddatempoContext ()) {
                List<Oferta> ofertas = _contexto.Oferta.Include ("IdProdutoNavigation").Where (o => o.IdProdutoNavigation.IdCategoriaNavigation.NomeCategoria.Contains (filtrocategoria)).ToList ();
                if (ofertas == null) {
                    return NotFound (
                        new {
                            Mensagem = "Produto não encontrado",
                                Erro = true
                        });
                }
                return ofertas;
            }
        }

        /// <summary>
        /// Ordenamos as ofertas de A-Z
        /// </summary>
        /// <returns>Ordem de A-Z</returns>
        [HttpGet ("Ordenar")]
        public ActionResult<List<Oferta>> GetOrdernar () {
            List<Oferta> ofertas;
            using (bddatempoContext _contexto = new bddatempoContext ()) {
                ofertas = _contexto.Oferta.OrderBy (o => o.NomeOferta).ToList ();
            }
            return ofertas;
        }

        /// <summary>
        /// Ordenamos as ofertas por preço
        /// </summary>
        /// <param name="ordempreco">Passar ordem</param>
        /// <returns>Ordem de Maior e Menor preço</returns>
        [HttpGet ("OrdenarPreco/{ordempreco}")]
        public ActionResult<List<Oferta>> GetOrdernarPreco (string ordempreco) {
            List<Oferta> ofertas;
            using (bddatempoContext _contexto = new bddatempoContext ()) {

                if (ordempreco == "Menor") {
                    ofertas = _contexto.Oferta.OrderBy (o => o.Preco).ToList ();
                } else {
                    ofertas = _contexto.Oferta.OrderByDescending (o => o.Preco).ToList ();
                }
            }
            return ofertas;
        }
    }
}