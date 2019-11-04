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
        /// Filtra ofertas por uma palavra especifica
        /// </summary>
        /// <param name="filtro">string filtro</param>
        /// <returns>Retorna uma lista que contenha a palavra especifica</returns>
        [HttpGet ("FiltrarPalavra")]
        public ActionResult<List<Oferta>> GetFiltrar (FiltroViewModel filtro) {
            using (bddatempoContext _contexto = new bddatempoContext ()) {
                List<Oferta> ofertas = _contexto.Oferta.Where (o => o.NomeOferta.Contains(filtro.Palavra)).ToList ();
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
        /// Filtra as ofertas por categoria 
        /// </summary>
        /// <param name="filtrocategoria">string filtrocategoria</param>
        /// <returns>todas as categorias</returns>
        [HttpGet ("filtrarcategoria/{filtrocategoria}")]
        public ActionResult<List<Oferta>> GetFiltrarCategoria (string filtrocategoria) {
            using (bddatempoContext _contexto = new bddatempoContext ()) {             
                List<Oferta> ofertas = _contexto.Oferta.Include("IdProdutoNavigation").Where(o => o.IdProdutoNavigation.IdCategoriaNavigation.NomeCategoria.Contains(filtrocategoria)).ToList();
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
        /// Ordena ofertas por oredem alfabetica
        /// </summary>
        /// <returns>Retorna lista de ofertas</returns>
        [HttpGet ("Ordenar")]
        public ActionResult<List<Oferta>> GetOrdernar () {
            List<Oferta> ofertas;
            using (bddatempoContext _contexto = new bddatempoContext ()) {
                ofertas = _contexto.Oferta.OrderBy (o => o.NomeOferta).ToList ();
            }
            return ofertas;
        }

        /// <summary>
        /// Ordena por preço,Cresente e Descresente
        /// </summary>
        /// <param name="ordempreco"></param>
        /// <returns></returns>
        [HttpGet ("OrdenarPreco/{ordempreco}")]
        public ActionResult<List<Oferta>> GetOrdernarPreco (string ordempreco) {
            List<Oferta> ofertas;
            using (bddatempoContext _contexto = new bddatempoContext ()) {
              
                if(ordempreco == "Menor"){
                    ofertas = _contexto.Oferta.OrderBy (o => o.Preco).ToList();
                }else{
                    ofertas = _contexto.Oferta.OrderByDescending (o => o.Preco).ToList();
                }
            }
            return ofertas;
        }       
    }
}