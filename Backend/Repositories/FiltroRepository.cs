using System.Collections.Generic;
using System.Linq;
using Backend.Domains;
using Backend.Interfaces;
using Backend.ViewModels;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories {
    public class FiltroRepository : IFiltro {
        public List<Oferta> GetFiltrar (FiltroViewModel filtro) {
            using (bddatempoContext _contexto = new bddatempoContext ()) {
                List<Oferta> ofertas = _contexto.Oferta.Where (o => o.NomeOferta.Contains (filtro.Palavra)).ToList ();
                return ofertas;
            }
        }

        public List<Oferta> GetFiltrarCategoria (string filtrocategoria) {
            using (bddatempoContext _contexto = new bddatempoContext ()) {
                List<Oferta> ofertas = _contexto.Oferta.Include ("IdProdutoNavigation").Where (o => o.IdProdutoNavigation.IdCategoriaNavigation.NomeCategoria.Contains (filtrocategoria)).ToList ();
                return ofertas;
            }
        }

        public List<Oferta> GetOrdenarPreco (string ordempreco) {
            using (bddatempoContext _contexto = new bddatempoContext ()) {
                List<Oferta> ofertas;
                if (ordempreco == "Menor") {
                    ofertas = _contexto.Oferta.OrderBy (o => o.Preco).ToList ();
                } else {
                    ofertas = _contexto.Oferta.OrderByDescending (o => o.Preco).ToList ();
                }
                return ofertas;
            }
        }

        public List<Oferta> GetOrdernar () {
            using (bddatempoContext _contexto = new bddatempoContext ()) {
                List<Oferta> ofertas = _contexto.Oferta.OrderBy (o => o.NomeOferta).ToList ();
                return ofertas;
            }
        }
    }
}