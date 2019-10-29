using System.Collections.Generic;
using System.Threading.Tasks;
using Backend.Domains;
using Backend.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Backend.Repositories
{
    public class OfertaRepository : IOferta
    {
public async Task<Oferta> Alterar(Oferta oferta)
        {
            using(bddatempoContext _contexto = new bddatempoContext()){
                //Comparamos os atributos que foram modificados através do EF
                _contexto.Entry(oferta).State = EntityState.Modified;
                await _contexto.SaveChangesAsync();
                return oferta;
            }
        }

        public async Task<Oferta> BuscarPorID(int id)
        {
            using(bddatempoContext _contexto = new bddatempoContext()){
                return await _contexto.Oferta.Include("IdUsuarioNavigation").Include("IdProdutoNavigation").FirstOrDefaultAsync(o => o.IdOferta == id);
            }
        }

        public async Task<Oferta> Excluir(Oferta oferta)
        {
            using(bddatempoContext _contexto = new bddatempoContext()){
                _contexto.Oferta.Remove(oferta);
                await _contexto.SaveChangesAsync();
                return oferta;
            }
        }

        public async Task<List<Oferta>> Listar()
        {
            using(bddatempoContext _contexto = new bddatempoContext()){
                return await _contexto.Oferta.Include("IdUsuarioNavigation").Include("IdProdutoNavigation").ToListAsync();
            }
        }

        public async Task<Oferta> Salvar(Oferta oferta)
        {
            using(bddatempoContext _contexto = new bddatempoContext()){
                // Tratamos contra ataques de SQL Injection
                await _contexto.AddAsync(oferta);
                // Salvamos efetivamente o nosso objeto no banco
                await _contexto.SaveChangesAsync();
                return oferta;
            }
        }
    }
}