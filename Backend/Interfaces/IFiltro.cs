using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Domains;
using Backend.ViewModels;

namespace Backend.Interfaces {
    public interface IFiltro {
        //Se der merda é o task
        List<Oferta> GetFiltrar (FiltroViewModel filtro);
        List<Oferta> GetFiltrarCategoria (string filtrocategoria);
        List<Oferta> GetOrdernar ();
        List<Oferta> GetOrdenarPreco (string ordempreco);

    }
}