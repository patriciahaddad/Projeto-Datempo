using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Domains;
using Backend.ViewModels;

namespace Backend.Interfaces
{
    public interface IOferta
    {
         Task<List<Oferta>> Listar();

         Task<Oferta> BuscarPorID(int id);

         Task<Oferta> Salvar(Oferta oferta);

         Task<Oferta> Alterar(Oferta oferta);

         Task<Oferta> Excluir(Oferta oferta);

         //Task<List<Oferta>> Filtrar();
    }
}