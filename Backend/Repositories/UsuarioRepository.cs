using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Domains;
using Backend.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories {
    public class UsuarioRepository : IUsuario {
        public async Task<Usuario> Alterar (Usuario usuario) {
            using (bddatempoContext _contexto = new bddatempoContext ()) {
                //Comparamos os atributos que foram modificados através do EF
                _contexto.Entry (usuario).State = EntityState.Modified;
                await _contexto.SaveChangesAsync ();
                return usuario;
            }
        }

        public async Task<Usuario> BuscarPorID (int id) {
            using (bddatempoContext _contexto = new bddatempoContext ()) {
                var _usuario = await _contexto.Usuario.Include ("IdTipoUsuarioNavigation").FirstOrDefaultAsync (t => t.IdUsuario == id);
                // _usuario.Email = null;
                // _usuario.Senha = null;
                return _usuario;
            }
        }

        public async Task<Usuario> Excluir (Usuario usuario) {
            using (bddatempoContext _contexto = new bddatempoContext ()) {
                _contexto.Usuario.Remove (usuario);
                await _contexto.SaveChangesAsync ();
                return usuario;
            }
        }

        public async Task<List<Usuario>> Listar () {
            using (bddatempoContext _contexto = new bddatempoContext ()) {
                List<Usuario> listaUsuario = new List<Usuario> ();
                listaUsuario = await _contexto.Usuario.Include ("IdTipoUsuarioNavigation").ToListAsync ();

                foreach (var item in listaUsuario) {
                    item.Email = null;
                    item.Senha = null;
                }
                return listaUsuario;
            }
        }

        public async Task<Usuario> Salvar (Usuario usuario) {
            using (bddatempoContext _contexto = new bddatempoContext ()) {
                // Tratamos contra ataques de SQL Injection
                await _contexto.AddAsync (usuario);
                // Salvamos efetivamente o nosso objeto no banco
                await _contexto.SaveChangesAsync ();
                return usuario;
            }
        }
    }
}