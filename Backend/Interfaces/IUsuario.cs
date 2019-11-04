using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Domains;

namespace Backend.Interfaces
{
    public interface IUsuario
    {
         Task<List<Usuario>> Listar();

         Task<Usuario> BuscarPorID(int id);

         Task<Usuario> Salvar(Usuario usuario);

         Task<Usuario> Alterar(Usuario usuario);

         Task<Usuario> Excluir(Usuario usuario);
    }
}