using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Domains;
using Backend.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories
{
    public class EnderecoRepository : IEndereco
    {

        public async Task<Endereco> Alterar(Endereco endereco)
        {
            using(bddatempoContext _contexto = new bddatempoContext()){
                //Comparamos os atributos que foram modificados através do EF
                _contexto.Entry(endereco).State = EntityState.Modified;
                await _contexto.SaveChangesAsync();
                return endereco;
            }
        }

        public async Task<Endereco> BuscarPorID(int id)
        {
            using(bddatempoContext _contexto = new bddatempoContext()){
                return await _contexto.Endereco.Include("IdUsuarioNavigation").FirstOrDefaultAsync(u => u.IdUsuario == id);
            }
        }

        public async Task<Endereco> Excluir(Endereco endereco)
        {
            using(bddatempoContext _contexto = new bddatempoContext()){
                _contexto.Endereco.Remove(endereco);
                await _contexto.SaveChangesAsync();
                return endereco;
            }
        }

        public async Task<List<Endereco>> Listar()
        {
            using(bddatempoContext _contexto = new bddatempoContext()){
                return await _contexto.Endereco.Include("IdUsuarioNavigation").ToListAsync();
            }
        }

        public async Task<Endereco> Salvar(Endereco endereco)
        {
            using(bddatempoContext _contexto = new bddatempoContext()){
                // Tratamos contra ataques de SQL Injection
                await _contexto.AddAsync(endereco);
                // Salvamos efetivamente o nosso objeto no banco
                await _contexto.SaveChangesAsync();
                return endereco;
            }
        }
    }
}