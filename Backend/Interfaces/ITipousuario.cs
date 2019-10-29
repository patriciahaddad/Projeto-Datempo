using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Domains;

namespace Backend.Interfaces
{
    public interface ITipousuario
    {
         Task<List<Tipousuario>> Listar();

         Task<Tipousuario> BuscarPorID(int id);

         Task<Tipousuario> Salvar(Tipousuario tipousuario);

         Task<Tipousuario> Alterar(Tipousuario tipousuario);

         Task<Tipousuario> Excluir(Tipousuario tipousuario);
    }
}