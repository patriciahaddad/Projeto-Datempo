using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Domains;
using Backend.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories
{
    public class TipousuarioRepository : ITipousuario
    {
        public async Task<Tipousuario> Alterar(Tipousuario tipousuario)
        {
            using(bddatempoContext _contexto = new bddatempoContext()){
                //Comparamos os atributos que foram modificados através do EF
                _contexto.Entry(tipousuario).State = EntityState.Modified;
                await _contexto.SaveChangesAsync();
                return tipousuario;
            }
        }

        public async Task<Tipousuario> BuscarPorID(int id)
        {
            using(bddatempoContext _contexto = new bddatempoContext()){
                return await _contexto.Tipousuario.FindAsync(id);
            }
        }

        public async Task<Tipousuario> Excluir(Tipousuario tipousuario)
        {
            using(bddatempoContext _contexto = new bddatempoContext()){
                _contexto.Tipousuario.Remove(tipousuario);
                await _contexto.SaveChangesAsync();
                return tipousuario;
            }
        }

        public async Task<List<Tipousuario>> Listar()
        {
            using(bddatempoContext _contexto = new bddatempoContext()){
                return await _contexto.Tipousuario.ToListAsync();
            }
        }

        public async Task<Tipousuario> Salvar(Tipousuario tipousuario)
        {
            using(bddatempoContext _contexto = new bddatempoContext()){
                // Tratamos contra ataques de SQL Injection
                await _contexto.AddAsync(tipousuario);
                // Salvamos efetivamente o nosso objeto no banco
                await _contexto.SaveChangesAsync();
                return tipousuario;
            }
        }
    }
}