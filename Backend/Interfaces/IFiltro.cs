using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Domains;
using Backend.ViewModels;

namespace Backend.Interfaces {
    public interface IFiltro {
        //Se der merda é o task
        List<Oferta> GetFiltrar (string palavra);
        List<Oferta> GetFiltrarCategoria (string filtrocategoria);
        List<Oferta> GetOrdernar ();
        List<Oferta> GetOrdenarPreco (string ordempreco);

    }
}